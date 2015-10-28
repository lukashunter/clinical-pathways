
function svgElementFactory(elementType, activity) {
    var svgElement;

    var dimension = getDimension(activity);

    switch (elementType) {
        case ElementTypeEnum.EVENT:
            svgElement = prepareEvent(dimension);
            break;
        case ElementTypeEnum.TASK_RESEARCH:
            svgElement = prepareTaskReseach(dimension);
            break;
        case ElementTypeEnum.TASK_LAB:
            svgElement = prepareTaskLab(dimension);
            break;
        case ElementTypeEnum.GATE:
            svgElement = prepareGateway(dimension);
            break;
    }

    return svgElement;
}

function getDimension(activity){
    var nodeGraphicsInfos = activity.nodeGraphicsInfos;

    if(nodeGraphicsInfos &&  nodeGraphicsInfos.nodeGraphicsInfo.length > 0){
        var nodeGraphicsInfo = nodeGraphicsInfos.nodeGraphicsInfo[0];

        return {
            coordinates: nodeGraphicsInfo.coordinates,
            height: nodeGraphicsInfo.height,
            width: nodeGraphicsInfo.width
        };
    }

    return {};
}

function prepareEvent(dimension){
    var draw = EDITOR.draw;
    var circle = draw.circle(50);

    var gradient = draw.gradient('radial', function(stop) {
        stop.at(0, '#E8FFE0');
        stop.at(1, '#B2FF99');
    });

    circle.attr({
        fill: gradient,
        stroke: '#29A329',
        'stroke-width': 2
    });

    circle.move(dimension.coordinates.xcoordinate, dimension.coordinates.ycoordinate);
    circle.draggable();

    circle.typeEnum = ElementTypeEnum.EVENT;

    return circle;
}

function prepareTaskReseach(dimension){
    var draw = EDITOR.draw;
    var rect = draw.rect(140, 90)
    rect.radius(10)

    var gradient = draw.gradient('radial', function(stop) {
        stop.at(0, '#85E0FF');
        stop.at(1, '#00CCFF');
    });

    rect.attr({
        fill: gradient,
        stroke: '#3399FF',
        'stroke-width': 2
    });

    rect.typeEnum = ElementTypeEnum.TASK_RESEARCH;

    rect.move(dimension.coordinates.xcoordinate, dimension.coordinates.ycoordinate);
    rect.draggable();

    return rect;
}

function prepareTaskLab(dimension){
    var draw = EDITOR.draw;
    var rect = draw.rect(140, 90)
    rect.radius(10)

    var gradient = draw.gradient('radial', function(stop) {
        stop.at(0, '#FFD4CA');
        stop.at(1, '#FF704D');
    });

    rect.attr({
        fill: gradient,
        stroke: '#3399FF',
        'stroke-width': 2
    });

    rect.typeEnum = ElementTypeEnum.TASK_LAB;

    rect.move(dimension.coordinates.xcoordinate, dimension.coordinates.ycoordinate);
    rect.draggable();

    return rect;
}

function prepareGateway(dimension){
    var draw = EDITOR.draw;
    var rect = draw.rect(50,50);
    rect.move(dimension.coordinates.xcoordinate, dimension.coordinates.ycoordinate);

    var gradient = draw.gradient('radial', function(stop) {
        stop.at(0, '#FFFFDA');
        stop.at(1, '#FFFF85');
    });

    rect.attr({
        fill: gradient,
        stroke: '#FFDB4D',
        'stroke-width': 2
    });

    rect.typeEnum = ElementTypeEnum.GATE;

    rect.rotate(45);
    rect.draggable();

    return rect;
}

function prepareTransition(coordinates){
    console.log(coordinates);
    /*    coordinates = [[0,0], [100,50], [50,100], [150,50], [200,50], [250,100], [300,50], [350,50]];*/
    var draw = EDITOR.draw;
    var transition = draw.polyline(coordinates).fill('none').stroke({ width: 1.2 })

    return transition;
}