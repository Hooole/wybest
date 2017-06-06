//邮件地址自定义下拉
(function($) {
	$.fn.mailAutoComplete = function(options) {
		var defaults = {
			className: "emailist",
			email: 	["163.com","126.com","yeah.com","188.com","vip.163.com","vip.126.com"], //邮件数组
			zIndex: 3	
		};
		// 最终参数
		var params = $.extend({}, defaults, options || {});
		
		// 是否现代浏览器
		var isModern = typeof window.screenX === "number", visibility = "visibility";
		// 键值与关键字
		var key = {
			"up": 38,
			"down": 40,
			"enter": 13,
			"esc": 27,
			"tab": 9	
		};
		// 组装HTML的方法
		var fnEmailList = function(input) {
			var htmlEmailList = '', arrValue = input.value.split("@"), arrEmailNew = [];
			$.each(params.email, function(index, email) {
				if (arrValue.length !== 2 || arrValue[1] === "" || email.indexOf(arrValue[1].toLowerCase()) === 0) {			
					arrEmailNew.push(email);						
				}
			});	
			$.each(arrEmailNew, function(index, email) {
				htmlEmailList = htmlEmailList + '<li'+ (input.indexSelected===index? ' class="on"':'') +'>'+ arrValue[0] + "@" + email +'</li>';	
			});		
			return htmlEmailList;			
		};
		// 显示还是隐藏
		var fnEmailVisible = function(ul, isIndexChange) {
			var value = $.trim(this.value), htmlList = '';
			if (value === "" || (htmlList = fnEmailList(this)) === "") {
				ul.css(visibility, "hidden");	
			} else {
				isIndexChange && (this.indexSelected = -1);
				ul.css(visibility, "visible").html(htmlList);
			}
		};
		
		return $(this).each(function() {
			this.indexSelected = -1;
			// 列表容器创建
			var element = this;
			var eleUl = $('<ul></ul>').css({
				position: "absolute",
				marginTop: element.offsetHeight,
				minWidth: element.offsetWidth - 2,
				visibility: "hidden",
				zIndex: params.zIndex
			}).addClass(params.className).bind("click", function(e) {
				var target = e && e.target;
				if (target && target.tagName.toLowerCase() === "li") {
					$(element).val(target.innerHTML).trigger("input");
					$(this).css(visibility, "hidden");
					element.focus(); // add on 2013-11-20
				}				
			});			
			$(this).before(eleUl);
			// IE6的宽度
			if (!window.XMLHttpRequest) { eleUl.width(element.offsetWidth - 2); }	
			
			// 不同浏览器的不同事件
			isModern? $(this).bind("input", function() {
				fnEmailVisible.call(this, eleUl, true);
			}): element.attachEvent("onpropertychange", function(e) {				
				if (e.propertyName !== "value") return;
				fnEmailVisible.call(element, eleUl, true);		
			});
			
			$(document).bind({
				"click": function(e) {
					var target = e && e.target, htmlList = '';
					if (target == element && element.value && (htmlList = fnEmailList(element, params.email))) {
						eleUl.css(visibility, "visible").html(htmlList);	
					} else if (target != eleUl.get(0) && target.parentNode != eleUl.get(0)) {
						eleUl.css(visibility, "hidden");
					}
				},
				"keydown": function(e) {
					var eleLi = eleUl.find("li");
					if (eleUl.css(visibility) === "visible") {
						switch (e.keyCode) {
							case key.up: {
								element.indexSelected--;
								if (element.indexSelected < 0) {
									element.indexSelected = 0;	
								}
								e.preventDefault && e.preventDefault();
								break;
							}
							case key.down: {
								element.indexSelected++;
								if (element.indexSelected >= eleLi.length) {
									element.indexSelected = eleLi.length-1;	
								}
								e.preventDefault && e.preventDefault();
								break;
							}
							case key.enter: {		
								e.preventDefault();		
								eleLi.get(element.indexSelected) && $(element).val(eleLi.eq(element.indexSelected).html());
								eleUl.css("visibility", "hidden");
								break;
							}
							case key.tab: case key.esc: {
								eleUl.css("visibility", "hidden");
								break;
							}
						}
						if (element.indexSelected !== -1) {
							eleUl.html(fnEmailList(element));
						}
					}
				}
			});		
		});
	};
})(jQuery);

$("#txt").mailAutoComplete();

$("#txt").blur(function(){
	var reg1 = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/  //邮箱的正则表达式
	var reg2 = /^1\d{10}$/   //手机号码的正则表达式
    var registName = $("#txt").val();
    if(registName == ""){
    	$(".regist-txt > .prompt-suc").hide();
    	$(".regist-txt > .prompt-err").show();
    	$(".regist-txt > .prompt-err").find("span").html("请输入网易邮箱，手机号，或者其他邮箱")
    	$("#txt").css("border-color","#ef3939");
    }else if(reg1.test(registName)||reg2.test(registName)){
    	$.ajax({
    		type:"get",
    		url:"../json/regist.json",
    		async:false,
    		data:{uesrName:"userName"},
    		success:function(msg){
    			var userNames = msg.userName;
    			for(var i = 0;i< userNames.length;i++){
    				if(userNames[i] == $("#txt").val()){
    					$(".regist-txt > .prompt-suc").hide();
						$(".regist-txt > .prompt-err").show();
						$(".regist-txt > .prompt-err").find("span").html("用户名已存在")
						return false;
    				}else{
    					$(".regist-txt > .prompt-err").hide();
    					$(".regist-txt > .prompt-suc").show();
						$("#txt").css("border-color","#ddd");
    				}
    			}
    		}
    	})
    }else{
    	$(".regist-txt > .prompt-suc").hide();
    	$(".regist-txt > .prompt-err").show();
    	$(".regist-txt > .prompt-err").find("span").html("请输入正确的账号")
    	$("#txt").css("border-color","#ef3939");
    }
})
$("#psw").blur(function(){
	var reg3 = /[\da-zA-Z]{6,16}/  //6-16个字符正则表达式
    registPsw = $("#psw").val();
	if(registPsw == ""){
		$(".regist-psw > .prompt-suc").hide()
		$(".regist-psw > .prompt-err").show();
		$(".regist-psw > .prompt-err").find("span").html("请输入密码");
		$("#psw").css("border-color","#ef3939");
	}else if(reg3.test(registPsw)){
		$(".regist-psw > .prompt-err").hide();
    	$(".regist-psw > .prompt-suc").show();
    	$("#psw").css("border-color","#ddd");
	}else{
		$(".regist-psw > .prompt-suc").hide()
		$(".regist-psw > .prompt-err").show();
		$(".regist-psw > .prompt-err").find("span").html("请输入正确的密码格式");
		$("#psw").css("border-color","#ef3939");
	}
})

$("#psw-again").blur(function(){
	var registPswAgain = $("#psw-again").val();
	var currentregistPsw = $("#psw").val();
	if(registPswAgain == ""){
		$(".regist-pswa >　.prompt-suc").hide();
		$(".regist-pswa > .prompt-err").show();
		$(".regist-pswa > .prompt-err").find("span").html("请输入确认密码");
		$("#psw-again").css("border-color","#ef3939");
	}else if(registPswAgain != currentregistPsw){
		$(".regist-pswa >　.prompt-suc").hide();
		$(".regist-pswa > .prompt-err").show();
		$(".regist-pswa > .prompt-err").find("span").html("两次输入密码不一致");
		$("#psw-again").css("border-color","#ef3939");
	}else{
		$(".regist-pswa > .prompt-err").hide();
		$(".regist-pswa > .prompt-suc").show();
		$("#psw-again").css("border-color","#ddd");
	}
})

$("#phone").blur(function(){
	var registPhone = $("#phone").val();
	var reg4 = /^1\d{10}$/   //手机号码的正则
	if(registPhone == ""){
		$(".regist-phone >　.prompt-suc").hide();
		$(".regist-phone > .prompt-err").show();
		$(".regist-phone > .prompt-err").find("span").html("请输入手机号码");
		$("#phone").css("border-color","#ef3939");
	}else if(reg4.test(registPhone)){
		$(".regist-phone > .prompt-err").hide();
    	$(".regist-phone > .prompt-suc").show();
    	$("#psw").css("border-color","#ddd");
	}else{
		$(".regist-phone > .prompt-suc").hide()
		$(".regist-phone > .prompt-err").show();
		$(".regist-phone > .prompt-err").find("span").html("请输入正确的手机号");
		$("#phone").css("border-color","#ef3939");
	}
})
var jsonTmp = {};
$("#btn").click(function(){
	var  num1 = $($(".prompt-suc").eq(0).css("display")=="block").length;
	var  num2 = $($(".prompt-suc").eq(1).css("display")=="block").length;
	var  num3 = $($(".prompt-suc").eq(2).css("display")=="block").length;
	var  num4 = $($(".prompt-suc").eq(3).css("display")=="block").length;
	var num = num1+num2+num3+num4;
	if(num == 4){
		jsonTmp.userName = $("#txt").val();
		jsonTmp.passWord = $("#psw").val();
		$.cookie("userInfo",JSON.stringify(jsonTmp),{expires:7,path:"/"})
		alert("注册成功")
		window.open("login.html")
	}else{
		return false;
	}
})
