$(document).ready(function () {
    var ma = '';
    showALLGroup();//gọi hàm hiển thị các nhóm
    showProduct("", 0, record);//tất cả
    $(".addSelectionGroup").on("click", ".clickselectionview", function () {
        ma = $(this).attr("data-manhom");
        var vt = $(this).attr("data-vt");
        var len = $(this).attr("data-length");
        console.log(vt);
        //Loại bõ các active trong thẻ <a>
        for (var i = 0; i <= len; i++) {
            $("#select" + i).removeClass("active");
        }
        //add active vao trong thẻ a
        $("#select" + vt).addClass("active");
        showProduct(ma, 0, record);
        //Di chuyển đến vùng id allproduct được đặt trong shop.html
        var target = $('#allproduct');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;


        }
    })
    $(".pagenumber").on('click', 'button', function () {
        showProduct(ma, $(this).val(), record);
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
                console.log(res);
                var mang_items = res.items;
                var s = '';
                var htmls = '<li ><a href="#" class="clickselectionview active" data-vt="0" data-length=' + mang_items.length + ' id="select0"  data-manhom="">Tất cả</a></li>';

                console.log(mang_items);
                for (var item in mang_items) {
                    var ob = mang_items[item];

                    htmls = htmls + '<li><a href="#" class="clickselectionview" data-length=' + mang_items.length + ' data-manhom="' + ob.manhom + '" data-vt="' + (parseInt(item) + 1) + '" id="select' + (parseInt(item) + 1) + '">' + ob.tennhom + '</a></li>';
                }
                $(".addSelectionGroup").html(htmls);
            } else if (xhr.status == 404) {
                alert("Lỗi tập tin không còn");
            } else {
                alert("Lỗi server");
            }
        }
    });
}

//Show Mat Hang theo ma nhom , manhom="" thì show tất cả
showProduct = (ma, page, record) => {
    var datasend = {
        manhom: ma,
        page: page,
        record: record
    }
    $.ajax({
        url: "back_end/api_getalllmathangbymanhompage.php",
        data: datasend,
        method: "POST",
        dataType: 'json',
        success: function (res, status, xhr) {
            if (xhr.status == 200) { //200ok, 404:file not found, 500: error server
                console.log(res);
                var htmls = '';
                var mang_items = res.items;
                console.log(mang_items);
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
                buildSlidePage($(".pagenumber"), 5, res.page, res.totalpage);
            } else if (xhr.status == 404) {
                alert("Lỗi tập tin không còn");
            } else {
                alert("Lỗi server");
            }
        }
    });
}