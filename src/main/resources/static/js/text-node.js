function prepareNodeDescription(activity) {
    var group = EDITOR.elementsMap[activity.id].group;
    var type = EDITOR.elementsMap[activity.id].type;

    var taskNameArray = splitTaskName(activity.name, type);
    if (taskNameArray.length == 0 || taskNameArray[0].length < 2) return;

    var dy = getDy(taskNameArray, type);
    var dx = getDx(taskNameArray, type);

    var svgText = group.text(function (add) {
        _.forEach(taskNameArray, function (data) {
            add.tspan(data).dx(dx).newLine()
        })
    }).dy(dy);

    EDITOR.elementsMap[activity.id].svgText = svgText;
}

function getDx(taskNameArray, type) {
    var dx;

    switch (type) {
        case ElementTypeEnum.GATE:
        {
            if (taskNameArray[0].length < 6) dx = 30;
            else if (taskNameArray[0].length < 9) dx = 20;
            else if (taskNameArray[0].length <= 13) dx = 3;
            else dx = 1;
            break;
        }
        default :
        {
            if (taskNameArray[0].length < 6) dx = 55;
            else if (taskNameArray[0].length < 9) dx = 40;
            else if (taskNameArray[0].length < 13) dx = 20;
            else dx = 10;
        }
    }


    return dx;
}

function getDy(taskNameArray, type) {
    var dy;
    switch (type) {
        case ElementTypeEnum.GATE:
        {
            if (taskNameArray.length < 2) dy = 25;
            else if (taskNameArray.length < 3) dy = 17;
            else if (taskNameArray.length < 4) dy = 5;
            else dy = 1;
            break;
        }
        default:
        {
            if (taskNameArray.length < 2) dy = 25;
            else if (taskNameArray.length < 3) dy = 20;
            else if (taskNameArray.length < 4) dy = 5;
            else dy = 1;
            break;
        }
    }

    return dy;
}

function splitTaskName(taskName, elementType) {
    const LINE_LENGTH = elementType == ElementTypeEnum.GATE ? 15 : 18;

    var newTaskNameArray = [];

    if (!taskName) return newTaskNameArray;

    if (taskName.length < 18) {
        newTaskNameArray.push(taskName);
        return newTaskNameArray;
    }

    var splitTaskName = taskName.split(' ');

    newTaskNameArray.push(splitTaskName[0]);

    for (var i = 1, j = 0; i < splitTaskName.length; i++) {
        var tmp = newTaskNameArray[j] + " " + splitTaskName[i];
        if (tmp.length > LINE_LENGTH) {
            newTaskNameArray.push(splitTaskName[i]);
            j++;
        } else {
            newTaskNameArray[j] = tmp;
        }
    }

    return newTaskNameArray;
}

var getTextNodeBy = function(activityId){
    var svgText = EDITOR.elementsMap[activityId].svgText;
    var text = '';
    if(typeof svgText !== 'undefined'){
        text = svgText.text();
    }

    return text;
}