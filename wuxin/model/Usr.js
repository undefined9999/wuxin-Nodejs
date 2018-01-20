var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Usr = new Schema({
    usrname   : String,
    psw        : String,
    create_date: { type: Date, default: Date.now }
});
// 创建model对象
var UsrModel = mongoose.model('usr', Usr);
// 公开对象，暴露接口
module.exports = UsrModel;

//var MongoClient = require('mongodb').MongoClient;
//var DB_CONN_STR = 'mongodb://localhost:27017/wilsondb1';  
//var selectData = function(db, callback) {    
//	//连接到表    
//	var collection = db.collection('tb2');  
//	//查询数据 
//	var whereStr = {"name":'wilson001'};  collection.find(whereStr).toArray(function(err, result) {    if(err)    {      
//		console.log('Error:'+ err);      return;    }        callback(result);  
//	});}
//MongoClient.connect(DB_CONN_STR, function(err, db) {  console.log("连接成功！");  
//selectData(db, function(result) {    console.log(result);    db.close();  });});