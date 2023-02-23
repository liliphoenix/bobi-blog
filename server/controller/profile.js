exports.getProfile=async(req,res,next)=>{
    try {
        res.send("Get Profile")
    } catch (error) {
        next(error)
    }
}
exports.getFollow=async(req,res,next)=>{
    try {
        res.send("post /:username/follow")
    } catch (error) {
        next(error)
    }
}
exports.cancelFollow=async(req,res,next)=>{
    try {
        res.send("delete /:username/follow")
    } catch (error) {
        next(error)
    }
}