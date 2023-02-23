const express=require("express")
const app=express()
// 引入路由
const router=require('./router/index')
// 解决跨域问题
const PORT=process.env.PORT||3000
const morgan=require("morgan")
const cors=require("cors")
var path = require('path');

//用於req.body獲取不到相應的值
var bodyParser = require('body-parser');//用于req.body获取值的
app.use(bodyParser.json());
// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended: false }));

// 启动数据库
require("./model")

app.use(morgan('dev'))
app.use(cors())
// 引用路由
app.use('/api',router)
// 错误处理器
const errHandler=require("./middleware/err-handler")
app.use(errHandler())
// 启动服务器端口
app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})