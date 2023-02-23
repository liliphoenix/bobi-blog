import { createArticles } from '../api'
const state={
    html:"<p>输入你想要的内容吧</p>",
    title:"BOBI"
}
const getters={}
const actions={
    async createArticle({commit},data){
        const res=await createArticles(data)
        if(res.status==201){
            return "ok"
        }else{
            return Promise.reject(res)
        }

    }
}
const mutations={
    changeHtml(state,data){
        state.html=data
    },
    changeTitle(state,data){
        state.title=data
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}