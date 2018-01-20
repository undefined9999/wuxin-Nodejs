var express = require('express');
var router = express.Router();
var UsrModel = require("../model/Usr");
var GoodsModel = require("../model/Goods");
var multiparty = require("multiparty");
//var MongoClient = require("mongodb").MongoClient;

//var DB_CONN_STR = 'mongodb://localhost:27017/h1723';
//var collection = func

/* 请求页面 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* 登录页面 */
router.get('/login', function(req, res, next) {
  res.render('login', { title: '登录' });
});
/*商品列表页*/
router.get('/list_page1', function(req, res, next) {
  res.render('list_page1', {  });
});
/* 添加新商品页面 */
router.get('/list_page2', function(req, res, next) {
  res.render('list_page2', {  });
});
/* 编辑页面 */
router.get('/list_page3', function(req, res, next) {
  res.render('list_page3', {  });
});

/*登录信息验证*/
router.post('/api/login4ajax', function(req, res, next) {
	/* 获取前端发送的参数*/
	var usrname = req.body.usrname;
	var psw = req.body.psw;
	//console.log(usrname,psw)
	var result = {
		code: 1,
		message: "登录成功"
	};
	/*调用modul查询数据*/
	UsrModel.find({usrname: usrname, psw:psw}, (err, docs)=>{
		if(docs.length == 0) {
//			console.log(usrname,psw)
//			console.log(docs)
			result.code = -101;
			result.message = "您的账号或密码错误。请重新登录。"
		} else {
			// 登录成功的时候，生成session
			req.session.usrname = usrname;
//			console.log(req.session);
		}
		res.json(result);
		//res.send("aaa")
	})
});
/*登录验证*****************************************/
router.get('/list', function(req, res, next) {
	//判断用户是否登录，如果没登录跳转到login页面。
//	console.log(req.session);
	if(req.session == null || req.session.usrname == null) {
		res.render('login', { title: '登录页面' });
		res.redirect("/login"); // 重定向
		return;
	}
		res.render('list', {title:'商品管理'});
	
});
/*添加商品信息**/
router.post('/api/goods', function(req, res, next) {
	/* 上传文件*/
	var form = new multiparty.Form({
		uploadDir: "public/images"
	});
	var result = {
		code: 1,
		message: "商品信息保存成功"
	};
	form.parse(req, function(err, body, files){
		if(err) {
			console.log(err);
		}
		//console.log(body);
		/* 获取前端发送的参数*/
		var goods_name = body.goods_name[0];
		var price = body.price[0];
		var goods_number = body.goods_number[0];
		var flag   = body.flag;
		var imgPath = files["img"][0].path.replace("public\\", "");
		/*  数据赋值*/
		var gm = new GoodsModel();
		gm.goods_name = goods_name;
		gm.price = price;
		gm.goods_number = goods_number;
		gm.imgPath = imgPath;
		gm.flag = flag;
		/* 数据存储*/
		gm.save(function(err){
			if(err) {
				result.code = -99;
				result.message = "商品保存失败";
			}
			res.json(result);
		})
	})
});
/*复制商品****************************************/
router.post('/api/goods_clone', function(req, res, next) {
	var result = {
		code: 1,
		message: "商品信息复制成功"
	};
	/* 获取前端发送的参数*/
		var goods_name = req.body.goods_name;
		var price = req.body.price;
		var goods_number = req.body.goods_number;
		var flag = req.body.flag;
		//console.log(goods_name,price);
		/* 调用modul存储数据*/
		var gm = new GoodsModel();
		gm.goods_name = goods_name;
		gm.price = price;
		gm.goods_number = goods_number;
		gm.flag = flag;
		/*  */
		gm.save(function(err){
			if(err) {
				result.code = -99;
				result.message = "商品复制失败";
			}
			res.json(result);
		})
});
/*删除商品***********************************/
router.post('/api/goods_remove', function(req, res, next) {
	/* 获取前端发送的参数*/
	var name = req.body.goods_name;
	//console.log(name);
	var result = {
		code: 1,
		message: "删除成功"
	};
	/* 调用modul读取数据库数据*/
	GoodsModel.remove({goods_name:name},(err)=>{
    if(err) {
    	result.code = -101;
			result.message = "没找到该商品"
    }
    res.json(result);
	})
});
/**********************获取数据库所有信息***********/
router.post('/api/goods_find', function(req, res, next) {
	/* 获取前端发送的参数*/
		var condition = req.body.condition;
		var pageNO = req.body.pageNO || 1;
			pageNO = parseInt(pageNO);
		var perPageCnt = req.body.perPageCnt || 10;
			perPageCnt = parseInt(perPageCnt);
/* 查询*/
	GoodsModel.count({flag: {$regex: condition}}, function(err, count){
		//console.log("数量:" + count);
     var body = GoodsModel.find({flag: {$regex: condition}}).skip((pageNO-1)*perPageCnt).limit(perPageCnt);
		body.exec(function(err, docs){
			//console.log(err, docs);
			var result = {
				total: count,
				data: docs,
				pageNO: pageNO
			};
			res.json(result);
		});
	})
});
/**********编辑商品**********************************/
router.post('/api/goods_change', function(req, res, next) {	
	 var number = req.body.goods_number;
	console.log(number);
GoodsModel.find({goods_number: number}, (err, docs)=>{
		  var result = {
				data: docs
			};
			res.json(result);
	  }) 
});
/***************将编辑后的商品覆盖数据库**********/
router.post('/api/goods_chang', function(req, res, next) {
		var goods_name = req.body.goods_name;
		var price = req.body.price;
		var goods_number = req.body.goods_number;
		
		console.log(goods_name,price,goods_number,)
		  var result = {
		  	code : 1,
		  	message : "修改成功"
		  };
	GoodsModel.update({goods_number : goods_number,price : price,goods_number : goods_number},{$set:{goods_number : goods_number,price:price,goods_name:goods_name}},function(err){
		if(err){
					result.code = -110;
					result.message = "修改失败";
	  		}
	  		res.json(result);
	  })
	})

/*******************************************************/
module.exports = router;
