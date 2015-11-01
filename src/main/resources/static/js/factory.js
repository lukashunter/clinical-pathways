function svgElementFactory(elementType, activity) {
    var svgElement;

    switch (elementType) {
        case ElementTypeEnum.EVENT:
            svgElement = prepareEvent(activity);
            break;
        case ElementTypeEnum.TASK_RESEARCH:
            svgElement = prepareTaskResearch(activity);
            break;
        case ElementTypeEnum.TASK_LAB:
            svgElement = prepareTaskLab(activity);
            break;
        case ElementTypeEnum.GATE:
            svgElement = prepareGateway(activity);
            break;
    }

    svgElement.activityId = activity.id;
    svgElement.draggable();
    registerEventHandler(svgElement);

    EDITOR.elementsMap[activity.id] = {
        activity: activity,
        svgElement: svgElement,
        type: elementType,
        fromPaths: [],
        toPaths: []
    };


    return svgElement;
}

function getDimension(activity) {
    var nodeGraphicsInfos = activity.nodeGraphicsInfos;

    if (nodeGraphicsInfos && nodeGraphicsInfos.nodeGraphicsInfo.length > 0) {
        var nodeGraphicsInfo = nodeGraphicsInfos.nodeGraphicsInfo[0];

        return {
            coordinates: nodeGraphicsInfo.coordinates,
            height: nodeGraphicsInfo.height,
            width: nodeGraphicsInfo.width
        };
    }

    return {};
}

function prepareEvent(activity) {
    var dimension = getDimension(activity);

    var draw = EDITOR.draw;
    var circle = draw.circle(50);
    circle.move(dimension.coordinates.xcoordinate, dimension.coordinates.ycoordinate);

    var gradient = draw.gradient('radial', function (stop) {
        stop.at(0, '#E8FFE0');
        stop.at(1, '#B2FF99');
    });

    circle.attr({
        fill: gradient,
        stroke: '#29A329',
        'stroke-width': 2
    });

    return circle;
}

function prepareTaskResearch(activity) {
    var dimension = getDimension(activity);

    var draw = EDITOR.draw;
    var rect = draw.rect(140, 90).radius(10);
    rect.move(dimension.coordinates.xcoordinate, dimension.coordinates.ycoordinate);

    var gradient = draw.gradient('radial', function (stop) {
        stop.at(0, '#85E0FF');
        stop.at(1, '#00CCFF');
    });

    rect.attr({
        fill: gradient,
        stroke: '#3399FF',
        'stroke-width': 2
    });

    return rect;
}

function prepareTaskLab(activity) {
    var dimension = getDimension(activity);

    var draw = EDITOR.draw;
    var rect = draw.rect(140, 90).radius(10);
    rect.move(dimension.coordinates.xcoordinate, dimension.coordinates.ycoordinate);

    var gradient = draw.gradient('radial', function (stop) {
        stop.at(0, '#FFD4CA');
        stop.at(1, '#FF704D');
    });

    rect.attr({
        fill: gradient,
        stroke: '#3399FF',
        'stroke-width': 2
    });

    return rect;
}

function prepareGateway(activity) {
    var dimension = getDimension(activity);

    var draw = EDITOR.draw;
    var rect = draw.rect(50, 50);
    rect.move(dimension.coordinates.xcoordinate, dimension.coordinates.ycoordinate).rotate(45);

    var gradient = draw.gradient('radial', function (stop) {
        stop.at(0, '#FFFFDA');
        stop.at(1, '#FFFF85');
    });

    rect.attr({
        fill: gradient,
        stroke: '#FFDB4D',
        'stroke-width': 2
    });

    return rect;
}

function preparePath(from, to) {
    var draw = EDITOR.draw;
    var path = draw.path("M " + from.x + " " + from.y + " L " + to.x + " " + to.y);

    path.attr({
        stroke: 'red',
        'stroke-width': 1
    });

    path.fill('none').stroke({ width: 1 });

    prepareMarker(path);

    path.back();

    return path;
}

function prepareMarker(path) {
    var marker = EDITOR.draw.marker(10, 10)
    marker.path().attr({
        d: "M 0 0 L 10 5 L 0 10 z"
    });
    marker.ref(path.length() / 2, 5);
    path.marker('end', marker);
}

