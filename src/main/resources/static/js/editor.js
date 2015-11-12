window.onload = initDrawing;

var EDITOR = {};

function initDrawing() {
    if (SVG.supported) {
        EDITOR.draw = SVG('drawing').size(window.innerWidth, window.innerHeight - 80);
        EDITOR.elementsMap = {};
    } else {
        alert('SVG not supported')
    }
}

function prepareDiagram(data) {
    EDITOR.xpdl = data;
    if (EDITOR.xpdl.workflowProcesses != null) {
        const workflowProcessArray = EDITOR.xpdl.workflowProcesses.workflowProcess;
        prepareWorkflowProcesses(workflowProcessArray);
    }
}

function prepareWorkflowProcesses(workflowProcessList) {
    _.forEach(workflowProcessList, function (workflowProcess) {
        if (workflowProcess.activities != null) {
            const activityArray = workflowProcess.activities.activity;
            prepareActivities(activityArray);
        }

        if (workflowProcess.transitions != null) {
            const transitionArray = workflowProcess.transitions.transition;
            prepareTransitions(transitionArray);
        }
    })
}

function prepareActivities(activitiesList) {
    _.forEach(activitiesList, function (activity) {
        var elementType = findElement(activity);
        svgElementFactory(elementType, activity);
    })
}

function findElement(activity) {
    var elementType;

    elementType = findEvent(activity);
    if (elementType) return elementType;

    elementType = findTask(activity);
    if (elementType) return elementType;

    elementType = findGate(activity);
    if (elementType) return elementType;

}

function findEvent(activity) {
    if (activity.event) {
        return ElementTypeEnum.EVENT
    }
}

function findTask(activity) {
    if (activity.implementation) {
        if (activity.implementation.task) {
            var task = activity.implementation.task;

            if (!findTaskLab(task)) return ElementTypeEnum.TASK_RESEARCH;
            else return ElementTypeEnum.TASK_LAB;
        }
    }
}

function findGate(activity) {
    if (activity.route) {
        return ElementTypeEnum.GATE
    }
}

function findTaskLab(task) {
    if (task.taskApplication) return true;
    if (task.taskManual) return true;
    if (task.taskReceive) return true;
    if (task.taskReference) return true;
    if (task.taskScript) return true;
    if (task.taskSend) return true;
    if (task.taskService) return true;
    if (task.taskUser) return true;

    return false;
}

function prepareTransitions(transitionList) {
    _.forEach(transitionList, function (transition) {
        prepareConnection(transition);
    });
}