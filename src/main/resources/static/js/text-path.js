function prepareConnectionDescription(transition) {
    var fromId = transition.from;
    var toId = transition.to;

    var coor = computeTextPosition(fromId, toId, transition.name);

    var text = EDITOR.draw.text(transition.name).x(coor.x).y(coor.y);
    text.draggable();

    return text;
}

function preparePathDescription(contentText) {
    var coor = getCenterPath(editMode.pathId);

    var factor = (6 * contentText.length) / 2;

    var text = EDITOR.draw.text(contentText).x(coor.x-factor).y(coor.y-25);
    text.draggable();

    EDITOR.pathsMap[editMode.pathId].svgText = text;
}

var computeTextPosition = function(fromId, toId, desc) {
    var from = computeCenterPostion(fromId);
    var to = computeCenterPostion(toId);

    var x = (from.x + to.x) / 2;
    var y = (from.y + to.y) / 2;

    var factor = (6 * desc.length) / 2;

    return {x: x - factor, y: y - 25};
}

function redrawConnectionDescritpion(path) {
    var svgText = getSvgTextByPath(path);

    if (svgText) {
        var fromId = path.fromId;
        var toId = path.toId;

        var content = svgText.text();
        var coord = computeTextPosition(fromId, toId, content);

        svgText.x(coord.x).y(coord.y);
    }
}

function removeConnectionDescription(path) {
    var svgText = getSvgTextByPath(path);
    if (svgText) svgText.remove();
}

