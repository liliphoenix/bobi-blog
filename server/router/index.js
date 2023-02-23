const express=require("express")
const router1=express.Router()

// 用户路由
router1.use(require('./users'))
// 关注路由
router1.use('/profile',require('./profile'))
// 文章路由
router1.use('/articles',require('./article'))
// 获取标签
router1.use(require('./tags'))
module.exports=router1