function svgElementFactory(elementType, activity) {
    var wrapper;

    switch (elementType) {
        case ElementTypeEnum.EVENT:
            wrapper = prepareEvent(activity);
            break;
        case ElementTypeEnum.TASK_RESEARCH:
            wrapper = prepareTaskResearch(activity);
            break;
        case ElementTypeEnum.TASK_LAB:
            wrapper = prepareTaskLab(activity);
            break;
        case ElementTypeEnum.GATE:
            wrapper = prepareGateway(activity);
            break;
    }

    var group = wrapper.group;
    var svgElement = wrapper.svgElement;

    svgElement.activityId = activity.id;
    group.activityId = activity.id;

    EDITOR.elementsMap[activity.id] = {
        group: group,
        activity: activity,
        svgElement: svgElement,
        type: elementType,
        fromPaths: [],
        toPaths: []
    };

    group.draggable({
        minX: 2
        , minY: 2
        , maxX: window.innerWidth - 57
        , maxY: window.innerHeight - 82
    });

    registerEventHandler(group);

    if (elementType != ElementTypeEnum.EVENT) prepareNodeDescription(activity);

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
}

function prepareEvent(activity) {
    var dimension = getDimension(activity);

    var group = EDITOR.draw.group();
    var circle = group.circle(50);
    group.cx(dimension.coordinates.xcoordinate).cy(dimension.coordinates.ycoordinate);

    group.on('click', handlerSelectEvent);

    var gradient = group.gradient('radial', function (stop) {
        stop.at(0, '#E8FFE0');
        stop.at(1, '#B2FF99');
    });

    circle.attr({
        fill: gradient,
        stroke: '#29A329',
        'stroke-width': 2
    });

    return {group: group, svgElement: circle};
}

function prepareTaskResearch(activity) {
    var dimension = getDimension(activity);

    var group = EDITOR.draw.group();
    var rect = group.rect(140, 90).radius(10);
    group.center(dimension.coordinates.xcoordinate, dimension.coordinates.ycoordinate);

    var gradient = group.gradient('radial', function (stop) {
        stop.at(0, '#c7f1ff');
        stop.at(1, '#1ad1ff');
    });

    rect.attr({
        fill: gradient,
        stroke: '#3399FF',
        'stroke-width': 2
    });

    return {group: group, svgElement: rect};
}

function prepareTaskLab(activity) {
    var dimension = getDimension(activity);

    var group = EDITOR.draw.group();
    var rect = group.rect(140, 90).radius(10);
    group.center(dimension.coordinates.xcoordinate, dimension.coordinates.ycoordinate);

    var gradient = group.gradient('radial', function (stop) {
        stop.at(0, '#FFD4CA');
        stop.at(1, '#FF704D');
    });

    rect.attr({
        fill: gradient,
        stroke: '#d62b00',
        'stroke-width': 2
    });

    return {group: group, svgElement: rect};
}

function prepareGateway(activity) {
    var dimension = getDimension(activity);

    var group = EDITOR.draw.group();
    var rect = group.rect(80, 80);
    group.center(dimension.coordinates.xcoordinate, dimension.coordinates.ycoordinate);
    rect.rotate(45);

    var gradient = group.gradient('radial', function (stop) {
        stop.at(0, '#FFFFDA');
        stop.at(1, '#FFFF85');
    });

    rect.attr({
        fill: gradient,
        stroke: '#FFDB4D',
        'stroke-width': 2
    });

    return {group: group, svgElement: rect};
}
