// 获取数据库模型
const { User } = require("../model")
// 后端验证
const { body, validationResult } = require('express-validator');
// 获取验证顺序
const validations = require("../middleware/validata")
// 引入MD5加密方法
const md5 = require("../util/md5")

exports.regist = validations([
body("user.password").notEmpty().withMessage("密码不能为空"),
body("user.email").notEmpty().withMessage("邮箱不能为空")
    .isEmail().withMessage("邮箱格式不正确")
    .bail()
    .custom(async email => {
        // 自定义错误，不能让邮箱重复
        const flag = await User.findOne({
            email
        })
        if (flag) {
            console.log(flag);
            return Promise.reject("邮箱重复")
        }
    })])

// 登录验证
exports.login = [
    // 使用数组就可以实现逐个验证
    validations([body("user.password").notEmpty().withMessage("密码不能为空"),
    body("user.email").notEmpty().withMessage("邮箱不能为空")]),
    validations(
        [body("user.email").custom(async (value, { req }) => {
            const flag = await User.findOne({ email: value })
            if (!flag) {
                return Promise.reject("用户不存在")
            }
            req.user = flag
        })]),
    validations([body("user.password").custom(async(value, { req }) => {
        console.log(value);
        console.log(md5(value));
        console.log(req.user);
        if (req.user.password !== md5(value)) {
            return Promise.reject("密码不正确")
        }
        console.log(1);
    })])
]
exports.checkEmail=[
    validations([body("email").notEmpty().withMessage("邮箱不能为空")]),
    validations(
        [body("email").custom(async (value, { req }) => {
            const flag = await User.findOne({ email: value })
            if (flag) {
                return Promise.reject("该用户已存在")
            }
        })])
]