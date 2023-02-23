<template>
  <div class="login">
    <h2><img src="../../assets/登录.png" alt="" /> 打开博比世界的大门</h2>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="70px"
      class="demo-ruleForm"
    >
      <el-form-item label="邮箱" prop="email">
        <el-input v-model.number="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="上传头像">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:3000"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var checkAge = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }

      let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!reg.test(value)) {
        callback(new Error("邮箱格式不正确"));
      } else {
        const f = await this.checkEmail();
        console.log(f);
        if (f) {
          callback();
        } else {
          callback(new Error("用户名已经存在"));
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        email: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        email: [{ validator: checkAge, trigger: "blur" }],
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      imageUrl: "",
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$store.dispatch("regist", {
              email: this.ruleForm.email,
              password: this.ruleForm.pass,
            });
            this.open("注册用户成功", "注册成功", "success", "注册成功");
            this.$router.push({
              path: "/login",
              query: { email: this.ruleForm.email },
            });
          } catch (error) {
            console.log(error);
            this.open(error.message, "注册失败");
          }
        } else {
          console.log("error submit!!");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async checkEmail() {
      let flag = null;
      try {
        await this.$store.dispatch("checkEmail", {
          email: this.ruleForm.email,
        });
        flag = true;
      } catch (error) {
        flag = false;
      }
      return flag;
    },
    open(a, b, c, d) {
      this.$alert(a, b, {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: c,
            message: d,
          });
        },
      });
    },
    // 头像上传
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    handleAvatarSuccess(res, file) {
      console.log();
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      console.log(isJPG);
      return isJPG && isLt2M;
    },
    
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 450px;
  height: 570px;
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
  width: 300px;
}
.el-form {
  width: 370px;
}
.avatar-uploader .el-upload {
  border: 1px solid #0c0c0c;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar-uploader-icon {
  border: 1px dashed rgb(121, 123, 123);
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>