<template>
  <div class="login">
    <h2><img src="../../assets/登录.png" alt="" /> 进一步走进博比的博客</h2>
    <el-form
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="70px"
      class="demo-ruleForm"
      :model="ruleForm"
      @validate="check"
    >
      <el-form-item label="用户名" prop="pass">
        <el-input
          placeholder="请输入手机号"
          type="text"
          v-model="ruleForm.username"
          autocomplete="off"
          ref="username"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="checkPass">
        <el-input
          placeholder="请输入密码"
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="login('ruleForm')">登录</el-button>
      </el-form-item>
      <el-form-item label="" prop="age">
        <div class="loginIcon">
          <span>其他登录方式:</span><a href="" class="iconfont icon-qq"></a
          ><a href="" class="iconfont icon-weibo-circle-fill"></a
          ><a href="" class="iconfont icon-wechat-fill"></a
          ><a href="" class="iconfont icon-github-fill"></a>
        </div>
      </el-form-item>
    </el-form>
    <span class="regist">还没注册账户？<a  @click="$router.push('/Regist')">点击注册</a></span>
  </div>
</template>

<script>
export default {
  mounted(){
    this.ruleForm.username=this.$route.query.email
  },
  data() {
    //   定义用户名校验规则
    var validateUser = (rule, value, callback) => {
      var pattn1 = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (this.username === "") {
        callback(new Error("请输入用户名"));
      } else if (!pattn1.test(this.ruleForm.username)) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        //   如果确认密码里面有内容的话就会进行验证
        //   if (this.ruleForm.checkPass !== '') {
        //     this.$refs.ruleForm.validateField('checkPass');
        //   }

        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (this.ruleForm.password === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "admin@qq.com",
        password: "123",
      },
      rules: {
        pass: [{ validator: validateUser, trigger: "blur" }],
        checkPass: [{ validator: validatePass, trigger: "blur" }],
      },
      checkState: {
        emailState: false,
        passState: false,
      },
    };
  },
  methods: {
    login(ref) {
      this.$refs[ref].validate(async (valid) => {
        if (valid) {
          try {
             await this.$store.dispatch("userLogin", {
              email: this.ruleForm.username,
              password: this.ruleForm.password,
            });
            this.succMsg()
            this.$router.push('/main')
          } catch (error) {
            this.errorMsg()
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    check(el, state) {
      if (el == "pass") {
        this.emailState = state;
      } else if (el == "checkPass") {
        this.passState = state;
      }
    },
    errorMsg() {
      this.$message({
        showClose: true,
        message: "用户名或者密码错误",
        type: "error",
        duration:5000
      });
    },
    succMsg() {
        this.$message({
          message: '登陆成功',
          type: 'success',
          duration:3000
        });
      },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 450px;
  height: 450px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    img {
      width: 50px;
      position: relative;
      top: 15px;
    }
    margin-bottom: 35px;
    color: rgb(102, 177, 255);
  }
}
.el-button {
  width: 290px;
}
.el-form {
  width: 370px;
}
.regist {
  font-size: 14px;
  a {
    color: skyblue;
  }
}
.loginIcon {
  align-items: center;
  display: flex;

  a {
    text-align: center;
    margin: 0 5px;
    font-size: 29px;
    color: black;
    transition: 0.2s all;
  }
}

.loginIcon a:hover {
  color: rgb(64, 158, 255);
}
</style>