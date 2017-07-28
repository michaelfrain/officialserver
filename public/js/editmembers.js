$(document).ready(function() {
    $.ajax({
        url: '/api/editmembers'
    }).then(function(data) {
        for(var i=0; i < data.length; i++) {
            $('#members').append('<option value='+data[i].id+'>'+data[i].firstName+'&nbsp;'+data[i].lastName+'</option>');
        }
    });
});