var EDITOR = {};

var ElementTypeEnum = {
    EVENT: 1,
    TASK_RESEARCH: 2,
    TASK_LAB: 3,
    GATE: 4
};
var editId;
var connectId;
var trashId;

(function (ClinicalPathways) {
    ClinicalPathways(window.jQuery, window, document);
}(function ($, window, document) {
    $(function () {
        initDrawing();

        editId = $('#editId');
        connectId = $('#connectId');
        trashId = $('#trashId');

        connectId.on('click', handlerClickConnect);
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

