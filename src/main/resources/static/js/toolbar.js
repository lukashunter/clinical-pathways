
var createStart = function (event){
    var activity = createActivity(event);
    svgElementFactory(ElementTypeEnum.EVENT, activity);
};

var createGate = function (event){
    var activity = createActivity(event);
    svgElementFactory(ElementTypeEnum.GATE, activity);
};

var createLab = function (event){
    var activity = createActivity(event);
    svgElementFactory(ElementTypeEnum.TASK_LAB, activity);
};

var createResearch = function (event){
    var activity = createActivity(event);
    svgElementFactory(ElementTypeEnum.TASK_RESEARCH, activity);
};

var createActivity = function (){
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
};