var savePathwayAsNew = function(){
    var pathWrapper = getPathWrapperObj();

    $.ajax({
        url: 'repository/save',
        type: 'POST',
        data: JSON.stringify(pathWrapper),
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: "application/json; charset=utf-8",
        complete: function (data) {
            closePopup();
        }
    });
};

var modifyPathway = function(){
    var pathWrapper = getPathWrapperObj();

    $.ajax({
        url: 'repository/save',
        type: 'PUT',
        data: JSON.stringify(pathWrapper),
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: "application/json; charset=utf-8",
        complete: function (data) {
            closePopup();
        }
    });
};

var getPathWrapperObj = function() {
    var pathWrapper = {
        diseaseId: $('#diseaseId').val(),
        namePathway: $('#nameId').val(),
        version: $('#versionId').val(),
        comment: $('#commentId').val(),
        xpdlWrapper: prepareXPDL()
    };

    return pathWrapper;
};

var closePopup = function(){
    $('.cd-popup').removeClass('is-visible');
}