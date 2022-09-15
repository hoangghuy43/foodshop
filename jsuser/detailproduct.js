$(document).ready(function () {
    var mamh = getUrlParameter("mamh");
    $(".titleweb").html("Chi tiêt ID:" + mamh);
    showDetailProductByMa(mamh);
    var manhom = getUrlParameter("manhom");   
    showProduct(mamh,manhom,0,record);
    $(".pagenumberproduct").on('click', 'button', function () {
        showProduct(mamh,manhom,$(this).val(),record);
    })
});
function showDetailProductByMa(ma) {
    var datasend = {
        mamh: ma
    }
    $.ajax({
        url: "back_end/getallproductsbymahang.php",
        data: datasend,
        dataType: 'json',
        async: true,
        method: "GET",
        success: function (res, status, xhr) {
           
            var ar = res.items;
            $(".detailTenMH").html(ar[0].tenmh);
            $(".detailGia").html(ar[0].gia + " /" + ar[0].dvt);
            $(".detailHinhSP").attr("src", "images/" + ar[0].hinh);
            $(".detailHinhSPPreview").attr("href", "images/" + ar[0].hinh);
            $(".detailMota").html(ar[0].mota);
        }
    });

}
//Show Mat Hang theo ma nhom , manhom="" thì show tất cả
showProduct = (mamh,manhom,page,record) => {
    var datasend = {
        manhom: manhom,
        mamh:mamh,
        page:page,
        record:record
    }
    $(".addListProduct").html('<img src="images/loading.gif" width=50 height=50 />');
    $.ajax({
        url: "back_end/api_getalllmathangrelativebymanhom.php",
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
                        '<a href="detailproduct.html?mamh=' + ob.mamh + '&manhom=' + ob.manhom + '#rangedetailproduct" class="img-prod"><img class="img-fluid" src="images/' + ob.hinh + '" alt="Colorlib Template">' +
                        htmloverplayphantram +
                        '</a>' +
                        '<div class="text py-3 pb-4 px-3 text-center">' +
                        '<h3><a href="#">' + ob.tenmh + '</a></h3>' +
                        '<div class="d-flex">' +
                        '<div class="pricing">' +
                        '<p class="price"><span class="mr-2 price-dc">' +  dollarUSLocale.format(ob.gia)+ ' VNĐ</span><span class="price-sale">' +dollarUSLocale.format(discount)  + ' VNĐ</span></p>' +
                        ' </div>' +
                        '</div>' +
                        '<div class="bottom-area d-flex px-3">' +
                        '<div class="m-auto d-flex">' +
                        ' <a href="detailproduct.html?mamh=' + ob.mamh + '&manhom=' + ob.manhom + '#rangedetailproduct" class="add-to-cart d-flex justify-content-center align-items-center text-center">' +
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