const express = require("express")
const router = express.Router()
// 引入后端验证中间件
const validation=require("../validator/user")

// 从控制器里面获取接口地址
const Ctrl = require('../controller/users');
const e = require("cors");

// token身份验证
const auth=require("../middleware/auth");
const { upload } = require("../middleware/upload");
// 登录
router.post('/users/login', validation.login,Ctrl.login)
// 注册
router.post('/users',validation.regist,Ctrl.regist)
// 获取用户数据
router.get('/user',auth,Ctrl.getusers)
// 更新用户数据
router.put('/user',auth,Ctrl.update)
// 邮箱查重
router.post('/user/check',validation.checkEmail,Ctrl.checkEmail)
// 更新用户信息
router.put('/user/update',auth,Ctrl.update)
// router.post('/user/upload',upload.single('haha'),Ctrl.uploadimg)
module.exports = router 