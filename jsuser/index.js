var arrSP = [];
var flag=0; 
$(document).ready(function () {

    var cartItems = JSON.parse(localStorage.getItem("CartFood111111"));
    console.log(cartItems);
    if (cartItems != null) {
        $(".cartNumberQuantity").html('<span class="icon-shopping_cart"></span>[' + cartItems.items.length + ']');
    }else{
        $(".cartNumberQuantity").html('<span class="icon-shopping_cart"></span>[0]');
    }
    var ma = '';
    var price = '';
    var sign = '';
    //let dollarUSLocale = Intl.NumberFormat('vi-VN');

    showALLGroupInFilter();
    showALLGroup();//gọi hàm
    showProduct("",0,record);
    $(".addGroup").on("click", ".clickviewproduct", function () {


        ma = $(this).attr("data-manhom");
        showProduct(ma,0,record);
        moveID("allproduct");
        flag=0;

    })
    $(".pagenumberproduct").on('click', 'button', function () {
        if(flag==0)
        showProduct(ma, $(this).val(), record);
        if(flag==1)
        showProductSearch(ma, search,$(this).val(),record);
        if(flag==2)
        showProductPrice(ma, price, sign,$(this).val(),record);
    })
    //loc
    $(".addFilterProduct").on("click", ".clickfilternhom", function () {

        ma = $(this).attr("data-manhom");
        var ten = $(this).attr("data-tennhom");
        $(".addTitleFilter").html(ten);
        moveID("allproduct");
        showProduct(ma,0,record);
        flag=0;
    });
    $(".txtsearchmh").keyup(function (e) {
        var search = $(".txtsearchmh").val();
        if (e.which == 13) {
            moveID("allproduct");
            showProductSearch(ma, search,0,record);
            flag=1;
        }
    });
    $(".btnsearchmh").click(function () {
        var search = $(".txtsearchmh").val();
        moveID("allproduct");
        showProductSearch(ma, search,0,record);
        flag=1;
    });
    $(".cbsearchsign").change(function () {
        moveID("allproduct");
         price = $(".txtsearchprice").val();
         sign = $(".cbsearchsign").val();
        //   console.log(price);
        showProductPrice(ma, price, sign,0,record);
        flag=2;
    })
    $(".cbsearchsign").click(function () {
        moveID("allproduct");
         price = $(".txtsearchprice").val();
         sign = $(".cbsearchsign").val();
        console.log(price);
        showProductPrice(ma, price, sign,0,record);
        flag=2;
    });
    $(".addListProduct").on('click', '.addcart', function () {
        var cartItems = localStorage.getItem("CartFood111111");
        if (cartItems == null) {
            cartItems = [];
        } else {
            cartItems = JSON.parse(localStorage.getItem("CartFood111111")).items;
        }
        var vt = $(this).attr("data-vt");
        console.log(vt);
        //Dinh nghia item muc hang
        var items = {
            mamh: arrSP[vt].mamh,
            tenmh: arrSP[vt].tenmh,
            gia: arrSP[vt].gia,
            soluong: 1,

            tenlh: arrSP[vt].tenlh,
            malh: arrSP[vt].malh,
            manhom: arrSP[vt].manhom,
            urlsanpham: arrSP[vt].hinh,
            dvt: arrSP[vt].dvt,
            mota: arrSP[vt].mota
        }
        console.log(items);
        //add vao mang 
        cartItems.push(items);
        //Dinh nghia gio hang
        var carts = {
            username: "",
            items: cartItems

        }
        localStorage.setItem("CartFood111111", JSON.stringify(carts));
        //     //luu vao localstore
        var cartItems = JSON.parse(localStorage.getItem("CartFood111111"));
        console.log(cartItems);
        $(".cartNumberQuantity").html('<span class="icon-shopping_cart"></span>[' + cartItems.items.length + ']');
    })

});
//Định nghĩa 1 hàm hiển thị tất cả nhóm trong csdl vào trang index
showALLGroup = () => {
    var datasend = {

    }
    $.ajax({
        url: "back_end/api_getallgroup.php",
        data: datasend,
        method: "POST",
        dataType: 'json',
        success: function (res, status, xhr) {
            if (xhr.status == 200) { //200ok, 404:file not found, 500: error server
                //   console.log(res);
                var htmls = '';
                var mang_items = res.items;
                console.log(mang_items);
                for (var item in mang_items) {
                    var ob = mang_items[item];
                    //   console.log(ob);
                    htmls = htmls + '<div  class="col-md-4 text-center d-flex align-self-stretch ">' +
                        '<div class="media block-6 services mb-md-0 mb-4">' +
                        '<div data-manhom="' + ob.manhom + '" class="icon bg-color-1  d-flex justify-content-center align-items-center mb-2 clickviewproduct">' +
                        '<span><img src="images/' + ob.iconnhom + '" width="100" height="100" /></span> ' +
                        '</div>' +
                        '<div class="media-body">' +
                        ' <h3 class="heading">' + ob.tennhom + '</h3>' +

                        '</div>' +
                        '</div>' +
                        '</div>';
                }
                $(".addGroup").html(htmls);
            } else if (xhr.status == 404) {
                alert("Lỗi tập tin không còn");
            } else {
                alert("Lỗi server");
            }
        }
    });
}
showALLGroupInFilter = () => {
    var datasend = {

    }
    $.ajax({
        url: "back_end/api_getallgroup.php",
        data: datasend,
        method: "POST",
        dataType: 'json',
        success: function (res, status, xhr) {
            if (xhr.status == 200) { //200ok, 404:file not found, 500: error server
                //console.log(res);
                var htmls = '<a class="dropdown-item clickfilternhom" href="#filter" data-manhom="" data-tennhom="Tất cả"><i class="ion-ios-heart"></i>&nbsp;Tất cả </a>';
                var mang_items = res.items;
                //console.log(mang_items);
                for (var item in mang_items) {
                    var ob = mang_items[item];

                    htmls = htmls + '<a class="dropdown-item clickfilternhom" href="#filter" data-manhom=' + ob.manhom + ' data-tennhom="' + ob.tennhom + '" ><i class="ion-ios-heart"></i>&nbsp;' + ob.tennhom + '</a>';
                }
                $(".addFilterProduct").html(htmls);
            } else if (xhr.status == 404) {
                alert("Lỗi tập tin không còn");
            } else {
                alert("Lỗi server");
            }
        }
    });
}
showProduct = (ma,page,record) => {
    var datasend = {
        manhom: ma,
        page:page,
        record:record
    }
  
    $(".addListProduct").html('<img src="images/loading.gif" width=50 height=50 />');
    $.ajax({
        url: "back_end/api_getalllmathangbymanhom.php",
        data: datasend,
        method: "POST",
        dataType: 'json',
        success: function (res, status, xhr) {
            if (xhr.status == 200) { //200ok, 404:file not found, 500: error server

                var htmls = '';
                var mang_items = res.items;

                if (mang_items.length == 0) {
                    $(".addListProduct").html("Không tìm thấy mặt hàng");
                    $(".pagenumberproduct").html("");
                } else {
                    arrSP = mang_items;
                    for (var item in mang_items) {
                        var ob = mang_items[item];

                        var htmloverplayphantram = '';
                        var discount = ob.gia - (ob.giamgia * ob.gia) / 100;
                        var dollarUSLocale = Intl.NumberFormat('en-US');

                        if (ob.giamgia == 0) {

                            htmloverplayphantram = '';
                        } else {
                            var phantram = ob.giamgia + "%";
                            htmloverplayphantram = '<span class="status">Giảm&nbsp;' + phantram + '</span>' +
                                '<div class="overlay"></div>';
                        }
                        htmls = htmls + '<div class="col-md-6 col-lg-3">' +
                            '<div class="product">' +
                            '<a href="detailproduct.html?mamh=' + ob.mamh + '&manhom=' + ob.manhom + '" class="img-prod"><img class="img-fluid" src="images/' + ob.hinh + '" alt="Colorlib Template">' +
                            htmloverplayphantram +
                            '</a>' +
                            '<div class="text py-3 pb-4 px-3 text-center">' +
                            '<h3><a href="#">' + ob.tenmh + '</a></h3>' +
                            '<div class="d-flex">' +
                            '<div class="pricing">' +
                            '<p class="price"><span class="mr-2 price-dc">' + dollarUSLocale.format(ob.gia) + ' VNĐ</span><span class="price-sale">' + dollarUSLocale.format(discount) + ' VNĐ</span></p>' +
                            ' </div>' +
                            '</div>' +
                            '<div class="bottom-area d-flex px-3">' +
                            '<div class="m-auto d-flex">' +
                            ' <a href="detailproduct.html?mamh=' + ob.mamh + '&manhom=' + ob.manhom + '" class="add-to-cart d-flex justify-content-center align-items-center text-center">' +
                            ' <span><i class="ion-ios-eye"></i></span>' +
                            '</a>' +
                            '<a href="#'+item+'" data-vt=' + item + ' class="buy-now d-flex justify-content-center align-items-center mx-1 addcart">' +
                            '<span><i class="ion-ios-cart"></i></span>' +
                            ' </a>' +
                            '<a href="#" class="heart d-flex justify-content-center align-items-center ">' +
                            '<span><i class="ion-ios-heart"></i></span>' +
                            '</a>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                    }

                    $(".addListProduct").html(htmls);
                    buildSlidePage($(".pagenumberproduct"), 5, res.page, res.totalpage);
                }
            } else if (xhr.status == 404) {
                alert("Lỗi tập tin không còn");
            } else {
                alert("Lỗi server");
            }
        }
    });
}
//Show Mat Hang theo ma nhom , manhom="" thì show tất cả
showProductSearch = (ma, search,page,record) => {
    var datasend = {
        manhom: ma,
        search: search,
        page:page,
        record:record
    }
    $(".addListProduct").html('<img src="images/loading.gif" width=50 height=50 />');
    $.ajax({
        url: "back_end/api_getalllmathangbymanhomandsearch.php",
        data: datasend,
        method: "POST",
        dataType: 'json',
        success: function (res, status, xhr) {
            if (xhr.status == 200) { //200ok, 404:file not found, 500: error server
                console.log(res);
                var htmls = '';
                var mang_items = res.items;

                if (mang_items.length == 0) {
                    $(".addListProduct").html("Không tìm thấy mặt hàng");
                    $(".pagenumberproduct").html("");
                } else {
                    for (var item in mang_items) {
                        var ob = mang_items[item];
                        console.log(ob);
                        var htmloverplayphantram = '';
                        var discount = ob.gia - (ob.giamgia * ob.gia) / 100;
                        var dollarUSLocale = Intl.NumberFormat('en-US');

                        if (ob.giamgia == 0) {

                            htmloverplayphantram = '';
                        } else {
                            var phantram = ob.giamgia + "%";
                            htmloverplayphantram = '<span class="status">Giảm&nbsp;' + phantram + '</span>' +
                                '<div class="overlay"></div>';
                        }
                        htmls = htmls + '<div class="col-md-6 col-lg-3">' +
                            '<div class="product">' +
                            '<a href="detailproduct.html?mamh=' + ob.mamh + '&manhom=' + ob.manhom + '" class="img-prod"><img class="img-fluid" src="images/' + ob.hinh + '" alt="Colorlib Template">' +
                            htmloverplayphantram +
                            '</a>' +
                            '<div class="text py-3 pb-4 px-3 text-center">' +
                            '<h3><a href="#">' + ob.tenmh + '</a></h3>' +
                            '<div class="d-flex">' +
                            '<div class="pricing">' +
                            '<p class="price"><span class="mr-2 price-dc">' + dollarUSLocale.format(ob.gia) + ' VNĐ</span><span class="price-sale">' + dollarUSLocale.format(discount) + ' VNĐ</span></p>' +
                            ' </div>' +
                            '</div>' +
                            '<div class="bottom-area d-flex px-3">' +
                            '<div class="m-auto d-flex">' +
                            ' <a href="detailproduct.html?mamh=' + ob.mamh + '&manhom=' + ob.manhom + '" class="add-to-cart d-flex justify-content-center align-items-center text-center">' +
                            ' <span><i class="ion-ios-eye"></i></span>' +
                            '</a>' +
                            '<a href="#" class="buy-now d-flex justify-content-center align-items-center mx-1">' +
                            '<span><i class="ion-ios-cart"></i></span>' +
                            ' </a>' +
                            '<a href="#" class="heart d-flex justify-content-center align-items-center ">' +
                            '<span><i class="ion-ios-heart"></i></span>' +
                            '</a>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                    }

                    $(".addListProduct").html(htmls);
                    buildSlidePage($(".pagenumberproduct"), 5, res.page, res.totalpage);
                }

            } else if (xhr.status == 404) {
                alert("Lỗi tập tin không còn");
            } else {
                alert("Lỗi server");
            }
        }
    });

}
showProductPrice = (ma, price, sign,page,record) => {
    var datasend = {
        manhom: ma,
        price: price,
        sign: sign,
        page:page,
        record:record
    }
    $(".addListProduct").html('<img src="images/loading.gif" width=50 height=50 />');
    $.ajax({
        url: "back_end/api_getalllmathangbymanhomandgia.php",
        data: datasend,
        method: "POST",
        dataType: 'json',
        success: function (res, status, xhr) {
            if (xhr.status == 200) { //200ok, 404:file not found, 500: error server

                var htmls = '';
                var mang_items = res.items;
                if (mang_items.length == 0) {
                    $(".addListProduct").html("Không tìm thấy mặt hàng");
                    $(".pagenumberproduct").html("");
                } else {
                    for (var item in mang_items) {
                        var ob = mang_items[item];

                        var htmloverplayphantram = '';
                        var discount = ob.gia - (ob.giamgia * ob.gia) / 100;
                        var dollarUSLocale = Intl.NumberFormat('en-US');

                        if (ob.giamgia == 0) {

                            htmloverplayphantram = '';
                        } else {
                            var phantram = ob.giamgia + "%";
                            htmloverplayphantram = '<span class="status">Giảm&nbsp;' + phantram + '</span>' +
                                '<div class="overlay"></div>';
                        }
                        htmls = htmls + '<div class="col-md-6 col-lg-3">' +
                            '<div class="product">' +
                            '<a href="detailproduct.html?mamh=' + ob.mamh + '&manhom=' + ob.manhom + '" class="img-prod"><img class="img-fluid" src="images/' + ob.hinh + '" alt="Colorlib Template">' +
                            htmloverplayphantram +
                            '</a>' +
                            '<div class="text py-3 pb-4 px-3 text-center">' +
                            '<h3><a href="#">' + ob.tenmh + '</a></h3>' +
                            '<div class="d-flex">' +
                            '<div class="pricing">' +
                            '<p class="price"><span class="mr-2 price-dc">' + dollarUSLocale.format(ob.gia) + ' VNĐ</span><span class="price-sale">' + dollarUSLocale.format(discount) + ' VNĐ</span></p>' +
                            ' </div>' +
                            '</div>' +
                            '<div class="bottom-area d-flex px-3">' +
                            '<div class="m-auto d-flex">' +
                            ' <a href="detailproduct.html?mamh=' + ob.mamh + '&manhom=' + ob.manhom + '" class="add-to-cart d-flex justify-content-center align-items-center text-center">' +
                            ' <span><i class="ion-ios-eye"></i></span>' +
                            '</a>' +
                            '<a href="#" class="buy-now d-flex justify-content-center align-items-center mx-1">' +
                            '<span><i class="ion-ios-cart"></i></span>' +
                            ' </a>' +
                            '<a href="#" class="heart d-flex justify-content-center align-items-center ">' +
                            '<span><i class="ion-ios-heart"></i></span>' +
                            '</a>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                    }

                    $(".addListProduct").html(htmls);
                    buildSlidePage($(".pagenumberproduct"), 5, res.page, res.totalpage);
                }
            } else if (xhr.status == 404) {
                alert("Lỗi tập tin không còn");
            } else {
                alert("Lỗi server");
            }
        }
    });
}