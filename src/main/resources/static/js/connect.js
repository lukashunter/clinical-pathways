function prepareConnection(transition) {
    var fromId = transition.from;
    var toId = transition.to;

    var fromPos = computeCenterPostion(fromId);
    var toPos = computeCenterPostion(toId);

    var svgText = prepareConnectionDescription(transition);

    var path = drawPath(fromPos, toPos);
    var pathId = path.attr('id');

    path.fromId = fromId;
    path.toId = toId;

    EDITOR.pathsMap[pathId] = {svgPath: path, svgText: svgText};

    EDITOR.elementsMap[fromId].fromPaths.push(path);
    EDITOR.elementsMap[toId].toPaths.push(path);

    return transition;
}

function drawPath(from, to) {
    var draw = EDITOR.draw;
    var path = draw.path("M " + from.x + " " + from.y + " L " + to.x + " " + to.y);

    path.attr({
        stroke: 'red',
        'stroke-width': 1
    });

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

var computeCenterPostion = function(elementId) {
    const svgElement = EDITOR.elementsMap[elementId].svgElement;
    const elementType = EDITOR.elementsMap[elementId].type;

    var center;
    switch (elementType) {
        case ElementTypeEnum.GATE:
            center = getGateCenter(svgElement);
            break;
        default:
        {
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
        y: y + ((80 * Math.sqrt(2)) / 2)
    }
}

function registerEventDragHandler(group) {
    var contextMenu = $('.context-menu');

    group.on('dragstart', function (event) {
        contextMenu.addClass('hide');
    })

    group.on('dragmove', function (event) {
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
    marker.front();
}

function createNewPath(activityId) {
    connectMode.active = true;
    connectMode.fromId = activityId;

    var fromPosition = computeCenterPostion(activityId);
    connectMode.path = drawNewPath(fromPosition);

    $('#drawing').on('mousemove', function () {
        redrawNewPath(connectMode.path);
    });
}

function drawNewPath(fromPosition) {
    var draw = EDITOR.draw;
    var path = draw.path("M " + fromPosition.x + " " + fromPosition.y + " L " + getEditorCursorPosition().x + " " + getEditorCursorPosition().y);

    path.attr({
        stroke: 'red',
        'stroke-width': 1
    });

    drawMarker(path);
    path.back();

    return path;
}

function redrawNewPath(path) {
    var pathArray = path.array();
    var M = pathArray.value[0];
    path.plot('M' + M[1] + ',' + M[2] + 'L' + getEditorCursorPosition().x + ',' + getEditorCursorPosition().y);
    updateMarker(path);
}

function computeDistancePointFromPath(pathId){
    var path = EDITOR.pathsMap[pathId].svgPath;
    var pathArray = path.array();
    var M = pathArray.value[0]; //start
    var L = pathArray.value[1]; // end

    return getDistance(M, L);
}

function getDistance(start, end){
    var A = (start[2]-end[2])/(start[1]-end[1]);
    var C = start[2] - (A * start[1]);

    var distance = Math.abs(A * getEditorCursorPosition().x - getEditorCursorPosition().y + C) / Math.sqrt(A * A + 1);
    return distance;
}

function onHoverPath() {
    var pathsMap = EDITOR.pathsMap;
    var tmpPathId;
    for (var pathId in pathsMap) {
        if (pathsMap.hasOwnProperty(pathId) && computeDistancePointFromPath(pathId) < 7 && isNear(pathId)) {
            tmpPathId = pathId;
            var svgPath = EDITOR.pathsMap[pathId].svgPath;
            svgPath.stroke('green');
            svgPath.reference('marker-end').fill('red');
            break;
        }
    }

    if (pathIdOnHover) {
        if (pathIdOnHover !== tmpPathId) {
            var svgPath = EDITOR.pathsMap[pathIdOnHover].svgPath;
            svgPath.stroke('red');
            svgPath.reference('marker-end').fill('black');
        }
    }

    pathIdOnHover = tmpPathId;
}

function isNear(pathId) {
    var path = EDITOR.pathsMap[pathId].svgPath;
    var pathArray = path.array();
    var sx = pathArray.value[0][1]; //start
    var sy = pathArray.value[0][2]; //start
    var ex = pathArray.value[1][1]; // end
    var ey = pathArray.value[1][2]; // end

    var cx = getEditorCursorPosition().x;
    var cy = getEditorCursorPosition().y;

    /*`1.*/
    if ((sx - 5) <= cx && (ex + 5) >= cx && (sy - 5) <= cy && (ey + 5) >= cy) return true;
    /*`2.*/
    if ((sx + 5) >= cx && (ex - 5) <= cx && (sy + 5) >= cy && (ey - 5) <= cy) return true;
    /*`3.*/
    if ((sx - 5) <= cx && (ex + 5) >= cx && (sy + 5) >= cy && (ey - 5) <= cy) return true;
    /*`4.*/
    if ((sx + 5) >= cx && (ex - 5) <= cx && (sy - 5) <= cy && (ey + 5) >= cy) return true;


    return false;
}