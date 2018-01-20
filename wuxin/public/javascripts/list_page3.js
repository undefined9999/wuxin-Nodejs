$(function(){
/*****将编辑后的商品上传数据库*****************/
upload = function(){
		$.ajax({
			url : "/api/goods_chang",
			type : "post",
			data :{
				goods_name : $("#goods_name").val(),
				price : $("#price").val(),
				goods_number : $("#goods_number").val()
			},
			success : function(res){
				alert(res.message);
				$(".list_r").children().remove();
					$.ajax({
						url: "/list_page1",
						type: "get",			
						success: function(res) {
							//console.log(res);
						$(".list_r").html(res);				
						}
					})
				
			}
		})
}
/********************************************************/
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
/***************************************************/	
})
