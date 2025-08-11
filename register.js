$(document).ready(function () {
    $('form').on('submit', function (e) {
        e.preventDefault()

        // Get form data
        var name = $('#name').val()
        var email = $('#email').val()
        var password = $('#password').val()
        // validate form data name, email and password empty or not
        if (!name || !email || !password) {
            var alertPlaceholder = $('#liveAlertPlaceholder')
            alertPlaceholder.html('<div class="alert alert-danger alert-dismissible" role="alert">Please fill in all fields.</div>')
            alertPlaceholder.find('.alert').append('<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>')
            return
        }
        // validate form data email and password with regex
        var emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
        var passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        if (!emailPattern.test(email)) {
            $('#email').addClass('is-invalid')
            var alertPlaceholder = $('#liveAlertPlaceholder')
            alertPlaceholder.html('<div class="alert alert-danger alert-dismissible" role="alert">Please enter a valid email address.</div>')
            alertPlaceholder.find('.alert').append('<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>')
            return
        }
        if (!passwordPattern.test(password)) {
            $('#password').addClass('is-invalid')
            var alertPlaceholder = $('#liveAlertPlaceholder')
            alertPlaceholder.html('<div class="alert alert-danger alert-dismissible" role="alert">Password must be at least 8 characters long and contain at least one letter and one number.</div>')
            alertPlaceholder.find('.alert').append('<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>')
            return
        }
        // validate if the email already exists
        var users = JSON.parse(localStorage.getItem('users') || '[]')
        var user = users.find(u => u.email === email)
        if (user) {
            $('#email').addClass('is-invalid')
            var alertPlaceholder = $('#liveAlertPlaceholder')
            alertPlaceholder.html('<div class="alert alert-danger alert-dismissible" role="alert">Email already exists. Please use a different email.</div>')
            alertPlaceholder.find('.alert').append('<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>')
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
        var alertPlaceholder = $('#liveAlertPlaceholder')
        alertPlaceholder.html('<div class="alert alert-success alert-dismissible" role="alert">Google registration successful!</div>')
        alertPlaceholder.find('.alert').append('<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>')
        setTimeout(function () {
            window.location.replace('login.html')
        }, 2000)
    })
})