const mongoose = require('mongoose')
const baseModel = require("./base-model")
const commentSchema = new mongoose.Schema({
    ...baseModel,
    body: {
        type: String,
        require: true
    },
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    articleId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Article"
    },
});
module.exports = commentSchema