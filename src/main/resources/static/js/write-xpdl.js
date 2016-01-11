var saveXPDL = function () {
    var xpdLWrapper = prepareXPDL();
    return $.ajax({
        url: 'xml/save',
        type: 'POST',
        data: JSON.stringify(xpdLWrapper),
        cache: false,
        processData: false, // Don't process the files
        contentType: "application/json; charset=utf-8",
    });
};

var prepareXPDL = function() {
    var activities = prepareActivityList();
    var transitions = prepareTransitionList();
    var xpdLWrapper = {
        activities: activities,
        transitions: transitions
    };
    return xpdLWrapper;
}

var prepareActivityList = function () {
    var activityList = [];
    _.forOwn(EDITOR.elementsMap, function (value, key) {
        var activity = prepareActivity(key);
        activityList.push(activity);
    });

    return activityList;
}

var prepareActivity = function (activityId) {
    var element = EDITOR.elementsMap[activityId];

    var activity = {};
    activity.id = activityId
    activity.name = getTextNodeBy(activityId);
    activity.nodeGraphicsInfos = getNodeGraphicsInfosBy(activityId);

    var type = getTypeByActivityId(activityId);

    switch (type) {
        case ElementTypeEnum.EVENT: {
            activity.event =  {startEvent: {trigger: 'None'} };
            break;
        }
        case ElementTypeEnum.TASK_RESEARCH: {
            activity.implementation =  {task: {} };
            break;
        }
        case ElementTypeEnum.TASK_LAB: {
            activity.implementation =  {task: {taskService: {} } };
            break;
        }
        case ElementTypeEnum.GATE: {
            activity.route =  {};
            break;
        }
    }

    return activity;
}

var getNodeGraphicsInfosBy = function (activityId) {
    var postion = computeCenterPostion(activityId);
    var coordinates = {
        x: postion.x,
        y: postion.y
    };

    var nodeGraphicsInfo = {
        toolId: 'Clinical Pathways Editor',
        coordinates: coordinates
    };

    var nodeGraphicsInfoList = [];
    nodeGraphicsInfoList.push(nodeGraphicsInfo);

    var nodeGraphicsInfos = {
        nodeGraphicsInfo: nodeGraphicsInfoList
    };

    return nodeGraphicsInfos;
}

var prepareTransitionList = function(){
    var transitionList = [];

    _.forOwn(EDITOR.pathsMap, function (pathElement, pathId) {
        var transition = prepareTransition(pathId);
        transitionList.push(transition);
    });

    return transitionList;
}

var prepareTransition = function(pathId){
    var pathElement = EDITOR.pathsMap[pathId];

    var transition = {
        id: generateUUID(),
        from: pathElement.svgPath.fromId,
        to: pathElement.svgPath.toId,
        name: pathElement.svgText ? pathElement.svgText.text() : ''
    };

    return transition;
}