const express=require("express")
const router=express.Router()
const Ctrl=require("../controller/tags")
// Get Profile
router.get('/tags',Ctrl.getTags)
module.exports=router