### 启动服务器

常见的get请求

```js
const express=require('express')
const app=express()
app.get('/',(req,res)=>{
    res.send("Hello World")
})
app.listen(3000,()=>{
    console.log("Server running at http://localhost:3000/");
})

```

常见的post请求,用postman发请求

```js
const express=require('express')
const app=express()
app.post('/',(req,res)=>{
    res.send("Hello World")
})
app.listen(3000,()=>{
    console.log("Server running at http://localhost:3000/");
})
```

### JSON.prase

可以把json转换成js对象

### res.json

响应的对象是js对象的形式

### 创建项目

![1667392463241](D:\前端\node\2022\express\ep1\express.assets\1667392463241.png)

### 连接MongoDB数据库



首先 安裝mongoose

```
npm i mongoose 
```

其次，在model.js中创建index.js

連接的是test數據庫

```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

main().catch(err => console.log("数据库连接失败",err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}


const Cat = mongoose.model('Cat', { name: String });
const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
```

在app.js中

```js
require("./model")
```

### 保存数据到数据库中

在model/user中写好数据规则

```js
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    bio: {
        type: String,
        require: null
    },
    image: {
        type: String,
        require: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});
module.exports = userSchema
```

在index.js中输出

```js
moudle.exports={
    User:mongoose.model('User',require("./user.js"))
}
```

在数据库中储存

```js
exports.regist=async(req,res,next)=>{
    console.log(req.body.user)
    const user=new User(req.body.user)
    await user.save()
    res.status(201).json({
        user
    })
}
```

### 重复数据

创建basemodel

```js
module.exports={
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}
```

文件中引入

```js
const baseModel=require("./base-model")
//...的方式加入
...baseModel,
```



### 请求相关步骤

#### 1.获取请求数据

#### 2.基本数据验证

#### 3.业务数据验证

#### 4.验证通过，将数据保存到数据库中

##### 5.请求响应

### validator数据验证

```
npm i express-validator
```

在路由中添加中间件

```js
app.post("./xxx",body("user.username").notEmpty()withMessage("用户名不能为空"))
```

自定义错误

email唯一

```
app.post("./xxx",body("user.username").notEmpty()withMessage("用户名不能为空")
.bail()
.custom(email=>{
    //引入数据库模型
    const flag=User.findOne({email})
    if(flag){
        return Promise.reject("xxx")
    }
})
)
```

### validator模块化处理

#### 更加该规范的错误信息响应

穿件middel-ware 创建文件validate.js

```js
const express = require('express');
const { validationResult, ValidationChain } = require('express-validator');
// can be reused by many routes

// parallel processing
const validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};
```

#### 在中间件验证使用

```
onst {User}=require("../model")
// 后端验证
const { body, validationResult } = require('express-validator');
// 获取验证顺序
const validate=require("../middleware/validata")

exports.regist=validate.validate([body("user.username").notEmpty(),
body("user.password").notEmpty().withMessage("密码不能为空"),
body("user.email").notEmpty().withMessage("邮箱不能为空")
    .isEmail().withMessage("邮箱格式不正确")
    .bail()
    .custom(async email => {
        // 自定义错误，不能让邮箱重复
        const flag = await User.findOne({
            email
        })
        if (flag) {
            console.log(flag);
            return Promise.reject("邮箱重复")
        }
    })])
```

### md5加密

在util下创建MD5.js

```js
const crypto=require("crypto")
module.exports= str=>{
    return crypto.createHash('md5').update("123"+str).digest("hex")
}
```

在模型层加密，用set方法

```js
password: {
        type: String,
        require: true,
        // 加密md5
        set: value =>md5(value)
    },
```

