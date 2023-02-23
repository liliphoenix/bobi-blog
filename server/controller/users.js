// 引入數據
const { User } = require("../model")
// 引入jwt
const jwt = require("../util/jwt")
// 引入密钥
const { jwtsrc } = require("../config/config.default")

exports.checkEmail = async (req, res, next) => {
    res.status(201).end()
}
exports.login = async (req, res, next) => {
    try {
        const user = req.user.toJSON()
        console.log(123412312);
        console.log(user._id);

        const token = await jwt.sign({
            user_id: user._id
        }, jwtsrc)
        user.token = token
        delete user.password
        res.status(201).json({
            ...user,
            token
        })
    } catch (error) {
        next(error)
    }
}
exports.regist = async (req, res, err) => {
    try {
        const user = new User(req.body.user)
        await user.save()
        res.status(201).json({
            user
        })
    } catch (error) {
        next(error)
    }
}
exports.uploadimg = async (req, res, next) => {
    try {
        res.send("put/users")
    } catch (error) {

    }
}
exports.getusers = async (req, res) => {
    try {
        res.status(201).json({
            user: req.user
        })
    } catch (error) {
        next(error)
    }
}
exports.update = async (req, res) => {
    try {
        const user=req.user
        user.username=req.body.data.username||user.username
        user.bio=req.body.data.bio||user.bio
        user.hobby=req.body.data.hobby||user.hobby
        user.job=req.body.data.job||user.job
        user.ability=req.body.data.ability||user.ability
        user.image=req.body.data.image||user.image
        await user.save()
        const userjson=req.user.toJSON()
        delete userjson.password
        res.status(201).json({
            userjson
        })
    } catch (error) {
        next(error)
    }
}   