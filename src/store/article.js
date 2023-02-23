import {updateArticle, getArticles, getdetails,addComments,getComments,searchArticles} from '../api'
const state={
    articleList:[],
    artCount:1,
    articleDetail:{},
    comments:[],
    searchList:"",
    searchCount:0
}
const mutations={
    CHANGEARTI(state,data){
        state.articleList=data.Articles
        state.artCount=data.articleCount
    },
    GETDETAIL(state,data){
        state.articleDetail=data
    },
    GETCOMMENTS(state,data){
        console.log(data);
        state.comments=data.comments
    },
    GETSEARCH(state,data){
        state.searchList=data.searchList
        state.searchCount=data.articleCount
    }
}
const actions={
    async getArticle({commit},payload){
        console.log(payload);
        const res=await getArticles(payload)
        console.log(res);
        if(res.status==201){
            commit('CHANGEARTI',res.data)
        }
    },
    // 获取文章文章详细内容
    async getdetails({commit},payload){
        console.log(payload.id);
        const res=await getdetails(payload.id)
        if(res.status==201){
            commit('GETDETAIL',res.data)
            return res.data
        }
    },
    // 添加文章评论
    async addComments({commit},payload){
        const res=await addComments(payload)
        if(res.status==201){
        }else{
            return Promise.reject(new Error())
        }
    },
    //获取文章评论
    async getComments({commit},payload){
        console.log(123);
        const res=await getComments(payload)
        console.log(res.data);
        if(res.status==201){
            commit('GETCOMMENTS',res.data)
        }else{
            return Promise.reject(new Error())
        }
    },
    // 搜索功能
    async searchArticle({commit},payload){
        console.log(payload);
        const res=await searchArticles(payload)
        if(res.status==201){
            commit('GETSEARCH',res.data)
            return res.data
        }else{
            return Promise.reject(new Error())
        }
    },
    //更新文章内容
    async updateArticle({commit},payload){
        console.log(payload);
        const res=await updateArticle(payload)
        console.log(res);
        if(res.status==201){
            return "ok"
        }else{
            return Promise.reject(res)
        }
    },
}
const getters={
    
}
export default {
    state,
    mutations,
    actions,
    getters
}