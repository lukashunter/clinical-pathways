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

var editorDimension = {width: window.innerWidth - 55, height:window.innerHeight - 80};

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

        $('#btnDownloadId').on('click', download);
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
            loadPathway();
        } else {
            alert('SVG not supported')
        }
    }
}));

var handlerEditorClick = function () {
    if (editMode.active) handleDisableEditMode();

    if (pathIdOnHover) {
        enableContextMenuForPath();
    }
};

var getEditorCursorPosition = function () {
    return {x: cursor.x - 55, y: cursor.y - 70};
};

var getTypeByActivityId = function (activityId) {
    return EDITOR.elementsMap[activityId].type;
};

var getSvgTextByActivityId = function (activityId) {
    return EDITOR.elementsMap[activityId].svgText;
};

var getSvgId = function (el) {
    return el.attr('id');
};

var getSvgTextByPath = function (path) {
    var svgId = getSvgId(path);
    var svgText = EDITOR.pathsMap[svgId].svgText;
    return svgText;
};

var getCenterPath = function (pathId) {
    var path = EDITOR.pathsMap[pathId].svgPath;

    var pathArray = path.array();
    var sx = pathArray.value[0][1]; //start
    var sy = pathArray.value[0][2]; //start
    var ex = pathArray.value[1][1]; // end
    var ey = pathArray.value[1][2]; // end

    var pos = {x: (sx + ex) / 2, y: (sy + ey) / 2};
    return pos;
};

var generateUUID = function () {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

var loadPathway = function(){
    var idFromUrl = getIdFromUrl();
    if(idFromUrl) loadXpdlById(idFromUrl);
    else disableModify();
};

var loadXpdlById = function(id){
    $.ajax({
        url: 'repository/pathways/'+id,
        type: 'POST',
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            readDiagram(data.xpdlWrapper.packageType);
            fillPathwayForm(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('ERRORS: ' + jqXHR);
            console.log('ERRORS: ' + textStatus);
            console.log('ERRORS: ' + errorThrown);
        }
    });
};

var getIdFromUrl = function(){
    var pathId = location.pathname.replace('/cp/', '');
    return pathId;
};

var fillPathwayForm = function(pathwayWrapper){
    $('#nameId').val(pathwayWrapper.namePathway);
    $('#diseaseId').val(pathwayWrapper.diseaseId);
    $('#versionId').val(pathwayWrapper.version);
    $('#commentId').val(pathwayWrapper.comment);
};

var disableModify = function(){
    $('#modifyId').css('display', 'none');
    $('#saveAsNewId').css('width','100%')
};