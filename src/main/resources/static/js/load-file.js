$(document).on('change', '.btn-file :file', function () {
    var input = $(this);
    var fileName = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    console.log(fileName);

    var files = input.get(0).files;

    sendFileToServer(files);
});

var sendFileToServer = function (files) {
    var formData = new FormData();

    var file = files[0];
    formData.append('file', file, file.name);

    var fileExtension = file.name.split("\.")[1];

    if(fileExtension && fileExtension.toUpperCase() == 'XPDL') sendFile(formData);
    else alertify.alert("File is incorrect!");
};


var sendFile = function (data) {
    $.ajax({
        url: 'upload',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        success: function (data, textStatus, jqXHR) {
            readDiagram(data)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('ERRORS: ' + textStatus);
        }
    });
}