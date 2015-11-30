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

var contextMode = {active: false};

var pathIdOnHover;

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

            onHoverPath();
        });

        $(document).on('click', '#drawing', handlerEditorClick);
        $(document).on('mouseup', '#drawing', function () {
            disableContextMode();
        });

        $('#btnDownloadId').on('click', saveXPDL);
        $('#btnRepoId').on('click', function(){
            window.location.href = 'pathways';
        });

        $('#saveAsNewId').on('click', savePathwayAsNew);
        $('#modifyId').on('click', modifyPathway);

    });

    var initDrawing = function() {
        var drawing = document.getElementById("drawing");

        if(!drawing) return;

        if (SVG.supported) {
            EDITOR.draw = SVG('drawing').size(window.innerWidth - 55, window.innerHeight - 80);
            EDITOR.elementsMap = {};
            EDITOR.pathsMap = {};
        } else {
            alert('SVG not supported')
        }
    }
}));

function handlerEditorClick() {
    if (editMode.active) handleDisableEditMode();

    if (pathIdOnHover) {
        enableContextMenuForPath();
    }
}

function getEditorCursorPosition() {
    return {x: cursor.x - 55, y: cursor.y - 70};
}

function getTypeByActivityId(activityId) {
    return EDITOR.elementsMap[activityId].type;
}

function getSvgTextByActivityId(activityId) {
    return EDITOR.elementsMap[activityId].svgText;
}

function getSvgId(el) {
    return el.attr('id');
}

function getSvgTextByPath(path) {
    var svgId = getSvgId(path);
    var svgText = EDITOR.pathsMap[svgId].svgText;
    return svgText;
}

function getCenterPath(pathId) {
    var path = EDITOR.pathsMap[pathId].svgPath;

    var pathArray = path.array();
    var sx = pathArray.value[0][1]; //start
    var sy = pathArray.value[0][2]; //start
    var ex = pathArray.value[1][1]; // end
    var ey = pathArray.value[1][2]; // end

    var pos = {x: (sx + ex) / 2, y: (sy + ey) / 2};
    return pos;
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}