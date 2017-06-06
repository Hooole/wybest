
var html = "";
$.get("../json/goodList.json",function(msg){
	var goods = msg;
	for(var i in goods){
		 html += "<li>"
					 +	"<a href=\"goodDetail.html\">"
				     +	"<img src="+goods[i].img+"/>"
					 +  "</a>"
					 +	"<a href=\"\" class=\"name\">"+goods[i].name+"</a>"
					 +	"<div class=\"price\">"+goods[i].price+"</div>"
					 +	"<hr class=\"line\">"
					 +	"<p>"+goods[i].introduce+"</p>"
					 + "</li>" 
	}
	$(html).appendTo($(".pic1"));
})
var carts = JSON.parse($.cookie("goodsInfo"));
var cartsNum = 0;
for(i in carts){
	cartsNum += parseInt(carts[i].num)
}
//console.log(cartsNum);
$(".cart-n").html(cartsNum);

