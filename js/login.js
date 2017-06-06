
$(".header-t2 a").eq(0).css("display","none");
$(".header-t2 a").eq(1).css("display","none");

//邮件地址自定义下拉
(function($) {
	$.fn.mailAutoComplete = function(options) {
		var defaults = {
			className: "emailist",
			email: 	["163.com","126.com","yeah.com","vip.163.com","vip.126.com","188.com","vip.188.com","qq.com","gmail.com","sina.com"], //邮件数组
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

$(".inputMailList").mailAutoComplete();

$(".sub").click(function(){
	var loginName = $(".login-txt").val();
	var loginPas = $(".psw").val();
	var reg1 = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/  //邮箱的正则表达式
	var reg2 = /^1\d{10}$/   //手机号码的正则表达式

	if($(".login-txt").val() ==  "" && $(".psw").val() == ""){
		$(".prompt").show();
		$(".prompt").find("span").html("请输入用户名和密码");
		$(".login-tw").css("border-color","#ab2b2b");
		$(".login-pw").css("border-color","#ab2b2b");
		$(".login-txt").focus();
		return false;
	}else if($(".login-txt").val() ==  "" ){
		      $(".prompt").show();
		      $(".prompt").find("span").html("请输入用户名");
		      $(".login-tw").css("border-color","#ab2b2b");
		      $(".login-pw").css("border-color","#CCCCCC")
		      $(".login-txt").focus();
		      return false;
	        }else if($(".psw").val() == ""){
	        	  $(".prompt").show();
			      $(".prompt").find("span").html("请输入密码");
			      $(".login-pw").css("border-color","#ab2b2b");
			      $(".login-tw").css("border-color","#CCCCCC");
			      $(".psw").focus();
		          return false;
		       }else if(reg1.test(loginName)||reg2.test(loginName)){
		        	var userName = JSON.parse($.cookie("userInfo")).userName;
		        	var psw = JSON.parse($.cookie("userInfo")).passWord;
		        	if(userName == $(".login-txt").val() && psw == $(".psw").val()){
		        		 alert("登录成功");
		        		 window.open("index.html")
//						 location.href = "index.html"
		        	}else{
		        		$(".prompt").show();
		        		$(".prompt").find("span").html("账号不存在，请注册");
		        		$(".login-tw").css("border-color","#ab2b2b");
			      		$(".login-pw").css("border-color","#CCCCCC")
			      		return false;
		        	}
			        }else{
			        	$(".prompt").show();
			      		$(".prompt").find("span").html("请输入正确的用户名");
			      		$(".login-tw").css("border-color","#ab2b2b");
			      		$(".login-pw").css("border-color","#CCCCCC")
			        	$(".login-txt").focus();
			        	return false;
			        }

})
var carts = JSON.parse($.cookie("goodsInfo"));
var cartsNum = 0;
for(i in carts){
	cartsNum += parseInt(carts[i].num)
}
//console.log(cartsNum);
$(".cart-n").html(cartsNum);