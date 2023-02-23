const express=require("express")
const router=express.Router()
const Ctrl=require('../controller/profile')
// Get Profile
router.get('/:username',Ctrl.getProfile)
// 关注
router.post('/:username/follow',Ctrl.getFollow)
// 取消关注
router.delete('/:username/follow',Ctrl.cancelFollow)
module.exports=router