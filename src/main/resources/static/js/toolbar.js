
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