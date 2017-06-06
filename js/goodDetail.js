
//放大镜效果
function preview(img){
	$("#preview .jqzoom img").attr("src",$(img).attr("src"));
	$("#preview .jqzoom img").attr("jqimg",$(img).attr("bimg"));
}
//图片放大镜效果
$(function(){
	$(".jqzoom").jqueryzoom({xzoom:400,yzoom:400});
});

//大家都在看的点击效果
function watch(){
	var index = 0;
	var liWidth = $(".seeContent").find("li").outerWidth();
	$(".leftbtn").mouseover(function(){
		if(index == 1){
			$(".leftbtn").css({"background-position":"0 0","cursor":"pointer"})
			$(".leftbtn").click(function(){
				index = 0;
				$(".leftbtn").css({"background-position":"0 -40px","cursor":"auto"})
				$(".seeContent").find("ul").stop().animate({"left":0},500)
				return index;
			})
		}	
	}).mouseout(function(){
		$(".leftbtn").css("background-position","0 -40px")
	})
	$(".rightbtn").mouseover(function(){
		if(index == 0){
			$(".rightbtn").css({"background-position":"0 0","cursor":"pointer"})
			$(".rightbtn").click(function(){
				index = 1;
				$(".rightbtn").css({"background-position":"0 -40px","cursor":"auto"});
				$(".seeContent").find("ul").stop().animate({"left":-(liWidth+30)*4},500)
				return index;
			})
		}
	}).mouseout(function(){
	    $(".rightbtn").css("background-position","0 -40px")
	})	
}
watch();  //调用上面的函数




//选择商品颜色
$(".color-total").find("li").mouseover(function(){
	$(this).find(".color-title").show();
	$(this).click(function(){
		$(this).addClass("clickactive").siblings().removeClass("clickactive");
	})
}).mouseout(function(){
	$(this).find(".color-title").hide();
})


//增加减少商品量
var goodNum = $(".good-num").val();
$(".goodNumIn").find(".rightBtn").click(function(){
	goodNum++;
	$(".good-num").val(goodNum);
	return goodNum;
})
$(".goodNumIn").find(".leftBtn").click(function(){
	goodNum--;
	if(goodNum == 0){
		goodNum = 1;
	}
	$(".good-num").val(goodNum);
	return goodNum;
})
//用cookie存储添加到购物车的商品的属性
$(".btn2").click(function(){
	var chooseGoodName = $(".goodName").find("h4").html();
	var chooseGoodColor = $(".clickactive").find(".color-title").html();
	var chooseGoodSrc = $(".clickactive").find("img").attr("src");
	var chooseGoodNum = $(".goodNumIn").find(".good-num").val();
	var chooseGoodPrice = $(".shouJia").find(".jiaGe").text();
	var chooseGoodId = $(".clickactive").find("img").attr("id");
	console.log(chooseGoodId);
//	$.cookie("goodsInfo",JSON.stringify(goodsTmp),{expires:7,path:"/"})
	$(".cart-click").find("img").attr("src",chooseGoodSrc);
	if($("#nav-tab").hasClass("nav-fixed")){//当出现吸顶时加入购物车的动态效果
		$(".nav-fixed").find(".cart-click").stop().slideDown(500);
		var timer = setTimeout(function(){
		$(".nav-fixed").find(".cart-click").stop().slideUp(500);
		},1000);
		
	}else{//没出现吸顶时加入购物车的动态效果
		$(".cart").find(".cart-click").stop().slideDown(500);
		var timer = setTimeout(function(){
		$(".cart").find(".cart-click").stop().slideUp(500);
		},1000);
	}
	var cartNum = parseInt($(".cart-n").html());
	cartNum +=  parseInt(chooseGoodNum);
	$(".cart-n").html(cartNum);
	
	
	var goods = $.cookie("goodsInfo")?JSON.parse($.cookie("goodsInfo")):{};//判断购物车中是否有商品
	if(chooseGoodId in goods){
		var Inum = parseInt(goods[chooseGoodId].num)
		goods[chooseGoodId].num = Inum +parseInt(chooseGoodNum);
	}else{
		goods[chooseGoodId] = {
			"id":chooseGoodId,
			"name":chooseGoodName,
			"color":chooseGoodColor,
			"src" :chooseGoodSrc,
			"num":chooseGoodNum,
			"price":chooseGoodPrice
		}
	}
	$.cookie("goodsInfo",JSON.stringify(goods),{expires:7,path:"/"})
	console.log(JSON.parse($.cookie("goodsInfo")));
//	console.log(JSON.parse($.cookie("goodsInfo").num);
	/*goodsTmp.chooseGoodNum = cartNum;
	$.cookie("goodsInfo",JSON.stringify(goodsTmp),{expires:7,path:"/"})
	var tt  = JSON.parse($.cookie("goodsInfo"));
	console.log(tt);*/
});


var carts = JSON.parse($.cookie("goodsInfo"));
var cartsNum = 0;
for(i in carts){
	cartsNum += parseInt(carts[i].num)
}
//console.log(cartsNum);
console.log(cartsNum);
$(".cart-n").html(cartsNum);
