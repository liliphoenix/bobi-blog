import Life from '../Layout/Life'
import Main from '../Layout/Main'
import Tech from '../Layout/Tech'
import person from '../Layout/person'
import msg from '../Layout/msg'
import Login from "../Layout/login"
import Regist from "../Layout/regist"
import Detail from "../Layout/details"
import Search from "../Layout/search"
import { Message } from 'element-ui'
import Vue from 'vue'

const routes = [
    { path: "/", name: "main", redirect: '/main' },
    {
        path: "/main", name: "main", meta: {
            flag: "a"
        }, component: Main,
    },
    {
        path: '/life', name: "Life", meta: {
            flag: "a"
        }, component: Life
    },
    { path: '/tech', name: "Tech", component: Tech },
    { path: '/person', name: "Person", component: person },
    { path: '/msg', name: "Msg ", component: msg },
    {
        path: '/login', name: "Login", component: Login,
        beforeEnter: (to, from, next) => {
            if (sessionStorage.getItem("token")) {
                Message({
                    message: "您已经登录了，请不要重复登录",
                    type: "warning"
                })
            } else {
                next()
            }
        }
    },
    {
        path: '/regist', name: "Regist", component: Regist,
        beforeEnter: (to, from, next) => {
            if (sessionStorage.getItem("token")) {
                Message({
                    message: "您已经注册并且登录用户了，请不要重复注册",
                    type: "warning"
                })
            } else {
                next()
            }
        }
    },
    { path: '/detail', name: "detail", component: Detail },
    {
        path: '/search', name: "search", component: Search,
        beforeEnter: (to, from, next) => {
            console.log(Vue.$router);
            next(vm => {
                console.log(vm);
            })
        }
    }
]
export default routes