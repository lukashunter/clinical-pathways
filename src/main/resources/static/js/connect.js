function prepareConnection(transition) {
    var fromId = transition.from;
    var toId = transition.to;

    var from = computeCenterPostion(fromId);
    var to = computeCenterPostion(toId);

    var path = drawPath(from, to);

    var desc = prepareConnectionDescription(transition);

    path.text = desc;

    EDITOR.elementsMap[fromId].fromPaths.push(path);
    EDITOR.elementsMap[toId].toPaths.push(path);

    path.fromId = fromId;
    path.toId = toId;

    return transition;
}

function drawPath(from, to) {
    var draw = EDITOR.draw;
    var path = draw.path("M " + from.x + " " + from.y + " L " + to.x + " " + to.y);

    path.attr({
        stroke: 'red',
        'stroke-width': 1
    });

    path.fill('none').stroke({width: 1});

    drawMarker(path);

    path.back();

    return path;
}

function drawMarker(path) {
    var marker = EDITOR.draw.marker(10, 10)
    marker.path().attr({
        d: "M 0 0 L 10 5 L 0 10 z"
    });
    marker.ref(path.length() / 2, 5);
    path.marker('end', marker);
}

function computeCenterPostion(elementId) {
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
    var contextMenu = $('.context-menu');

    group.on('dragmove', function(event){
        redrawPaths(group);
        contextMenu.addClass('hide');
    })
}

function redrawPaths(group) {
    var element = EDITOR.elementsMap[group.activityId];
    var coord = computeCenterPostion(group.activityId);

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

function drawNewPath(activityId){
    var centerPostion = computeCenterPostion(activityId);

}