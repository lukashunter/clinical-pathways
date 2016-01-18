var validateForm = function(){
    var name = $('#nameId').val();
    var version = $('#versionId').val();

    if(!name || !version) return false;
    return true;
};

var savePathwayAsNew = function(){
    if (!validateForm()) {
        alertify.alert("Please, fill form correctly!");
        return;
    }

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
            alertify.success('File had been save successfully!');
        }
    });
};

var modifyPathway = function(){
    if (!validateForm()) {
        alertify.alert("Please, fill form correctly!");
        return;
    }

    var pathWrapper = getPathWrapperObj();

    $.ajax({
        url: 'repository/update',
        type: 'PUT',
        data: JSON.stringify(pathWrapper),
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: "application/json; charset=utf-8",
        complete: function (data) {
            closePopup();
            alertify.success('File had been modify successfully!');
        }
    });
};

var getPathWrapperObj = function() {
    var pathWrapper = {
        pathwayId: getIdFromUrl(),
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