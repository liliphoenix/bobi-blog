const mongoose = require('mongoose');
// 引入配置文件
const {dbUrl}=require("../config/config.default")
mongoose.connect(dbUrl);

main().catch(err => console.log("数据库连接失败",err));
async function main() {
  await mongoose.connect(dbUrl);
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
// 組織導出模型
module.exports={
    User:mongoose.model("User",require('./users')),
    Article:mongoose.model("Article",require('./article')),
    Comment:mongoose.model("Comment",require('./comment'))
}