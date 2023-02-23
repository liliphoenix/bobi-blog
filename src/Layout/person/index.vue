<template>
  <div>
    <Nav></Nav>
    <div class="info">
      <el-upload
        class="avatar-uploader"
        action="#"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :http-request="uploadfile"
        :on-change="avatarPreview"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <span v-if="!imageUrl" class="desciption">上传头像</span>
      </el-upload>
      <div class="title">
        <h1>完善个人信息</h1>
        <span>让大家知道最精彩的自己</span>
        <div class="ribeen">
          <span>nice</span>
        </div>
      </div>
      <div class="form-content">
        <div class="input-box">
          <label for="name">昵称:</label
          ><input type="text" name="" v-model="username" id="name" />
        </div>
        <div class="input-box">
          <label for="name">简单描述一下自己吧:</label
          ><input type="text" name="" id="name" v-model="slefIntroduction" />
        </div>
        <div class="input-box">
          <label for="name">爱好:</label
          ><input type="text" name="" id="name" v-model="hobby" />
        </div>
        <div class="input-box">
          <label for="name">毕业之后想从事的行业:</label
          ><input type="text" name="" id="name" v-model="job" />
        </div>
        <div class="input-box">
          <label for="name">掌握的技术栈:</label
          ><input type="text" name="" id="name" v-model="ablility" />
        </div>
        <el-button @click="submit">提交信息</el-button>
      </div>
    </div>
    <Footer bgc="168, 221, 181"></Footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Nav from "../../components/Nav";
import Vue from "vue";
import Footer from "../../components/Footer";
export default {
  components: {
    Nav,
    Footer,
  },
  data() {
    return {
      imageUrl: "",
      licenseFd: {},
      slefIntroduction: "",
      hobby: "",
      job: "",
      ablility: "",
      username: "",
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log(file);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
        var imgcode = e.target.result;
        this.imageUrl = imgcode;
      };

      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M && isPNG;
    },
    uploadfile() {},
    avatarPreview(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error(this.inter.sctpdx + " 2MB!");
      } else {
        // let fd = new FormData()
        // fd.append('file', file.raw)
        // // 存储图片，点击确认按钮时统一上传
        // this.imageUrl = URL.createObjectURL(file.raw);
        // this.licenseFd = fd
        // console.log(fd);
      }
    },
    async submit(f) {
      if ((f = 1)) {
        console.log(1);
      }
      const data = {
        bio: this.slefIntroduction,
        hobby: this.hobby,
        job: this.job,
        ability: this.ablility,
        image: this.imageUrl,
        username: this.username,
      };
      try {
        await this.$store.dispatch("updateUser", data);
        sessionStorage.setItem("username", this.username);
        sessionStorage.setItem("image", this.imageUrl);
        location.reload();
      } catch (error) {
        // this.$message.error(error.message);
        // if (error.message == "请先登录") {
        //   this.$router.push("/login");
        // }
      }
    },
    async getInfo(n) {
      try {
        await this.$store.dispatch("getUser");
        this.imageUrl = this.userInfo.user.image;
        this.hobby = this.userInfo.user.hobby;
        this.username = this.userInfo.user.username;
        this.bio = this.userInfo.user.bio;
        this.job = this.userInfo.user.job;
        this.ability = this.userInfo.user.ability;
      } catch (error) {

      }
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.user.user;
    },
  },
};
</script>

<style lang="less" scoped>
.desciption {
  position: absolute;
  left: 55px;
  top: 120px;
}
.avatar-uploader {
  position: absolute;
  left: -50px;
  top: -50px;
  z-index: 1;
  background-color: rgba(228, 221, 221, 0.9);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
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
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.info {
  width: 900px;
  height: 700px;

  margin: 0 auto;
  background-color: rgb(247, 252, 240);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 100px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .title {
    width: 100%;
    height: 128px;
    background-color: rgb(168, 221, 181);
    text-align: center;
    color: rgb(19, 95, 85);
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    overflow: hidden;
    position: relative;
    h1,
    span {
      position: relative;
      left: -180px;
    }
    h1 {
      margin-bottom: 5px;
    }
    .ribeen {
      position: absolute;
      right: -22px;
      top: 15px;
      height: 25px;
      line-height: 25px;
      background-color: rgb(78, 179, 211);
      width: 100px;
      box-shadow: 0 0 10px #888;
      transform: rotate(45deg);
      span {
        left: 0;
        color: rgb(19, 95, 85);
        font-weight: bold;
      }
    }
  }
  input {
    border: none;
    outline: none;
    width: 450px;
    height: 40px;
    margin-bottom: 50px;
    font-size: 16px;
    line-height: 20px;
    background-color: rgb(247, 252, 240);
  }

  .form-content {
    .el-button {
      width: 220px;
      height: 40px;
      padding: 0;
      background-color: rgb(19, 95, 85);
      border: none;
      color: rgb(255, 255, 255);
      position: absolute;
      left: 340px;
    }
    .input-box::after {
      content: " ";

      display: block;
      width: 550px;
      height: 2px;
      position: relative;
      top: -50px;
      background-color: rgba(213, 213, 213, 0.5);
    }
    .input-box:focus-within::after {
      animation-name: showBorder;
      animation-duration: 0.9s;
      animation-fill-mode: forwards;
      animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    .input-box::after label {
      font-size: 19px;
      margin-right: 20px;
      color: rgb(19, 95, 85);
    }
    .input-box input {
      color: rgb(9, 115, 43);
    }
  }
  @keyframes showBorder {
    from {
      width: 550px;
    }
    to {
      background-color: rgba(19, 95, 85);
      width: 550px;
    }
  }
}
</style>