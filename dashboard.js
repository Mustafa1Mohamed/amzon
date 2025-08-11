$(document).ready(function () {
    let allProducts = []

    function getData() {
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
                            <div class="text-center mt-3">
                                <button class="btn btn-primary">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>`;
        });
        $('.row').html(html);
    };

    function initializeApp() {

        getData()
        $(document).on('ajaxComplete', function () {
            $.fn.displayProducts(allProducts)

        });

    }

    initializeApp();
});
