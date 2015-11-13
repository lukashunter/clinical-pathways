function handlerSelectEvent() {
    var activityId = this.activityId;
    var coodinates = computeCenterPostion(activityId);
    var x =  coodinates.x + 85;
    var y =  coodinates.y + 25;

    var contextMenu = $('.context-menu');
    contextMenu.css('left', x + 'px').css('top', y+'px');
    contextMenu.removeClass('hide');

    editId.attr('data-activityId', activityId);
    connectId.attr('data-activityId', activityId);
    trashId.attr('data-activityId', activityId);
}

function handlerClickConnect(){
    var activityId = this.getAttribute('data-activityId');



    var from = EDITOR.elementsMap[activityId];
}

