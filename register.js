$(document).ready(function () {
    $('form').on('submit', function (e) {
        e.preventDefault()

        // Get form data
        var name = $('#name').val()
        var email = $('#email').val()
        var password = $('#password').val()
        var rePassword = $('#re-password').val()

        // helper function
        $.fn.showAlert = function (message, type) {
            var alertPlaceholder = $('#liveAlertPlaceholder')
            alertPlaceholder.html('<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '</div>')
            alertPlaceholder.find('.alert').append('<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>')
        }
        // validate form data name, email and password empty or not\
        if (!name) {
            $('#name').addClass('is-invalid')
            $.fn.showAlert('Field is required.', 'danger')
            return
        }
        // validate that the name doesn't contains numbers or special characters
        else if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(name)) {
            $('#name').addClass('is-invalid')
            $.fn.showAlert('Name must not contain numbers or special characters.', 'danger')
            return
        }
        else {
            $('#name').removeClass('is-invalid')
        }
        //=============================================================================
        // validate form data email and password with regex
        var emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
        var passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        if(!email){
            $('#email').addClass('is-invalid')
            $.fn.showAlert('Field is required.', 'danger')
            return
        }
        else if (!emailPattern.test(email)) {
            $('#email').addClass('is-invalid')
            $.fn.showAlert('Please enter a valid email address.', 'danger')
            return
        }
        else {
            $('#email').removeClass('is-invalid')
        }
        if(!password){
            $('#password').addClass('is-invalid')
            $.fn.showAlert('Field is required.', 'danger')
            return
        }
        else if (!passwordPattern.test(password)) {
            $('#password').addClass('is-invalid')
            $.fn.showAlert('Password must be at least 8 characters long and contain at least one letter and one number.', 'danger')
            return
        }
        else {
            $('#password').removeClass('is-invalid')
        }
        if (!rePassword) {
            $('#re-password').addClass('is-invalid')
            $.fn.showAlert('Field is required.', 'danger')
            return
        }
        else if(password !== rePassword){
            $('#re-password').addClass('is-invalid')
            $.fn.showAlert('Passwords do not match.', 'danger')
            return
        }
        else {
            $('#re-password').removeClass('is-invalid')
        }
        // validate if the email already exists
        var users = JSON.parse(localStorage.getItem('users') || '[]')
        var user = users.find(u => u.email === email)
        if (user) {
            $('#email').addClass('is-invalid')
            $.fn.showAlert('Email already exists.', 'danger')
            return
        }
        $('#email').removeClass('is-invalid')
        $('#password').removeClass('is-invalid')
        // save user data
        var users = JSON.parse(localStorage.getItem('users') || '[]')
        users.push({ name: name, email: email, password: password })
        localStorage.setItem('users', JSON.stringify(users))
        window.location.replace('login.html')
    })

    $('#googleRegisterBtn').on('click', function () {
        $.fn.showAlert('Registration successful!', 'success')
        setTimeout(function () {
            window.location.replace('login.html')
        }, 2000)
    })
})