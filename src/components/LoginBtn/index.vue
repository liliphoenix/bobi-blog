<template>
  <div>
    <el-popover
      placement="left-start"
      title="还没登录？点击登录"
      width="1"
      trigger="hover"
    >
      <div class="loginBtn" @mouseover="showLink" @mouseout="isShow = !isShow" slot="reference" @click="jump">
        <div class="mask" v-show="isShow"></div>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "BlogIndex",

  data() {
    return {
      isShow: false,
    };
  },

  mounted() {},

  methods: {
    showLink() {
      this.isShow = true;
    },
    jump(){
        this.$router.push({path:"/login"})
    }
  },
};
</script>

<style lang="less" scoped>
.loginBtn {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  position: fixed;
  top: 600px;
  right: 20px;
  background: url("../../assets/1.jpeg") no-repeat;
  background-size: cover;
  text-align: center;
  line-height: 80px;
  font-size: 25px;
  color: rgb(59, 54, 54);
  overflow: hidden;
  cursor: pointer;
  .mask {
    height: 200px;
    width: 200px;
    background-color: rgba(0, 0, 0, 0.2);
  }
}
.el-popover__reference-wrapper{
    color:red
}
</style>