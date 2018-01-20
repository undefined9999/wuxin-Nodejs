$(function(){
	

	
	//  点击 添加新商品   通用信息页显示
	$(".click_2").click(function(){
		$(".dian_1").css({"background":"#fff","color":"#000"}).siblings().css({"background":"#efefef","color":"#787878"});
		$('.rig_main').css("display","block");
		$(".rig_form").css("display","block");
		$(".xiang").css("display","none");
		$(".qita").css("display","none");
		$(".shuxing").css("display","none");
		$(".xiangce").css("display","none");
	})
	
	//  点击 通用信息 其他页面隐藏
	$(".dian_1").click(function(){
		$(this).css({"background":"#fff","color":"#000"}).siblings().css({"background":"#efefef","color":"#787878"});
		$(".rig_form").css("display","block");
		$(".qita").css("display","none");
		$(".shuxing").css("display","none");
		$(".xiangce").css("display","none");
		$(".xiang").css("display","none");
	})
	
	//  点击 详细描述   其他页面隐藏
	$(".dian_2").click(function(){
		$(this).css({"background":"#fff","color":"#000"}).siblings().css({"background":"#efefef","color":"#787878"});
		$(".xiang").css("display","block");
		$(".qita").css("display","none");
		$(".shuxing").css("display","none");
		$(".xiangce").css("display","none");
		$(".rig_form").css("display","none");
	})
	
	//  点击其他信息   其他页面隐藏
	$(".dian_3").click(function(){
		$(this).css({"background":"#fff","color":"#000"}).siblings().css({"background":"#efefef","color":"#787878"});
		$(".qita").css("display","block");
		$(".xiang").css("display","none");
		$(".shuxing").css("display","none");
		$(".xiangce").css("display","none");
		$(".rig_form").css("display","none");
	})
	
	//  点击商品属性   其他页面隐藏
	$(".dian_4").click(function(){
		$(this).css({"background":"#fff","color":"#000"}).siblings().css({"background":"#efefef","color":"#787878"});
		$(".shuxing").css("display","block");
		$(".xiang").css("display","none");
		$(".qita").css("display","none");
		$(".xiangce").css("display","none");
		$(".rig_form").css("display","none");
	})
	
	//  点击商品属性   其他页面隐藏
	$(".dian_5").click(function(){
		$(this).css({"background":"#fff","color":"#000"}).siblings().css({"background":"#efefef","color":"#787878"});
		$(".xiangce").css("display","block");
		$(".xiang").css("display","none");
		$(".qita").css("display","none");
		$(".shuxing").css("display","none");
		$(".rig_form").css("display","none");
	})
	
	
	//  点击a标签 显示隐藏
	$(".tr_3 .td_threer>a").click(function(){
		$(".tr_3 .td_threer div").css("visibility","visible");
	})
	$(".a_dian1").click(function(){
		$(".tr_3 .td_threer div").css("visibility","hidden");
	})
	
	$(".tr_5 .td_threer>a").click(function(){
		$(".tr_5 .td_threer div").css("visibility","visible");
	})
	$(".dian_a2").click(function(){
		$(".tr_5 .td_threer div").css("visibility","hidden");
	})
	
	$(".click_1").click(function(){
			$.ajax({
				type:"get",
				url:"/list_page2",
				async:true,
				success : function(res){
					console.log(res)
				$(".sec_rig").html(res)
				}
			});
		})
	

})

