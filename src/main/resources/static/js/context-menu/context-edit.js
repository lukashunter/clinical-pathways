function handlerEditClick() {
    var activityId = this.getAttribute('data-activityId');
    var pathId = this.getAttribute('data-pathId');

    if (activityId) {
        handleEditNode(activityId);
    } else {
        handleEditPath.call(this);
    }

    enableEditMode(activityId,pathId);
}

function handleEditNode(activityId) {
    const elementType = getTypeByActivityId(activityId);
    var svgText = getSvgTextByActivityId(activityId);

    var text = svgText ? svgText.node.textContent : '';
    preparePositionAndContentTextArea(activityId, elementType, text);
}

function handleEditPath() {
    var pathId = this.getAttribute('data-pathId');
    var svgText = EDITOR.pathsMap[pathId].svgText;
    var text = svgText ? svgText.node.textContent : '';

    var $pathTextArea = $('#pathTextAreaId');
    $pathTextArea.val(text);
    setFocus($pathTextArea);

    var pos = getCenterPath(pathId);

    var $textareaDiv = $('#pathTextAreaDivId');
    $textareaDiv.css('left', (pos.x - 10) + 'px').css('top', (pos.y - 20) + 'px');
    $textareaDiv.removeClass('hide');
    svgText.remove();
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

function setFocus($el) {
    setTimeout(function () {
        $el.focus();
    }, 20);
}

function handleDisableEditMode() {
    var el = {};
    if(editMode.activityId) {
        el = EDITOR.elementsMap[editMode.activityId]
        if (el.svgText) el.svgText.remove();
    }else{
        el.type = ElementTypeEnum.PATH
    }

    var contentText = getContentText(el.type);

    if(contentText) prepareDescription(el.type, contentText)

    disableEditMode();
}

function getContentText(type) {
    var contentText;

    if (type === ElementTypeEnum.GATE) {
        contentText = $('#gateTextAreaId').val();
    } else if (type === ElementTypeEnum.PATH) {
        contentText = $('#pathTextAreaId').val();
    } else {
        contentText = $('#taskTextAreaId').val();
    }
    return contentText;
}

function prepareDescription(type, contentText){
    if (type === ElementTypeEnum.PATH) {
        preparePathDescription(contentText)
    } else {
        prepareNodeDescription({id: editMode.activityId, name: contentText});
    }
}

function enableEditMode(activityId, pathId) {
    editMode.active = true;
    editMode.activityId = activityId;
    editMode.pathId = pathId;
}

function disableEditMode() {
    if (editMode.active) {
        var type;

        if(editMode.activityId) type = getTypeByActivityId(editMode.activityId);
        else type = ElementTypeEnum.PATH;

        if (type === ElementTypeEnum.GATE) {
            clearAndHideTextArea('gateTextAreaId','gateTextAreaDivId');
        }else if(type === ElementTypeEnum.PATH){
            clearAndHideTextArea('pathTextAreaId','pathTextAreaDivId');
        } else { //TASK_LAB || TASK_RESEARCH
            clearAndHideTextArea('taskTextAreaId','taskTextAreaDivId');
        }
        editMode.activityId = null;
        editMode.pathId = null;
        editMode.active = false;
    }
}

function clearAndHideTextArea(textAreaId, divId){
    var $textArea = $('#' + textAreaId);
    $textArea.val('');
    $('#'+divId).addClass('hide');
}

function hideEditButton() {
    editId.addClass('hide');
}

function showEditButton() {
    editId.removeClass('hide');
}