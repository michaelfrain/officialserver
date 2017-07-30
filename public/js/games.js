$(document).ready(function() {
    $.ajax({
        url:'/api/games'
    }).then(function(data) {
        for(var i=0; i < data.length; i++) {
            $('#allgames').append('<tr>'+'<td>'+data[i].date+'</td>'+'<td>'+data[i].home+'</td>'+'<td>'+data[i].visitor+'</td>'+'<td>'+data[i].conference+'</td>'+'</tr>');
        }
    });
});