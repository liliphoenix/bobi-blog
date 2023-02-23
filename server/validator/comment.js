// 获取数据库模型
const { User, Article } = require("../model")
// 后端验证
const { body, validationResult } = require('express-validator');
// 获取验证顺序
const validations = require("../middleware/validata")
// 引入MD5加密方法
const md5 = require("../util/md5")
exports.checkComment = [
    validations([body("comment.body").notEmpty().withMessage("评论不能为空")]),
    async (req, res, next) => {
        const articleID = req.params.articleId
        const article = await Article.findById(articleID)
        if (!article) {
            return res.status(404).json({
                errors: "文章id错误"
            })
        }
        req.article = article
        next()
    }
]
// 获取评论
exports.getComment = [async (req, res, next) => {
    const articleID = req.params.articleId
    const article = await Article.findById(articleID)
    if (!article) {
        return res.status(404).json({
            errors: "文章id错误"
        })
    }
    req.article = article
    next()
}]