$(function(){

/*左侧*/
//$(".zong>li").each(function(index,val){
//	//console.log(val)
//	val.onclick =function(event){
//	if($(".none").css("display") == "none"){
//		$(".none").css({"display":"block"});
//		$(this).css("background","#575757 url(../images/menu1_1.png) 9px 0 no-repeat")
//	} else {
//		$(".none").css("display","none")
//		$(this).css("background","#575757 url(../images/menu_1.png) 9px 0 no-repeat")
//	}	
//	event.stopPropagation();
//}
//	
//})

$("#click2").click(function(){
	if($(".none").css("display") == "none"){
		$(".none").css({"display":"block"});
		$(this).css("background","#575757 url(../images/menu1_1.png) 9px 0 no-repeat")
	} else {
		$(".none").css("display","none")
		$(this).css("background","#575757 url(../images/menu_1.png) 9px 0 no-repeat")
	}	
})

//$(".click1").click(function(event){
//	$(this).toggleClass("click2")
//	$(this).toggleClass("click")
//	$(this).find("ul").toggleClass("none")
//	$(this).find("ul").toggleClass("none2")
//	event.stopPropagation();
//})
/************************ajax异步请求页面******************/
myajax = function(orgin){
	var str = orgin;
	$(".list_r").children().remove();
		$.ajax({
			url: "/"+str,
			type: "get",			
			success: function(res) {
				//console.log(res);
			$(".list_r").html(res);
			}
		})
}
/*******************复制当前商品***************/
clone = function(obj){	
	var goods_name = $(obj).parents().children(".first-cell").text();
	var price = $(obj).parents().children(".price").text();
	var goods_number = $(obj).parents().children(".goods_number").text();
	console.log(goods_name,price)
	$.ajax({
				url: "/api/goods_clone",
				type: "POST",
				data:{
					goods_name : goods_name,
					price : price,
				goods_number :goods_number,
				  flag        :       'ad'
				},
				success: function(res) {
			//console.log($(obj).parent().parent().clone());
$(obj).parent().parent().clone().appendTo($(obj).parent().parent().parent());
					//console.log(res);
					$.ajax({
							url: "/list_page1",
							type: "get",			
							success: function(res) {
								//console.log(res);
							$(".list_r").html(res);
							}
						})
				alert(res.message);	
				//console.log(res.message)
				}
			})
}
/**********************************************************/
})