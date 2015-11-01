function prepareConnection(transition) {
    var fromId = transition.from;
    var toId = transition.to;

    var from = computePostion(fromId);
    var to = computePostion(toId);

    var path = preparePath(from, to);

    EDITOR.elementsMap[fromId].fromPaths.push(path);
    EDITOR.elementsMap[toId].toPaths.push(path);

    return transition;
}

function computePostion(elementId) {
    const svgElement = EDITOR.elementsMap[elementId].svgElement;
    const elementType = EDITOR.elementsMap[elementId].type;

    var center;
    switch (elementType) {
        case ElementTypeEnum.EVENT:
            center = getEventCenter(svgElement);
            break;
        case ElementTypeEnum.TASK_RESEARCH:
        case ElementTypeEnum.TASK_LAB:
            center = getTaskCenter(svgElement);
            break;
        case ElementTypeEnum.GATE:
            center = getGateCenter(svgElement);
            break;
    }

    return center;
}

function getEventCenter(svgElement) {
    var x = svgElement.x();
    var y = svgElement.y();
    var r = svgElement.rx();

    return {
        x: x + r,
        y: y + r
    }
}

function getTaskCenter(svgElement) {
    var x = svgElement.x();
    var y = svgElement.y();

    var width = svgElement.width();
    var height = svgElement.height();

    return {
        x: x + width / 2,
        y: y + height / 2
    }
}

function getGateCenter(svgElement) {

    var rbox = svgElement.rbox();

    var x = rbox.cx;
    var y = rbox.cy;


    return {
        x: x,
        y: y
    }
}

function registerEventHandler(svgElement){
    svgElement.on('dragmove', function(event){
        redrawPaths(svgElement);
    })
}

function redrawPaths(svgElement) {
    var element = EDITOR.elementsMap[svgElement.activityId];

    var coord = computePostion(svgElement.activityId);

    function updateMarker(path) {
        var marker = path.reference('marker-end');
        marker.ref(path.length() / 2, 5);
    }

    _.forEach(element.fromPaths, function (path) {
        var pathArray = path.array();
        var L = pathArray.value[1];
        path.plot('M' + coord.x + ',' + coord.y + 'L' + L[1] + ',' + L[2]);
        updateMarker(path);
    });


    _.forEach(element.toPaths, function (path) {
        var pathArray = path.array();
        var M = pathArray.value[0];
        path.plot('M' + M[1] + ',' + M[2] + 'L' + coord.x + ',' + coord.y);
        updateMarker(path);
    });
}