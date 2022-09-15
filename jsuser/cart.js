
var mangcurrent = [];
$(document).ready(function () {
    var cartItems = localStorage.getItem("CartFood111111");
    if (cartItems != null) {
        mangcurrent = JSON.parse(cartItems).items;
        console.log(mangcurrent);
        if (mangcurrent.length > 0) {
            //calCheckout(mangcurrent);
            var html = "";
            for (var item in mangcurrent) {
                var sp = mangcurrent[item];
                var tt=sp.gia*sp.soluong;
                html=html+ '<tr class="text-center">'+
                '<td class="product-remove"><a href="#"><span class="ion-ios-close"></span></a></td>'+
                
                '<td class="image-prod"><div class="img" style="background-image:url(images/product-3.jpg);"></div></td>'+
                
                '<td class="product-name">'+
                    '<h3>'+sp.tenmh+'</h3>'+
                    
                '</td>'+
                
                '<td class="price">'+sp.gia+'</td>'+
                
                '<td class="quantity" colspan=3>'+
                
                '<span class="input-group-btn mr-2">'+
                   '<button type="button" class="quantity-left-minus btn"  data-type="minus" data-field="'+item+'">'+
                  '<i class="ion-ios-remove"></i>'+
                   '</button>'+
                   '</span>&nbsp;'+
                '<input type="text" id="quantity'+item+'" name="quantity" class="form-control input-number" value="1" min="1" max="100" size="3">'+
                '&nbsp;<span class="input-group-btn ml-2">'+
                   '<button type="button" class="quantity-right-plus btn" data-type="plus" data-field="'+item+'">'+
                    '<i class="ion-ios-add"></i>'+
                '</button>'+
                '</span>'+
           
              '</td>'+
                
                '<td class="total">'+tt+'</td>'+
              '</tr>';
            }
            $(".addListProductFromCart").html(html);
        }
    }
    var quantitiy=0;
    $('.addListProductFromCart').on('click','.quantity-right-plus',function(){
		        
     
        // Get the field name
        var item = parseInt($(this).attr("data-field"));
        
        // If is not undefined
        var quantity=$('#quantity'+item).val();
             
            $('#quantity'+item).val(parseInt(quantity) + 1);

          
            // Increment
        
    });
    $('.addListProductFromCart').on('click','.quantity-left-minus',function(){
		
      // Get the field name
      var item = parseInt($(this).attr("data-field"));
        
      // If is not undefined
      var quantity=$('#quantity'+item).val();
        if(quantity>0){
          $('#quantity'+item).val(parseInt(quantity) - 1);

        }
        
    });
});


