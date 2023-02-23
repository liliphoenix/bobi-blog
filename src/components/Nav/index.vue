<template>
  <div class="nav">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#00ABB3"
      text-color="white"
    >
      <el-menu-item
        ><h1 @click="jumping('home')">博比的个人博客</h1></el-menu-item
      >
      <el-menu-item index="1"
        ><div class="nav-items" @click="jumping('person')">
          关于我
        </div></el-menu-item
      >
      <el-menu-item index="3"
        ><div class="nav-items" @click="jumping('tech')">
          留言
        </div></el-menu-item
      >
      <el-menu-item index="5"
        ><div class="nav-items" @click="jumping('msg')">文章编辑</div></el-menu-item
      >

      <div class="user">
        <slot>
          <div class="search">
          <input placeholder="" class="search-ipt" v-model="keyword" />
          <el-button type="primary" icon="el-icon-search" @click="search"
            >搜索</el-button
          >
        </div>
        </slot>
        <div v-show="flag" class="info">
          <div class="touxiang">
            <img style="{cursor: pointer;}" @click="jumping('person')"  :src="userImage" alt="" />
          </div>
          <span @click="jumping('person')" >{{ username }},欢迎您</span>
        </div>
        <div v-show="!flag" class="login">
          <span @click="jumping('Regist')">注册</span>
          <el-button type="primary" @click="jumping('login')">登录 </el-button>
        </div>
        <div class="exit" v-show="flag">
          <el-button type="primary" @click="exit">退出登录</el-button>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "BlogIndex",

  data() {
    return {
      keyword: "",
    };
  },

  mounted() {},

  methods: {
    jumping(val) {
      if (val === "home") {
        this.$router.push({ path: "/main" });
      }
      if (val === "tech") {
        this.$router.push({ path: "/tech" });
      }
      if (val === "life") {
        this.$router.push({ path: "/life" });
      }
      if (val === "person") {
        this.$router.push({ path: "/person" });
      }
      if (val === "msg") {
        this.$router.push({ path: "/msg" });
      }
      if (val === "login") {
        this.$router.push({ path: "/login" });
      }
      if (val === "Regist") {
        this.$router.push({ path: "/Regist" });
      }
      if (val === "person") {
        this.$router.push({ path: "/person" });
      }
    },
    exit() {
      sessionStorage.removeItem("token");
      this.$router.push("/")
      location.reload();
    },
    search() {
      if (this.keyword.trim() == "") {
        this.$message({
          message: "输入内容不能为空",
          type: "warning",
        });
      } else {
        this.$router.push({
          path:"/search",
          query: {
            keyword:this.keyword
          },
        });
      }
    },
  },
  computed: {
    flag() {
      return sessionStorage.getItem("token") ? 1 : 0;
    },
    userInfo() {
      return this.$store.state.user.user ? this.$store.state.user.user : {};
    },
    userImage() {
      return sessionStorage.getItem("image")
        ? sessionStorage.getItem("image")
        : {};
    },
    username() {
      return sessionStorage.getItem("username")
        ? sessionStorage.getItem("username")
        : {};
    },
    searchList() {
      return this.$store.state.articles.searchList
        ? this.$store.state.articles.searchList
        : "";
    },
  },
};
</script>

<style lang="less" scoped>
* {
  font-size: 16px;
  font-weight: 500;
}
h1 {
  font-size: 20px;
  font-weight: bold;
  color: #3c4048;
}
.el-icon-data-analysis {
  color: #cf0a0a;
  font-size: 20px;
  margin-left: 5px;
}
.el-menu-demo .el-menu-item {
  background-color: #fff;
}
.nav {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.router-link-exact-active {
  width: 100%;
  height: 100%;
}
.nav-items {
  width: 100%;
}
.el-button {
  width: 70px;
  height: 40px;
  font-size: 14px;
  border-color: white;
  background-color: rgba(0, 0, 0, 0);
}
.login .el-button:hover {
  background-color: rgb(39, 157, 175);
}
.user {
  position: relative;
  left: 300px;
  height: 60px;
  width: 640px;
  display: flex;
  align-items: center;
  span {
    margin-right: 15px;
    font-size: 17px;
    color: white;
    cursor: pointer;
  }
  span:hover {
    text-decoration: underline;
  }
}
.touxiang {
  width: 44px;
  height: 44px;
  background-color: white;
  border-radius: 22px;
  margin-right: 10px;
  img {
    width: 44px;
    height: 44px;
  }
}
.info {
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 18px;
  }
  margin-right: 30px;
}
.exit .el-button {
  width: 100px;
}
.exit .el-button:hover {
  background-color: rgb(39, 157, 175);
}
.search {
  height: 60px;
  width: 290px;
  margin-right: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  .search-ipt {
    height: 25px;
    margin-right: 15px;
    outline: none;
  }
  .el-button {
    width: 80px;
    height: 35px;
    padding: 0;
  }
  .searchList {
    position: absolute;
    width: 170.5px;
    height: 144px;
    background-color: #fff;
    top: 41px;
    left: 12.5px;
    border: 1px solid rgb(220, 220, 220);
    z-index: 100;
    overflow: scroll;
    div {
      width: 100%;
      font-size: 13px;
      padding: 5px;
      border-bottom: 1px solid rgb(220, 220, 220);
    }
    div:hover {
      background-color: rgb(220, 220, 220);
      cursor: pointer;
    }
  }
}
</style>
