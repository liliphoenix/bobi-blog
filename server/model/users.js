const mongoose = require('mongoose')
const baseModel = require("./base-model")
const md5 = require("../util/md5")
const userSchema = new mongoose.Schema({
    ...baseModel,
    email: {
        type: String,
        require: true
    },
    username:{
        type:String,
        default:"111123"
    },
    password: {
        type: String,
        require: true,
        // 加密md5
        set: value =>md5(value), 
    },
    bio: {
        type: String,
        require: null
    },
    hobby: {
        type: String,
        require: null
    },
    image: {
        type:String,
        require: null
    },
    job: {
        type: String,
        require: null
    },
    ability: {
        type: String,
        require: null
    },
});
module.exports = userSchema