
function createStart(event){
    var activity = createActivity(event);
    svgElementFactory(ElementTypeEnum.EVENT, activity);
}

function createGate(event){
    var activity = createActivity(event);
    svgElementFactory(ElementTypeEnum.GATE, activity);
}

function createLab(event){
    var activity = createActivity(event);
    svgElementFactory(ElementTypeEnum.TASK_LAB, activity);
}

function createResearch(event){
    var activity = createActivity(event);
    svgElementFactory(ElementTypeEnum.TASK_RESEARCH, activity);
}

function createActivity(event){
    var coordinates = {xcoordinate: 150, ycoordinate: 70};

    var nodeGraphicsInfos = {nodeGraphicsInfo: []};
    nodeGraphicsInfos.nodeGraphicsInfo.push(
        {
            coordinates: coordinates,
            height: -1,
            width: -1
        }
    );

    var activity = {id: generateUUID(), nodeGraphicsInfos: nodeGraphicsInfos};

    return activity;
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};