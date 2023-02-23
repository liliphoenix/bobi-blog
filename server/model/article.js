const mongoose = require('mongoose')
const baseModel=require("./base-model")

const articleSchema = new mongoose.Schema({
    ...baseModel,
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    tagList: {
        type: [String],
        default:null
    },
    favoritesCount:{
        type:Number,
        default:0
    },
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    role:{
        type: String,
        default:"C"
    }
});
module.exports = articleSchema