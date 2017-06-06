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
//鼠标移到App下载时显示二维码的图片
$(".appLoad").hover(
	function(){
		$(".hide-appLoad").show();
	},
	function(){
		$(".hide-appLoad").hide();
	}
)
//鼠标移到导航栏上时显示二级标题栏
$(".nav-item").hover(
	function(){
		$(this).find(".nav-s").addClass("active")
		$(this).find(".nav-detail").show();
	},
	function(){
		$(this).find(".nav-s").removeClass("active")
		$(this).find(".nav-detail").hide();
	}
)

//吸顶的代码
var navHeight = $("#nav").offset().top;
$(window).scroll(function(){
	if($(window).scrollTop()>navHeight){
		$("#nav-tab").addClass("nav-fixed");
	}else{
		$("#nav-tab").removeClass("nav-fixed");
	}
})


if($.cookie("userInfo")){
	 var userInfos = JSON.parse($.cookie("userInfo"));
     $(".tab-login,.login2").addClass("loginName");
     $(".tab-del,.regist2").addClass("del")
     $(".loginName").html(userInfos.userName);
     $(".del").html("退出")
     $(".loginName").attr("href","javascript:;");
     $(".del").attr("href","javascript:;");
     $(".del").click(function(){
			    delete userInfos;
			    $.cookie("userInfo",JSON.stringify(userInfos),{expires:-1,path:"/"})
			    location.href = "index.html"
	  })
}else{
   $(".tab-login,.login2").removeClass("loginName");
   $(".tab-del,.regist2").removeClass("del")
}

