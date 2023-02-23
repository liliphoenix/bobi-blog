import {checkEmailer, login,regist,updateUserInfo,getUser} from '../api'
const state={
    user:{},
    token:""
}
const mutations={
    USERINFO(state,data){
        state.user=data
        state.token=data.token
        sessionStorage.setItem('token',data.token)
        sessionStorage.setItem('image',data.image)
        sessionStorage.setItem('username',data.username)
    },
    UPDATEUSER(state,data){
        state.user=data
    }
}
const actions={
    async userLogin({commit},payload){
        console.log(payload);
        const res=await login(payload)
        console.log(1);
        if(res.status==201){
            commit('USERINFO',res.data)
            return res.data
        }else{
            commit('USERINFO',res)
            return Promise.reject(new Error())
        }
    },
    // 验证邮箱
    async checkEmail({commit},payload){
        const res= await checkEmailer(payload)
        if(res.status==201){
            return "ok"
        }else{
            return Promise.reject(new Error())
        }
    },
    // 用户注册
    async regist({commit},payload){
        const res= await regist(payload)
        if(res.status==201){
            return "ok"
        }else{
            const data=res.response.data.errors[0].msg
            console.log(data);
            return Promise.reject(new Error(data))
        }
    },
    // 更新用户信息
    async updateUser({commit},payload){
        const res= await updateUserInfo(payload)
        if(res.status==201){
            commit("UPDATEUSER",res.data)
        }else{
            const data=res.response.data
            console.log(data);
            return Promise.reject(new Error(data))
        }
    },
    // 获取用户信息
    async getUser({commit},payload){
        const res= await getUser(payload)
        if(res.status==201){
            commit("UPDATEUSER",res.data)
        }else{
            const data=res.response.data
            console.log(data);
            return Promise.reject(new Error(data))
        }
    }
}
const getters={
    
}
export default {
    state,
    mutations,
    actions,
    getters
}