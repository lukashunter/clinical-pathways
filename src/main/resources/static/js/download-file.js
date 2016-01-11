var download = function () {
    saveXPDL().done(function (fileName) {
        $.fileDownload('download/'+encodeURI(fileName))
            .done(function () {
                alert('File download a success!');
            })
            .fail(function () {
                alert('File download failed!');
            });
    }).fail(function(jqXHR, textStatus){
        alert( "Request failed: " + textStatus );
    });
};