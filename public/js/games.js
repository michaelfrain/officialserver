$(document).ready(function() {
    $.ajax({
        url:'/api/games'
    }).then(function(data) {
        for(var i=0; i < data.length; i++) {
            var homeTeamId = data[i].home._id;
            var visitingTeamId = data[i].visitor._id;
            $.ajax({
                url:'/api/team/'+homeTeamId
            }).then(function(homeTeamData) {
                $.ajax({
                    url:'/api/team/'+visitingTeamId
                }).then(function(visitingTeamData) {
                    $('#allgames').append('<tr>'+'<td>'+data[i-1].date+'</td>'+'<td>'+homeTeamData.name+'</td>'+'<td>'+visitingTeamData.name+'</td>'+'<td>'+data[i-1].conference+'</td>'+'</tr>');
                });
            });
        }
    });
});