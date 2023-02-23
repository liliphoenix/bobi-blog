import VueRouter from "vue-router";
import Vue from "vue";
import routes from "./routes";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
// 全局使用vue


const router = new VueRouter({
    routes
})
// 重写push，不会报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
// 设置路由守卫
router.beforeEach((to,from,next)=>{
    if(to.path==='/person'&&!sessionStorage.getItem('token')){
        Message({
            message:"请登录",
            type:"warning",

        })
        next("/login")
    }
    if(to.path==='/msg'&&!sessionStorage.getItem('token')){
        Message({
            message:"请登录",
            type:"warning",

        })
        next("/login")
    }
    if(to.path==='/life'&&!sessionStorage.getItem('token')){
        Message({
            message:"请登录",
            type:"warning",

        })
        next("/login")
    }
    next()
})
export default router
