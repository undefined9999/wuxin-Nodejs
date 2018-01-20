$(function(){
	var verifyCode = new GVerify("v_container");
login=	function() {
		//console.log($("#username").val(),$("#psw").val())
		$.ajax({
			url: "/api/login4ajax",
			type: "post",
			data: {
				usrname: $("#username").val(),
				psw: $("#psw").val()
			},
			success: function(res) {				
				var re = verifyCode.validate($("#code_input").val());			
				//console.log(res);
				if(res.code == 1) {
					if(re){
					alert(res.message);
					//console.log(res.message);
					location.href = "/list?r=" + new Date().getTime();
								}else{
									alert("验证码错误");
									$("#code_input").val("");
								}				
					}else{
						//console.log(res.message);
						alert(res.message);			
				}
			}
		})
	}
	
	
	
	
	
})