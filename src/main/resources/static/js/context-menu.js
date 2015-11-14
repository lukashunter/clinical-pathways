function registerEventSelectionHandler(group){
    group.on('click', handlerSelection);
    group.on('touchend', handlerSelection);
}

function handlerSelection() {
    var activityId = this.activityId;
    if (connectMode.active) createTransitions(activityId);

    if(EDITOR.elementsMap[activityId].type === ElementTypeEnum.EVENT) hideEditButton();
    else showEditButton();

    var pos = getPositionContextMenu(activityId);

    var contextMenu = $('.context-menu');
    contextMenu.css('left', pos.x + 'px').css('top', pos.y + 'px');
    contextMenu.removeClass('hide');

    editId.attr('data-activityId', activityId);
    connectId.attr('data-activityId', activityId);
    trashId.attr('data-activityId', activityId);
}

function hideEditButton(){
    editId.addClass('hide');
}

function showEditButton(){
    editId.removeClass('hide');
}


function getPositionContextMenu(activityId) {
    var coordinates = computeCenterPostion(activityId);
    const elementType = EDITOR.elementsMap[activityId].type;

    var position;

    switch (elementType){
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

function createTransitions(toId) {
    $('#drawing').off();
    connectMode.active = false;
    connectMode.path.remove();

    var transitions = {
        from: connectMode.fromId,
        to: toId,
        name: ''
    };

    prepareConnection(transitions);
}

function handlerEditClick(){
    var activityId = this.getAttribute('data-activityId');
    const elementType = getTypeByActivityId(activityId);
    var svgText = getSvgTextByActivityId(activityId);

    var text = svgText ? svgText.node.textContent : '';
    preparePositionAndContentTextArea(activityId, elementType, text);

    enableEditMode(activityId);
}

function preparePositionAndContentTextArea(activityId, elementType, text) {
    var pos = computeCenterPostion(activityId);
    var $textareaDiv;
    if (elementType === ElementTypeEnum.GATE) {
        var $gateTextArea = $('#gateTextAreaId');
        $gateTextArea.val(text);
        setFocus($gateTextArea);

        $textareaDiv = $('#gateTextAreaDivId');
        $textareaDiv.css('left', (pos.x + 15) + 'px').css('top', (pos.y + 35) + 'px');
    } else {
        var $taskTextArea = $('#taskTextAreaId');
        $taskTextArea.val(text);
        setFocus($taskTextArea);

        $textareaDiv = $('#taskTextAreaDivId');
        $textareaDiv.css('left', (pos.x - 15) + 'px').css('top', (pos.y + 27) + 'px');
    }
    $textareaDiv.removeClass('hide');
}

function setFocus($el){
    setTimeout(function() {
        $el.focus();
    }, 20);
}

function handlerConnectClick() {
    var activityId = this.getAttribute('data-activityId');
    createNewPath(activityId);
}

function handlerRemoveClick() {
    var activityId = this.getAttribute('data-activityId');
    disableEditMode();
    removeElement(activityId);
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
        removeConnectionDescription(path);
        notifyToElements(path);
        path.remove();
    });


    _.forEach(element.toPaths, function (path) {
        removeConnectionDescription(path);
        notifyFromElements(path);
        path.remove();
    });
}

function notifyToElements(path){
    var paths = EDITOR.elementsMap[path.toId].toPaths;

    _.remove(paths, function(p) {
        return _.isEqual(p, path);
    });
}

function notifyFromElements(path){
    var paths = EDITOR.elementsMap[path.fromId].fromPaths;

    _.remove(paths, function(p) {
        return _.isEqual(p, path);
    });
}

function handlerEditorClick () {
    if(editMode.active) {
        handleDisableEditMode();
    }
}

function handleDisableEditMode() {
    var el = EDITOR.elementsMap[editMode.activityId]
    if (el.svgText) el.svgText.remove();

    var contentText;

    /* node description*/
    if (el.type === ElementTypeEnum.GATE) {
        contentText = $('#gateTextAreaId').val();
    } else {
        contentText = $('#taskTextAreaId').val();
    }

    disableEditMode();

    prepareNodeDescription({id: editMode.activityId, name: contentText});
}