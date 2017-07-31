$(document).ready(function() {
    $('#editmember').click(function() {
        var newData = $('#memberinfo').serializeArray();
        var selectedOption = $('#members').val();
        $.ajax({
            url: '/api/editmembers'
        }).then(function(data) {
            var currentUser = data[selectedOption - 1];
            currentUser.firstName = newData[0].value;
            currentUser.lastName = newData[1].value;
            currentUser.email = newData[2].value;
            currentUser.role = newData[3].value;
            $.ajax({
                type: 'PUT',
                url: '/api/editmember/'+currentUser._id,
                contentType: 'application/json',
                data: currentUser
            }).then(function() {
                
            });
        });
    });
});