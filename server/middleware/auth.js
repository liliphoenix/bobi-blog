const {verify}=require("../util/jwt")
const {jwtsrc}=require("../config/config.default")
const {User}=require("../model/index")
module.exports=async(req,res,next)=>{
    let token=req.headers.authorization
    console.log(token);
    token?token=token.split("Bearer ")[1]:null
    if(!token){
       return res.status(401).end("请先登录")
    }
    try {
        const flag=await verify(token,jwtsrc)
        console.log(flag);
        // 和数据库匹配token值
        req.user=await User.findById(flag.user_id)
        console.log(req.user);
        next()
    } catch (error) {
        return res.status(401).end()
    }

}   