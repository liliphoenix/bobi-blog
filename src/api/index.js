import request from "./request";
export const login=(data)=>{
    return request({
        url:"users/login",
        method:"post",
        data:{
            user:data
        }
    })}
export const getArticles=(data)=>{

    return request({
        url:`/articles/?limit=${data.limit}&offset=${data.current}`,
        method:"get"
    })
}
// 验证邮箱存在
export const checkEmailer=(data)=>{
    return request({
        url:"user/check",
        method:"post",
        data
    })
}
// 用户注册
export const regist=(data)=>{
    return request({
        url:"/users",
        method:"post",
        data:{
            user:data
        }
    })
}
// 获取文章详细信息
export const getdetails=(data)=>{
    return request({
        url:`/articles/${data}`,
        method:"get",

    })
}
// 获取文章评论
export const addComments=(data)=>{
    console.log(data);
    const comment={
        body:data.body
    }
    return request({
        url:`/articles/${data.id}/comments`,
        method:"post",
        data:{
            comment
        }
    })
}
//获取文章评论
export const getComments=(data)=>{
    return request({
        url:`/articles/${data.id}/comments`,
        method:"get",
    })
}
// 更新用户信息
export const updateUserInfo=(data)=>{
    return request({
        url:"/user/update",
        method:"put",
        data:{
            data
        }
    })
}
// 获取用户信息
export const getUser=(data)=>{
    return request({
        url:"/user",
        method:"get"
    })
}
// 搜索文章
export const searchArticles=(data)=>{
    console.log(data);
    return request({
        url:`/articles/feed ?keyword=${data.keyword}&limit=${data.limit}&offset=${data.current}`,
        method:"get"
    })
}
// 创建文章
export const createArticles=(data)=>{
    console.log(data,1);
    return request({
        url:`/articles`,
        method:"post",
        data
    })
}
//更新文章
export const updateArticle=(data)=>{
    console.log(1);
    return request({
        url:`/articles/${data[1].id}`,
        method:"put",
        data:data[0]
    })
}