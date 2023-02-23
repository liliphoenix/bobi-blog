// 后端验证
const { body, validationResult } = require('express-validator');
// 获取验证顺序
const validations = require("../middleware/validata")
const {Article}=require("../model")
// 获取封装的OBJID验证方法
const {isVlaueObjId}=require("../middleware/validata")
// 文章内容验证
exports.createArticle = validations([body("article.title").notEmpty().withMessage("文章标题不能为空"),
body("article.description").notEmpty().withMessage("文章描述不能为空"),
body("article.body").notEmpty().withMessage("文章内容不能为空")
])
// 合法ID验证
exports.isValueId=[async(req,res,next)=>{
    // 获取articlId
    const articleId=req.params.articleId
    console.log(articleId);
    const article=await Article.findById(articleId)
    req.article=article
    console.log(article);
    if(!article){
        return res.status(404).end()
    }
    next()
    
}

]

// 删除文章
exports.deleteArticle=exports.isValueId