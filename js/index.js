/*function loadHtml(url, targetId) {
	$.ajax({
			url: url,
			dataType: "html",
			async: false,
			success: function(msg) {
				$("#"+targetId).html(msg);
		}
	})
}*/
//右边移动到回到顶部样式发生改变并且点击时回到顶部

$(window).scroll(function(){
	if($(window).scrollTop()>= $("#main .main-m").offset().top){
		$("#return-top").show();
	}else{
		$("#return-top").hide();
	}
})

$(".fixed-b").mouseover(
	function(){
		$(this).css("background-color","#ab2b2b")
	}
).click(
	function(){
		$("body,html").animate({scrollTop:0},1000);
	}
)
$(".fixed-b").mouseout(
	function(){
		$(this).css("background-color","#cccccc")
	}
)
//鼠标移到右边App下载时显示二维码
$("#fixed-right .appLoad2").hover(
	function(){
		$("#fixed-right .hide-appLoad2").show();
	},
	function(){
		$("#fixed-right .hide-appLoad2").hide();
	}
)
//幻灯片淡入淡出自动播放
$(".ck-slide").mouseover(function(){
	$(".small-image").show();
});
$(".ck-slide").mouseout(function(){
	$(".small-image").hide();
});

var index = 0;
var timer;
$(".small-image-b li").mouseover(
	function(){
		$(this).find(".bg").hide();
		$(".ck-slide-wrapper li").eq($(this).index()).stop().fadeIn();
		index = $(this).index() - 1;
		clearInterval(timer);
	}
)
$(".small-image-b li").mouseout(
	function(){
		$(this).find(".bg").show();
		$(".ck-slide-wrapper li").eq($(this).index()).siblings().stop().fadeOut();
	}
)
autoPlay();
function autoPlay(){
	var timer = setInterval(function(){
		index++;
		if(index == 5){
			index=0;
		}
		$(".ck-slide-wrapper li").eq(index).stop().fadeIn();
		$(".ck-slide-wrapper li").eq(index).siblings().stop().fadeOut();
	},4000)
}

//楼梯
var flag = true;
	$("#floor li").click(function(){
	flag = false;
	$(this).find("span").addClass("active").parent().siblings().find("span").removeClass("active");
	var currentTop = $(".content-box").eq($(this).index()).offset().top;
	$("body,html").stop().animate({"scrollTop":currentTop},1000,function(){
		flag = true;
	});
})

$(window).scroll(function(){
	if(flag){
		var _scrollTop = $(window).scrollTop();
		var _topHeight = $("#content").offset().top-$(window).outerHeight();
		var _bottomHeight = $("#content").offset().top+$("#content").outerHeight(); 
		$("#content .content-box").each(function(){
		  	if(_scrollTop < _topHeight){
		  		$("#floor").stop().hide();
		  	}
		  	if(_scrollTop > _topHeight){
		  		$("#floor").stop().show();
		  		$("#floor li").eq(0).find("span").addClass("active");
		  	}
		  	//当第二个样式生效时消除第一个的样式
		  	if(_scrollTop > _topHeight + $(".content-box").outerHeight()*(3/2)-200){
		  	   $("#floor li").eq(0).find("span").removeClass("active");
		  	}
		  	if(_scrollTop >= $(this).offset().top-$(this).outerHeight()/2){
		  		$("#floor li").eq($(this).index()).find("span").addClass("active").parent().siblings().find("span").removeClass("active");
		  	}
		  	if(_scrollTop > _bottomHeight - $(window).outerHeight()){
		  		$("#floor").stop().hide();
		  	}
		})
	}	
})


//大家都在说的轮播图效果

var lif = $("#say li").eq(0).clone();
var lis = $("#say li").eq(1).clone();
var lit = $("#say li").eq(2).clone();
var lil = $("#say li").eq(3).clone();
$(lif).appendTo("#say ul");
$(lis).appendTo("#say ul");
$(lit).appendTo("#say ul");
$(lil).appendTo("#say ul");
var liWidth = $("#say li").outerWidth();
var num = 0;
var termd;
/*var flag = 0;//开关*/
function secondAutoPlay(){
//	    flag = true;
		termd = setInterval(function(){
		num++;
		if(num == 21){
			$("#say ul").eq(0).css("left","0");
			num = 1;	
		}
		$("#say ul").eq(0).stop().animate({"left":-(liWidth+10)*num},1000)
	},2000)
}
secondAutoPlay();
var iIndex = 0;
$(".say-title-gt").click(function(){
	clearInterval(termd);
	iIndex++;
	if(iIndex == 6){
		$("#say ul").eq(0).css("left","0");
		iIndex = 1;
	}
	$("#say ul").eq(0).stop().animate({"left":-(liWidth+10)*4*iIndex},500,function(){
		num = iIndex*4 - 1;
		secondAutoPlay();
	})
})
$(".say-title-lt").click(function(){
	clearInterval(termd);
	iIndex--;
	if(iIndex == -1){
		iIndex=4;
		$("#say ul").eq(0).css("left",-(liWidth+10)*4*(iIndex+1)); 
	}
	/*if(flag){
		$("#say ul").eq(0).stop().animate({"left":-(liWidth+10)*4*(i+1)},500)
	}*/
	$("#say ul").eq(0).stop().animate({"left":-(liWidth+10)*4*iIndex},500,function(){
		num = iiIndex*4 - 1;
		secondAutoPlay();
	})
})



var carts = JSON.parse($.cookie("goodsInfo"));
var cartsNum = 0;
for(i in carts){
	cartsNum += parseInt(carts[i].num)
}
$(".cart-n").html(cartsNum);







