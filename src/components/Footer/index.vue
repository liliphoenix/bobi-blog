<template>
  <div class="footer" :style="{background:'rgb('+bgc+')'}">
    <span
      >波比的个人博客,京ICP备xxxxxx号 经营性网站备案信息
      公安备案号xxxxxxxxxxxxxxxxx</span
    >
    <div class="bottom-con">
      <ul>
        <li class="title">相关链接</li>
        <li><a href="">vue</a></li>
        <li><a href="">express</a></li>
        <li><a href="">mongoose</a></li>
      </ul>
      <ul>
        <li class="title">学习完善</li>
        <li><a href="">牛客</a></li>
        <li><a href="">稀土掘金</a></li>
        <li><a href="">csdn</a></li>
      </ul>
      <ul>
        <li class="title">面经积累</li>
        <li><a href="">yangzi大大</a></li>
        <li><a href="">山月大大</a></li>
        <li><a href="">十三大大</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "footer",
  props:{
    bgc:{
        type:String,
        default:"0, 171, 179"
    }
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.footer {
  width: 100vw;
  height: 30vh;
  background-color: rgb(0, 171, 179);
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding-left: 4rem;
  span {
    margin-top: 1rem;
    text-align: center;
  }
  .bottom-con {
    width: 30vw;
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    .title {
      color: #eae1e1;
      font-size: 1.1em;
      text-indent: 0;
      font-weight: bold;
    }
    ul {
      list-style: none;
      li {
        margin-top: 0.3rem;
        text-indent: 1em;
        font-size: 0.95em;
        a {
          color: #474545;
        }
      }
    }
  }
}
</style>