function prepareConnection(transition) {
    var fromId = transition.from;
    var toId = transition.to;

    var from = computePostion(fromId);
    var to = computePostion(toId);

    var path = preparePath(from, to);

    var desc = prepareConnectionDescription(transition);

    path.text = desc;

    EDITOR.elementsMap[fromId].fromPaths.push(path);
    EDITOR.elementsMap[toId].toPaths.push(path);

    path.fromId = fromId;
    path.toId = toId;

    return transition;
}

function computePostion(elementId) {
    const svgElement = EDITOR.elementsMap[elementId].svgElement;
    const elementType = EDITOR.elementsMap[elementId].type;

    var center;
    switch (elementType) {
        case ElementTypeEnum.GATE:
            center = getGateCenter(svgElement);
            break;
        default:{
            center = getDefaultCenter(svgElement);
            break;
        }
    }

    return center;
}

function getDefaultCenter(svgElement) {
    var tbox = svgElement.tbox();

    return {
        x: tbox.cx,
        y: tbox.cy
    }
}

function getGateCenter(svgElement) {

    var tbox = svgElement.tbox();

    var x = tbox.x;
    var y = tbox.cy;

    return {
        x: x,
        y: y
    }
}

function registerEventHandler(group){
    group.on('dragmove', function(event){
        redrawPaths(group);
    })
}

function redrawPaths(group) {
    var element = EDITOR.elementsMap[group.activityId];
    var coord = computePostion(group.activityId);

    _.forEach(element.fromPaths, function (path) {
        var pathArray = path.array();
        var L = pathArray.value[1];
        path.plot('M' + coord.x + ',' + coord.y + 'L' + L[1] + ',' + L[2]);
        updateMarker(path);
        redrawConnectionDescritpion(path);
    });


    _.forEach(element.toPaths, function (path) {
        var pathArray = path.array();
        var M = pathArray.value[0];
        path.plot('M' + M[1] + ',' + M[2] + 'L' + coord.x + ',' + coord.y);
        updateMarker(path);
        redrawConnectionDescritpion(path);
    });
}

function updateMarker(path) {
    var marker = path.reference('marker-end');
    marker.ref(path.length() / 2, 5);
}