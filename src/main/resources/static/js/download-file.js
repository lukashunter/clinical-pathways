var download = function () {
    saveXPDL().done(function (fileName) {
        $.fileDownload('download/'+encodeURI(fileName))
            .done(function () {
                alertify.success('File download successfully!');
            })
            .fail(function () {
                alertify.error("File download failed!");
            });
        alertify.success('File download successfully!');
    }).fail(function(jqXHR, textStatus){
        alertify.error("File download failed!");
    });
};