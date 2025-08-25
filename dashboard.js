$(document).ready(function () {
    let allProducts = []
    let currentPage = 1;
    let totalPages = 1;
    $.fn.getData = function () {
        $.ajax({
            url: 'https://fakestoreapi.com/products',
            type: 'GET',
            success: function (data) {
                allProducts = data;
            },
            error: function (errMessage) {
                console.log(errMessage);
            }
        });
    }

    $.fn.displayProducts = function (products) {
        let html = '';
        products.forEach(function (product) {
            html += `
                <div class="product col-12 col-md-6 col-lg-4 mb-4">
                    <div class="card shadow-sm h-100">
                        <img src="${product.image}" class="card-img-top size" alt="${product.title}" style="height:250px; object-fit:fill;">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text flex-grow-1">${product.description}</p>
                            <p class="card-price bg-warning w-25 p-2 border rounded price"><b>$${product.price}</b></p>
                            <div class="text-center mt-3">
                                <button class="btn btn-primary add-to-cart">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>`;
        });
        $('.row').html(html);
    };

    $.fn.initializeApp = function () {

        $.fn.getData()
        $(document).on('ajaxComplete', function () {
            $.fn.displayCurrentPage();
            $.fn.initializePagination()
        });
    }


    // add to cart logic
    $(document).on('click', '.add-to-cart', function () {
        var user=localStorage.getItem('currentUser')
        if(!user){
            window.location.replace('login.html')
            return
        }
        const productTitle = $(this).closest('.product').find('.card-title').text();
        const productDescription = $(this).closest('.product').find('.card-text').text();
        const productImage = $(this).closest('.product').find('.card-img-top').attr('src');
        const productPrice = parseFloat($(this).closest('.product').find('.card-price').text().replace('$', ''));
        const product = {
            title: productTitle,
            description: productDescription,
            image: productImage,
            price: productPrice,
            currentUser: user,
            quantatiy: 1
        };
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartItems.some(item => item.title === product.title)) {
            const item = cartItems.find(item => item.title === product.title);
            item.quantatiy++; 
            console.log(item.quantatiy)
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return;
        }
        cartItems.push(product);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        var alertPlaceholder = $('#liveAlertPlaceholder')
       setInterval(() => {
        alertPlaceholder.html('')
       }, 2000)
        alertPlaceholder.html('<div class="alert alert-success alert-dismissible" role="alert">Product added to cart successfully.</div>')
        alertPlaceholder.find('.alert').append('<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>')
    });

    $.fn.initializeApp();
    $.fn.initializePagination = function () {
        totalPages = Math.ceil(allProducts.length / 5);
        $('.pagination__pages').html('');
        for (let i = 1; i <= totalPages; i++) {
            $('.pagination__pages').append(`<div class="pagination__btn pagination__page ${i === 1 ? 'active' : ''}">${i}</div>`);
        }
        $('.pagination__page').on('click', function () {
            const page = parseInt($(this).text());
            $('.pagination__page').removeClass('active');
            $(this).addClass('active');
            currentPage = page;
            $.fn.displayCurrentPage();
        });
    }


    $('.right-btn').on('click', function () {
        if (currentPage < totalPages) {
            currentPage++;
            $('.pagination__page').removeClass('active');
            $(`.pagination__page:contains(${currentPage})`).addClass('active');
            $.fn.displayCurrentPage();
        }
    });

    $('.left-btn').on('click', function () {
        if (currentPage > 1) {
            currentPage--;
            $('.pagination__page').removeClass('active');
            $(`.pagination__page:contains(${currentPage})`).addClass('active');
            $.fn.displayCurrentPage();
        }
    });
    $.fn.displayCurrentPage = function () {
        const start = (currentPage - 1) * 5;
        const end = start + 5;
        const currentProducts = allProducts.slice(start, end);
        $.fn.displayProducts(currentProducts);
    };
    $('.logout').on('click', function () {
        window.location.replace('login.html')
    });

    $('.logout').text('logout').css('background-color', 'red');

    var user = localStorage.getItem('currentUser');

    if (!user) {
        $('.logout').text('Login').off('click').on('click', function () {
            window.location.replace('login.html');
        });
        $('.cart').off('click').on('click', function () {
            window.location.replace('login.html');
        });
    } else {
        $('.logout').text('Logout').off('click').on('click', function () {
            localStorage.removeItem('currentUser'); // clear
            window.location.replace('login.html');
        });
    }

    $('.nav-item').each(function () {
        let currentPath = window.location.pathname.split("/").pop(); // e.g. "cart.html"
        let linkPath = $(this).find('a').attr('href');

        if (linkPath === currentPath) {
            $(this).find('a').addClass('active');  // apply to <a>
        } else {
            $(this).find('a').removeClass('active');
        }
    });

});
