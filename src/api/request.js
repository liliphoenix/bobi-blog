import axios from "axios";
import nProgress from "nprogress";
import 'nprogress/nprogress.css'

// 创建axios实例
import store from "../store";
const request=axios.create({
    baseURL:"http://localhost:3000/api",
    timeout:3000
})
request.interceptors.request.use(config=>{
    nProgress.start()
    console.log(store.state.user.token);
    // 保存token的值
    if(sessionStorage.getItem('token')){
        console.log(1);
        config.headers.Authorization=`Bearer ${sessionStorage.getItem('token')}`    
    }
    return config
},error=>{
    console.log(JSON.parse(error));
    return error
})
request.interceptors.response.use(config=>{
    nProgress.done()
    return config
},(error)=>{    
    
    nProgress.done()
    return error
})
export default request