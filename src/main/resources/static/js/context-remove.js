function handlerRemoveClick() {
    var activityId = this.getAttribute('data-activityId');
    var pathId = this.getAttribute('data-pathId');

    if (editMode.active) disableEditMode();

    if (activityId) removeElement(activityId);
    else removeSvgPath(pathId);
}

function removeSvgPath(pathId){
    $('.context-menu').addClass('hide');

    var svgPath = EDITOR.pathsMap[pathId].svgPath;

    notifyToElements(svgPath);
    notifyFromElements(svgPath);
    removePath(svgPath)
}

function removeElement(activityId) {
    $('.context-menu').addClass('hide');

    var element = EDITOR.elementsMap[activityId];
    removePathsByElement(element);
    element.group.remove();
    element.svgElement.remove();

    delete EDITOR.elementsMap[activityId]
}

function removePathsByElement(element) {
    _.forEach(element.fromPaths, function (path) {
        removePath(path)
        notifyToElements(path);
    });

    _.forEach(element.toPaths, function (path) {
        removePath(path)
        notifyFromElements(path);
    });
}

function removePath(path) {
    removeConnectionDescription(path);
    path.remove();

    var pathSvgId = getSvgId(path);
    delete EDITOR.pathsMap[pathSvgId]
}

function notifyToElements(path) {
    var paths = EDITOR.elementsMap[path.toId].toPaths;

    _.remove(paths, function (p) {
        return _.isEqual(p, path);
    });
}

function notifyFromElements(path) {
    var paths = EDITOR.elementsMap[path.fromId].fromPaths;

    _.remove(paths, function (p) {
        return _.isEqual(p, path);
    });
}