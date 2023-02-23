<template>
  <div>
    <div class="introduce">
      <div class="touxiang">
        <div class="image">
          <img src="../../../assets/1.jpeg" alt="" />
        </div>
      </div>
      <div class="self">
        <p>
          博比本人19岁(2023),现在是一名大二的学生，平时喜欢的东西还是很广泛的，最喜欢的还是打代码(for
          real??)
        </p>
      </div>
    </div>
    <div class="target">
      <h4>相关文章</h4>
      <ul>
        <li>H5新增特性</li>
        <li>mongoose中populate映射对象数组</li>
        <li>mongodb中使用base64编码来储存图片</li>
        <li>前后端接口对接</li>
        <li>express适用于前端人员的接口编写</li>
        <li>在独立开发项目学到的东西</li>
      </ul>
      <h4 class="bottom"></h4>
      <div class="otherLink">
        <div class="box">
          <div>Vue2.js</div>
          <div>node.js</div>
          <div>express.js</div>
          <div>mongoose.js</div>
          <div>mongodb</div>
          <div>vuex</div>
        </div>
        <div class="midline"></div>
        <div class="leftline"></div>
        <div class="rightline"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogIndex",

  data() {
    return {};
  },

  mounted() {
  },

  methods: {
  },
};
</script>

<style lang="less" scoped>
.introduce {
  width: 100%;
  height: 200px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .touxiang {
    width: 100%;
    height: 130px;
    background-color: rgba(123, 223, 246, 0.447);
    display: flex;
    justify-content: center;
    align-items: center;
    .image {
      width: 100px;
      height: 100px;
      background-color: #fff;
      border-radius: 50px;
      overflow: hidden;
      img {
        width: 100px;
        height: 100px;
      }
    }
  }
}
.self {
  font-size: 14px;
  text-align: center;
  padding: 10px;
}
.target {

  width: 100%;
  height: 400px;
  background-color: rgb(255, 255, 255);
  margin-top: 40px;
  top: 40px;
  box-shadow:0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px 30px 0 30px;
  h4 {
    text-align: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(195, 236, 238);
    color: rgb(92, 189, 221);
  }
  li {
    list-style: none;
    font-size: 14px;
    margin-bottom: 5px;
    color: rgb(35, 200, 178);
    cursor: pointer;
  }
  li:before {
    content: " ";
    display: inline-block;
    position: relative;
    top: -2.5px;
    right: 5px;
    width: 4px;
    height: 4px;
    border-radius: 2px;
    background-color: rgb(188, 239, 208);
  }
  li:hover {
    text-decoration: underline;
  }
  .bottom{
  margin-bottom: 0px;
}
}

.otherLink {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  .box {
    display: flex;
    flex-wrap: wrap;
    div {
      width: 104px;
      height: 80px;
      background-color: rgba(92, 189, 221,.6);
      color: rgb(10, 10, 10);
      margin-right: 10px;
      margin-top: 10px;
      text-align: center;
      line-height: 80px;
    }
  }
  .midline {
    width: 230px;
    height: 3px;
    background-color: rgb(126, 190, 165);
    position: absolute;
    top: 94px;
    left: 50px;
  }
  .leftline {
    height: 100px;
    width: 3px;
    background-color: rgb(126, 190, 165);
    position: absolute;
    left: 108px;
    top: 50px;
  }
  .rightline {
    height: 100px;
    width: 3px;
    background-color:rgb(126, 190, 165);
    position: absolute;
    left: 222px;
    top: 50px;
  }
}
</style>