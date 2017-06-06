var goods = JSON.parse($.cookie("goodsInfo"));
var html = "";
var cartsNum = 0;
var goodsPriceTotal= 0;
for(i in goods){
	 cartsNum += parseInt(goods[i].num)   //当前页面中购物车中的商品量
	 var currentgoodsPrice = (goods[i].price)*goods[i].num;
	 goodsPriceTotal += currentgoodsPrice; //当前页面的商品的总价
	 html +=        "<div>"
	        		+"<input type=\"hidden\" value='"+goods[i].id+"' class=\"delId\">"
	        		+"<div class=\"w cart-w1\">"
						+"<input type=\"checkbox\" />"
					+"</div>"
					+"<div class=\"w cart-w2\">"
					+	"<a href=\"#\" class=\"aImg left\">"
					+		"<img src="+goods[i].src+"/>"
					+	"</a>"
					+	"<a href=\"#\" class=\"left aName\">"+goods[i].name+"</a>"
					+"</div>"
					+"<div class=\"w cart-w3\">"
						+goods[i].color
					+"</div>"
					+"<div class=\"w cart-w4\">"
					+	"<div class=\"goodNumIn\">"
					+		"<span class=\"left leftBtn\">"
					+			"<i class=\"ch\"></i>"
					+		"</span>"
					+		"<input type=\"text\" value="+goods[i].num+"  class=\"left good-num\"/>"
					+		"<span class=\"left rightBtn\">"
					+			"<i class=\"ch\"></i>"
					+			"<i class=\"xh\"></i>"
					+		"</span>"
					+	"</div>"
					+"</div>"
					+"<div class=\"w cart-w5\">"
						+"￥"+"<span class=\"eachsale\">"+goods[i].price+"</span>"
					+"</div>"
					+"<div class=\"w cart-w6\">"
						+"￥"+"<span class=\"eachsaleTotal\">"+currentgoodsPrice+"</span>"+".00"
					+"</div>"
					+"<div class=\"w cart-w7\">"
					+	"<a href=\"javascript:void(0)\" class=\"aDel\">删除</a>"
					+"</div>"
					+"</div>"

}
$(".cart-n").html(cartsNum);   
$(html).appendTo($(".cartList"))
$(".sale-total").find(".priceTotal-n").html(goodsPriceTotal); //存入cookie的总商品价格

$(".cartList .leftBtn").click(function(e){  //鼠标点击时减少商品的量
 	var delId = $(this).parent().parent().parent().find(".delId").val();
	var that = e.target;
	var nowIndex = -1;
	$(".cartList .leftBtn").filter(function(index){
		if(this == that){
			nowIndex = 	index;
		}
	});
	var currentPrice = $(this).parent().parent().next(".cart-w5").children(".eachsale").text();
	var currentNum = $(this).parent().find(".good-num").val();
	if(currentNum == 1){
		currentNum = 1;
	}else{
		currentNum--;
		cartsNum --;
		goods[delId].num--;
		$.cookie("goodsInfo",JSON.stringify(goods),{expires:7,path:"/"})//减少时更新cookie
		goodsPriceTotal -=  currentPrice;
	}
	var currentgoodsPrice = currentPrice*currentNum;  //当前商品的总价格
	$(this).parent().find(".good-num").val(currentNum);//当前的商品数量
	$(".cart-n").html(cartsNum);   //当前购物栏中商品的数量
	$(this).parent().parent().nextAll(".cart-w6").children(".eachsaleTotal").text(currentgoodsPrice);//当前商品的总价格
	$(".sale-total").find(".priceTotal-n").html(goodsPriceTotal);//所有商品的总价格
});

$(".cartList .rightBtn").click(function(){ //鼠标点击时增加 商品的量
	var currentNum = $(this).parent().find(".good-num").val();
	var delId = $(this).parent().parent().parent().find(".delId").val();
	console.log(delId)
	var currentPrice = $(this).parent().parent().next(".cart-w5").children(".eachsale").text();
	currentNum++;
	cartsNum ++;
	goods[delId].num++;
	$.cookie("goodsInfo",JSON.stringify(goods),{expires:7,path:"/"})//增加时更新cookie
	goodsPriceTotal +=  parseInt(currentPrice);
	var currentgoodsPrice = currentPrice*currentNum;
	$(this).parent().parent().nextAll(".cart-w6").children(".eachsaleTotal").text(currentgoodsPrice);
	$(this).parent().find(".good-num").val(currentNum);
	$(".cart-n").html(cartsNum); 
	$(".sale-total").find(".priceTotal-n").html(goodsPriceTotal);
})



		var clickindex = 0;
		var num = 0;
		$(".aDel").click(function(){//删除商品
			var delId = $(this).parent().parent().find(".delId").val();
			delete goods[delId];
			$(this).parent().parent().remove()
			$.cookie("goodsInfo",JSON.stringify(goods),{expires:7,path:"/"})
			});

$(".cart-t2").click(function(){
	location.href = "pay.html"
})
