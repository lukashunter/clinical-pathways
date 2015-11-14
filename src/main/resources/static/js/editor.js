var EDITOR = {};

var ElementTypeEnum = {
    EVENT: 1,
    TASK_RESEARCH: 2,
    TASK_LAB: 3,
    GATE: 4,
    PATH: 5
};

var editId;
var connectId;
var trashId;

var cursor = {};
var connectMode = {active: false};
var editMode = {active: false};

(function (ClinicalPathways) {
    ClinicalPathways(window.jQuery, window, document);
}(function ($, window, document) {
    $(function () {
        initDrawing();

        editId = $('#editId');
        connectId = $('#connectId');
        trashId = $('#trashId');

        editId.on('click', handlerEditClick);
        connectId.on('click', handlerConnectClick);
        trashId.on('click', handlerRemoveClick);

        $(document).on('mousemove', 'body', function (event) {
            cursor.x = event.pageX;
            cursor.y = event.pageY;
        });

        $(document).on('click', '#drawing', handlerEditorClick);
    });

    function initDrawing() {
        if (SVG.supported) {
            EDITOR.draw = SVG('drawing').size(window.innerWidth - 55, window.innerHeight - 80);
            EDITOR.elementsMap = {};
        } else {
            alert('SVG not supported')
        }
    }
}));

function getTypeByActivityId(activityId){
    return EDITOR.elementsMap[activityId].type;
}

function getSvgTextByActivityId(activityId){
    return EDITOR.elementsMap[activityId].svgText;
}

function enableEditMode(activityId) {
    editMode.active = true;
    editMode.activityId = activityId;
}

function disableEditMode(){
    editMode.active = false;

    var type = getTypeByActivityId(editMode.activityId);

    if (type === ElementTypeEnum.GATE) {
        var $gateTextArea = $('#gateTextAreaId');
        $gateTextArea.val('');
        $('#gateTextAreaDivId').addClass('hide');
    } else {
        var $taskTextArea = $('#taskTextAreaId');
        $taskTextArea.val('');
        $('#taskTextAreaDivId').addClass('hide');
    }
}