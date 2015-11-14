function prepareConnection(transition) {
    var fromId = transition.from;
    var toId = transition.to;

    var from = computeCenterPostion(fromId);
    var to = computeCenterPostion(toId);

    var path = drawPath(from, to);
    path.text = prepareConnectionDescription(transition);

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
            center = getCenter(svgElement);
            break;
        }
    }

    return center;
}

function getCenter(svgElement) {
    var tbox = svgElement.tbox();

    return {
        x: tbox.cx,
        y: tbox.cy
    }
}

function getGateCenter(svgElement) {

    var tbox = svgElement.tbox();

    var x = tbox.x;
    var y = tbox.y;

    return {
        x: x,
        y: y + ((80*Math.sqrt(2))/2)
    }
}

function registerEventDragHandler(group){
    var contextMenu = $('.context-menu');

    group.on('dragstart', function(event){
        contextMenu.addClass('hide');
    })

    group.on('dragmove', function(event){
        redrawPaths(group);
    })
}

// on drag element
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

function createNewPath(activityId){
    connectMode.active = true;
    connectMode.fromId = activityId;

    var fromPosition = computeCenterPostion(activityId);
    connectMode.path = drawNewPath(fromPosition);

    $('#drawing').on('mousemove', function (event) {
        redrawNewPath(connectMode.path, event);
    });
}

function drawNewPath(fromPosition){
    var draw = EDITOR.draw;
    var path = draw.path("M " + fromPosition.x + " " + fromPosition.y + " L " + (cursor.x-55) + " " + (cursor.y-75));

    path.attr({
        stroke: 'red',
        'stroke-width': 1
    });

    path.fill('none').stroke({width: 1});
    drawMarker(path);
    path.back();

    return path;
}

function redrawNewPath(path, event){
    var pathArray = path.array();
    var M = pathArray.value[0];
    path.plot('M' + M[1] + ',' + M[2] + 'L' + (event.clientX - 55) + ',' + (event.clientY - 75));
    updateMarker(path);
//    redrawConnectionDescritpion(path);
}