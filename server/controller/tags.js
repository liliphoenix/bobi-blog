exports.getTags=async(req,res,next)=>{
    try {
        res.send("Get Profile")
    } catch (error) {
        next(error)
    }
}