var savePathwayAsNew = function(){
    var pathWrapper = {
        diseaseId: 1,
        namePathway: 'nazwa',
        comment: 'komentarz',
        xpdlWrapper: prepareXPDL()
    };

    $.ajax({
        url: 'repository/save',
        type: 'POST',
        data: JSON.stringify(pathWrapper),
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data);
        }
    });
};

var modifyPathway = function(){

};