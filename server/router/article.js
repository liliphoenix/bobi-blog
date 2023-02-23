const express=require("express")
const router=express.Router()
const Ctrl=require("../controller/article")
const validate=require("../validator/article")
const validateCom=require("../validator/comment")
const auth=require("../middleware/auth")
//查询文章列表
router.get('',Ctrl.listArticle)
// Feed Articles
router.get('/feed:keyword',Ctrl.feedArticles)
// Get Article
router.get('/:articleId',Ctrl.getArticle)
// 创建文章
router.post('',auth,validate.createArticle,Ctrl.createArticle)
// Update Article
router.put('/:articleId',auth,validate.isValueId,Ctrl.updateArticle)
// Delete Article
router.delete('/:articleId',auth,validate.deleteArticle,Ctrl.deleteArticle)
// Add Comments to an Article
router.post('/:articleId/comments',auth,validateCom.checkComment,Ctrl.addComments)
// Get Comments from an Article
router.get('/:articleId/comments',Ctrl.getComments)
// Delete Comment
router.delete('/:articleId/comments/:id',Ctrl.delComments)
// Favorite Article
router.post('/:articleId/favorite',Ctrl.favoriteArticle)
// Unfavorite Article
router.delete('/:articleId/favorite',Ctrl.unfavoriteArticle)
module.exports=router