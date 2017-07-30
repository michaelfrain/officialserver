$(document).ready(function() {
    $.ajax({
        url: '/api/editmembers'
    }).then(function(data) {
        for(var i=0; i < data.length; i++) {
            var newValue = i + 1;
            $('#members').append('<option value='+newValue+'>'+data[i].firstName+'&nbsp;'+data[i].lastName+'</option>');
        }
    });
});