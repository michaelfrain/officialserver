$(document).ready(function() {
    $.ajax({
        url: '/api/teams'
    }).then(function(data) {
        for(var i=0; i < data.length; i++) {
            var newValue = data[i]._id;
            $('#visitingTeam').append('<option value='+newValue+'>'+data[i].name+'</option>');
        }
    });
});