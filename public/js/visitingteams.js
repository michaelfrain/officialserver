$(document).ready(function() {
    $.ajax({
        url: '/api/teams'
    }).then(function(data) {
        for(var i=0; i < data.length; i++) {
            var newValue = i + 1;
            $('#visitingTeam').append('<option value='+newValue+'>'+data[i].name+'</option>');
        }
    });
});