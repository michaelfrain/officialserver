$(document).ready(function() {
    $.ajax({
        url: '/editmembers/json'
    }).then(function(data) {
        for(var i=0; i < data.length; i++) {
            $('#members').append('<option value]'+i+'>'+data[i].firstName+'&nbsp;'+data[i].lastName+'</option>');
        }
    });
});