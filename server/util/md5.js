const crypto=require("crypto")
module.exports= str=>{
    return crypto.createHash('md5').update("123"+str).digest("hex")
}