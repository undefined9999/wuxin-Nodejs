$(function(){
/***********************************************************/
	var addpage = parseInt($("#pageCurrent").html())
/******请求商品列表*******************************************************/
	chaajax();
/*******************上一页*********************************************/
	changePageUp = function(){	
	$(".shops").remove();
	$("#pageCurrent").html(addpage -= 1);
			chaajax();
	}
/*************************下一页***********************************/
  changePagedown = function (){  	
		$(".shops").remove();
		$("#pageCurrent").html(addpage += 1);
	  chaajax();
}	  
 /*********************获取数据库所有商品********************/
  function chaajax(){ 
  		$.ajax({
			url: "/api/goods_find",
			type: "post",
			data :{
				condition : "ad",
				pageNO : $("#pageCurrent").html(),
	    	perPageCnt : $("#pageSize").val()   
			},
			success: function(res) {
				var resc = res.length;
				var pageNO = res.pageNO;
				var total = res.total;
				var totalPages = (res.total/$("#pageSize").val());  	
				//console.log(res);
				var goods_num = "";
				$.each(res.data, function(index,value) {
					//console.log(index,value)				
				var goods_name = value.goods_name;
				var price = value.price;
				var goods_number = value.goods_number;
				var index = index + 1;
				//console.log(res[i]);
var str = '<tr class="shops"><td><input name="checkboxes" value="" type="checkbox">'+index +'</td><td class="first-cell"><span onclick="change(this)">'+goods_name+'</span></td><td align="center" id="goods_number"><span onclick="change()">'+goods_number+'</span></td><td  align="center" class="price"><span onclick="change(this)" title="点击修改内容" style="">'+price+'</span></td><td align="center"><img src="../images/no.gif"onclick=""></td><td align="center"><img src="../images/yes.gif" onclick=""></td><td align="center"><img src="../images/no.gif" onclick=""></td><td align="center"><img src="../images/yes.gif" onclick=""></td><td align="center"><span onclick=" ">100</span></td><td align="center"><span onclick="">1</span></td><td align="center"><span onclick="#">0</span></td><td align="center"><a href="#"  title="查看"><img src="../images/icon_view.gif" width="21" height="21" border="0"></a><a href="#" title="编辑" onclick="mychange(this)"><img src="../images/icon_edit.gif" width="21" height="21" border="0"></a><a href="javascript:;" title="复制" onclick="clone(this),changNum()"><img src="../images/icon_copy.gif" width="21" height="21" border="0"></a><a href="javascript:;" onclick="remove(this),changNum()" title="回收站"><img src="../images/icon_trash.gif" width="21" height="21" border="0"></a><img src="../images/empty.gif" width="21" height="21" border="0"></td></tr>'
					//console.log(str)							
			  $("#goods_").append(str);			  
			   $("#totalRecords").html(total);
			   $("#num2").html(total);	
			   $("#totalPages").html(Math.ceil(totalPages));
			  // console.log(totalPages)
		});									
	}
  })
}
/********************删除当前商品*********************/
remove = function(obj){
	//console.log(obj);
	var obj = obj;
	var goods_name = $(obj).parents().children(".first-cell").text();
	//console.log(goods_name);
	$.ajax({
				url: "/api/goods_remove",
				type: "POST",
				data:{
					goods_name : goods_name
				},
				success: function(res) {
					//console.log(res);
				alert(res.message);	
				
				//console.log(res.message)
				}
			})
//	$(obj).parent().parent().remove();
		$.ajax({
							url: "/list_page1",
							type: "get",			
							success: function(res) {
								//console.log(res);
							$(".list_r").html(res);
							}
						})
}
/************************跳转编辑页******************/
mychange = function(obj){
	var obj = obj;
	var goods_number = $(obj).parents().children("#goods_number").text();
	//console.log(goods_number);
	//后台发送当前商品编号
	  $.ajax({         
			url: "/api/goods_change",
			type: "post",
			data:{
				goods_number : goods_number
			},
			success: function(res) {     //
				//console.log(res);
				var data = res.data;
				      //请求编辑页面 
						$.ajax({
						url: "/list_page3",
						type: "get",			
						success: function(res) {
					       //console.log(data);
					       $.each(data, function(index,value) {
						       	$(".list_r").html(res);
								//console.log(value.goods_name);
								$("#goods_name").val(value.goods_name);
								$("#goods_number").val(value.goods_number);				       								$("#price").val(value.price);
					       });						 
						}
					})
				}		
		})	
}
/********************改变当前商品*******************/
change = function(obj){
  //console.log(obj)
	var str = $(obj).html();
			    $(obj).html("");
		        $(obj).parent().append('<input id="act" type="text" value="'+str+'"/>');
			$("#act").blur(function(){
				var str1 = $(this).val();				
		       $(obj).html(str1);		       
		       
		        setTimeout(function(){
		      			var goods_name = $(this).parents().children(".first-cell").text();
				       var price = $(this).parents().children(".price").text();
				       var goods_number = $(this).parents().children("#goods_number").text();
				        $(this).remove();
		        	console.log(goods_name,price,'shi'+goods_number,)
		        	  	$.ajax({
						url : "/api/goods_chang",
						type : "post",
						data :{
							goods_name : goods_name ,
							price : price,
							goods_number : goods_number
						},
						success : function(res){
							console.log(res.message);				
						}
					})
		        }.bind(this),100)
		      		       		        	        
			})			
		}
//console.log(change)
/***********************************************************/
})