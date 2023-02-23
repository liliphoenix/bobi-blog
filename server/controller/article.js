const { Article, User, Comment } = require("../model/index")

// 获取文章列表
exports.listArticle = async (req, res, next) => {
    try {
        // 获取query里面的参数
        const { limit = 20, offset = 0, tag, author } = req.query
        // 筛选查询
        const filter = {}
        // 根据标签筛选
        if (tag) {
            filter.tagList = tag
        }
        // 根据文章的作者筛选 
        if (author) {
            const authors = await User.findOne({
                username: author
            })
            filter.author = authors ? authors._id : null
        }
        // 实现分页功能
        const Articles = await Article.find(filter).skip(Number.parseInt(offset) * Number.parseInt(limit)).limit(Number.parseInt(limit)).populate("author")
        const articleCount = await Article.countDocuments()
        res.status(201).json({
            Articles,
            articleCount
        })
    } catch (error) {
        next(error)
    }
}
// 搜索文章
exports.feedArticles = async (req, res, next) => {
    try {
        console.log(req.params);
        const { limit = 9, offset = 0, } = req.query
        var reg = new RegExp(req.query.keyword);
        // 多条件检索
        let filter = {
            //多字段匹配
            $or: [
                {body: {$regex: reg}},
                {title: {$regex: reg}}
            ]
        }
        console.log(req.query.keyword);
        const searchListLen=await Article.find(filter)
        const searchList=await Article.find(filter).skip(offset*limit).limit(limit)
        res.status(201).json({
            searchList,
            articleCount:searchListLen.length
        })
    } catch (error) {
        next(error)
    }
}
// 获取文章信息
exports.getArticle = async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.articleId).populate("author")
        if (!article) {
            return res.status(401).end()
        }
        return res.status(201).json({
            article
        })
    } catch (error) {
        next(error)
    }
}
exports.createArticle = async (req, res, next) => {
    try {
        // 创建文章
        const article = new Article(req.body.article)
        console.log(req.user);
        article.author = req.user._id
        article.populate("author")
        await article.save()
        res.status(201).json({
            article
        })
    } catch (error) {
        next(error)
    }
}
// 添加评论
exports.addComments = async (req, res, next) => {
    try {
        const comment = new Comment(req.body.comment)
        comment.author = req.user._id
        comment.articleId = req.params.articleId
        comment.populate("author")
        comment.populate("articleId")
        await comment.save()
        res.status(201).json(
            comment
        )
    } catch (error) {
        res.status(402).json({
            errors: error.message
        })
        next(error)
    }
}
// 获取评论
exports.getComments = async (req, res, next) => {

    const articleId = req.params.articleId
    const filter = {
        articleId
    }
    const comments = await Comment.find(filter)
    
    for (i = 0; i < comments.length; i++) {
        await comments[i].populate(["author", "articleId"])
    }
    res.status(201).json({
        comments
    })
}
exports.deleteArticle = async (req, res, next) => {
    try {
        const article = req.article
        await article.remove()
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}
exports.updateArticle = async (req, res, next) => {
    try {
        // 更新文章
        const article = req.article
        const bdArticle = req.body.article
        article.title = bdArticle.title || article.title
        article.description = bdArticle.description || article.description
        article.body = bdArticle.body || article.body
        // 储存到数据库中
        await article.save()
        res.status(200).json({
            article
        })
    } catch (error) {
        next(error)
    }
}
exports.delComments = async (req, res, next) => {
    try {
        res.send("Get Profile")
    } catch (error) {
        next(error)
    }
}
exports.favoriteArticle = async (req, res, next) => {
    try {
        res.send("Get Profile")
    } catch (error) {
        next(error)
    }
}
exports.unfavoriteArticle = async (req, res, next) => {
    try {
        res.send("Get Profile")
    } catch (error) {
        next(error)
    }
}