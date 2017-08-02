$(document).on('change', '#members', function() {
    var selectedOption = $('#members').val();
    if (selectedOption == 0) {
        $('form.form-editmembers-hidden').css('display','none');
    } else {
        $.ajax({
            url: 'api/editmembers'
        }).then(function(data) {
            var changeUser = data[selectedOption - 1]
            $('#inputFirstName').val(changeUser.firstName);
            $('#inputLastName').val(changeUser.lastName);
            $('#inputEmail').val(changeUser.username);
            $('#roleEdit').val(changeUser.role);
            $('form.form-editmembers-hidden').css('display', 'block');
        });
    }
});