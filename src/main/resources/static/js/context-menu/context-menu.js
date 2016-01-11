function registerEventSelectionHandler(group) {
    group.on('click', handlerSelection);
    group.on('touchend', handlerSelection);
}

function handlerSelection(e) {
    e.stopPropagation();
    disableContextMode();
    disableEditMode();
    enableContextMenuForNode.call(this);
}

function enableContextMenuForNode() {
    var activityId = this.activityId;
    if (connectMode.active) createTransitions(activityId);

    if (EDITOR.elementsMap[activityId].type === ElementTypeEnum.EVENT) hideEditButton();
    else showEditButton();

    showConnectButton();

    var pos = getPositionContextMenu(activityId);
    showContextMenu(pos, activityId);
    contextMode.active = true;
}

function showContextMenu(pos, activityId) {
    var contextMenu = $('.context-menu');
    contextMenu.css('left', pos.x + 'px').css('top', pos.y + 'px');
    contextMenu.removeClass('hide');
    contextMenu.removeClass('flex');

    editId.attr('data-activityId', activityId);
    connectId.attr('data-activityId', activityId);
    trashId.attr('data-activityId', activityId);
}

function getPositionContextMenu(activityId) {
    var coordinates = computeCenterPostion(activityId);
    const elementType = EDITOR.elementsMap[activityId].type;

    var position;

    switch (elementType) {
        case ElementTypeEnum.EVENT:
            position = {x: coordinates.x + 85, y: coordinates.y + 45};
            break;
        case ElementTypeEnum.TASK_RESEARCH:
        case ElementTypeEnum.TASK_LAB:
            position = {x: coordinates.x + 130, y: coordinates.y + 30};
            break;
        case ElementTypeEnum.GATE:
            position = {x: coordinates.x + 115, y: coordinates.y + 25};
            break;
    }

    return position;
}


function enableContextMenuForPath() {
    showEditButton();
    hideConnectButton();

    var pos = getCenterPath(pathIdOnHover)
    showContextMenuForPath(pos)
}

function showContextMenuForPath(pos) {
    var contextMenu = $('.context-menu');
    contextMenu.css('left', pos.x + 30 + 'px').css('top', pos.y + 80 + 'px');
    contextMenu.removeClass('hide');
    contextMenu.addClass('flex');

    editId.attr('data-activityId', '');
    connectId.attr('data-activityId', '');
    trashId.attr('data-activityId', '');

    editId.attr('data-pathId', pathIdOnHover);
    connectId.attr('data-pathId', pathIdOnHover);
    trashId.attr('data-pathId', pathIdOnHover);

    contextMode.active = true;
}

var disableContextMode = function () {
    if (contextMode.active){
        contextMode.active = false;
        $('.context-menu').addClass('hide');
    }
}