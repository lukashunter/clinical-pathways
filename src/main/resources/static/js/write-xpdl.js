var prepareActivityList = function(){
    var activityList = [];
    _.forOwn(EDITOR.elementsMap, function(value, key){
        var activity = prepareActivity(key);
        activityList.push(activity);
    });

    return activityList;
}

var prepareActivity = function(activityId){
    var element = EDITOR.elementsMap[activityId];

    var activity = {};
    activity.id = activityId
    activity.name = getTextNodeBy(activityId);
    activity.nodeGraphicsInfos = getNodeGraphicsInfosBy(activityId);

    return activity;
}

var getNodeGraphicsInfosBy = function(activityId){
    var postion = computeCenterPostion(activityId);
    var coordinates = {
        xCoordinate: postion.x,
        yCoordinate: postion.y
    };

    var nodeGraphicsInfo = {
        toolId: 'Clinical Pathways Editor',
        coordinates: coordinates
    };

    var nodeGraphicsInfoList = [];
    nodeGraphicsInfoList.push(nodeGraphicsInfo);

    var nodeGraphicsInfos = {
        nodeGraphicsInfo: nodeGraphicsInfoList
    };

    return nodeGraphicsInfos;

}