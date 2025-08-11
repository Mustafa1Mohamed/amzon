$(document).ready(function () {
    $('form').on('submit', function (e) {
        e.preventDefault()

        // Get form data
        var email = $('#email').val()
        var password = $('#password').val()
        // validate form data email and password empty or not
        if (!email || !password) {
            var alertPlaceholder = $('#liveAlertPlaceholder')
            alertPlaceholder.html('<div class="alert alert-danger alert-dismissible" role="alert">Please fill in all fields.</div>')
            alertPlaceholder.find('.alert').append('<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>')
            return
        }
        // check if the data in local storage
        var users = JSON.parse(localStorage.getItem('users') || '[]')
        var user = users.find(u => u.email === email && u.password === password)
        if (user) {
            $('#email').removeClass('is-invalid')
            $('#password').removeClass('is-invalid')
            setTimeout(function () {
                window.location.replace('dashboard.html')
            }, 2000)
            var alertPlaceholder = $('#liveAlertPlaceholder')
            alertPlaceholder.html('<div class="alert alert-success alert-dismissible" role="alert">Login successful!</div>')
            alertPlaceholder.find('.alert').append('<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>')
        } else {
            $('#email').addClass('is-invalid')
            $('#password').addClass('is-invalid')
            var alertPlaceholder = $('#liveAlertPlaceholder')
            alertPlaceholder.html('<div class="alert alert-danger alert-dismissible" role="alert">Invalid email or password. Please try again.</div>')
            alertPlaceholder.find('.alert').append('<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>')
        }
    })


    $('#googleLoginBtn').on('click', function () {
        var googleUser = {
            email: 'Tb7Wc@example.com',
            password: '123456'
        }
        var users = JSON.parse(localStorage.getItem('users') || '[]')
        var user = users.find(u => u.email === googleUser.email && u.password === googleUser.password)
        if (user) {
            setTimeout(function () {
                window.location.replace('dashboard.html')
            }, 2000)
            var alertPlaceholder = $('#liveAlertPlaceholder')
            alertPlaceholder.html('<div class="alert alert-success alert-dismissible" role="alert">Login successful!</div>')
            alertPlaceholder.find('.alert').append('<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>')
        } else {
            var alertPlaceholder = $('#liveAlertPlaceholder')
            alertPlaceholder.html('<div class="alert alert-danger alert-dismissible" role="alert">Invalid email or password. Please try again.</div>')
            alertPlaceholder.find('.alert').append('<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>')
        }
    })


})