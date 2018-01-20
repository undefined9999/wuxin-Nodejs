var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Goods = new Schema({
    goods_name   : String,
    price        : String,
    goods_number : String,
    flag         : String,
    imgPath      : String,
    create_date: { type: Date, default: Date.now }
});
// 创建model对象
var GoodsModel = mongoose.model('goods', Goods);
// 公开对象，暴露接口
module.exports = GoodsModel;