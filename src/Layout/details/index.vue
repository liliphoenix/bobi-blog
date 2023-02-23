<template>
  <div>
    <!-- <stars></stars> -->
    <Nav></Nav>
    <!-- <audio src="../../assets/1.mp3" autoplay loop ></audio> -->
    <div class="detailBody">
      <div class="content">
        <el-row :gutter="24">
          <el-col :span="16"
            ><div class="grid-content bg-purple leftside">
              <div class="recorf">这是唱片机</div>
              <h1>{{ details.title }}</h1>
              <div class="otherInfo">
                <div>
                  <a href=""><i class="el-icon-location"></i>关于我</a>
                  <a href=""><i class="el-icon-chat-round"></i>123</a>
                  <span href=""><i class="el-icon-timer"></i>2023-1-12</span>
                  <span href=""
                    ><i class="iconfont icon-xihuan"></i
                    >{{ details.favoritesCount }}</span
                  >
                </div>
              </div>
              <div
                class="articlebody"
                ref="articlebody"
                v-html="details.body"
              ></div>
              <div class="favorite">
                <div>
                  <span><i class="iconfont icon-xihuan1"></i></span>
                </div>
                <span>喜欢就点一下吧</span>
              </div>
              <div class="comment">
                <h2>在这里畅所欲言</h2>
                <div class="inptComment">
                  <div class="touxiang">
                    <img :src="userImg" alt="" />
                  </div>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    v-model="text"
                  
                  ></textarea>
                  <el-button  type="primary" @click="addComments"
                    >发布<i class="el-icon-upload el-icon--right"></i
                  ></el-button>
                </div>
                <ul class="commentArea">
                  <li v-for="(items, index) in comments" :key="index">
                    <comment :commentBody="items"></comment>
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
          <el-col :span="8" class="rightside">
            <div class="log">
              <h3>目录</h3>
              <div
                v-for="item in logList"
                :key="item.id"
                :class="{
                  title1: item.pid === 0,
                  title2: item.pid === 1,
                  title3: item.pid === 2,
                  title4: item.pid === 3,
                  title5: item.pid === 4,
                  title6: item.pid === 5,
                  active: item.flag === isActive,
                }"
                :id="item.id"
                @click="showStyle(item, item.id)"
              >
                {{ item.content }}
              </div>
            </div>
            <Introduce></Introduce>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../../components/Nav";
import Title from "../../components/Title";
import ball from "../../components/ball";
import comment from "../../components/comment";
import stars from "../../components/stars";
import Recommend from "../../components/Recommend";
import Introduce from "../Main/introduce";
import { mapState } from "vuex";
import Vue from "vue";
import $ from "jquery"
// import '../../assets/1.mp3'
export default {
  components: {
    Nav,
    Title,
    ball,
    comment,
    stars,
    Recommend,
    Introduce,
  },
  data() {
    return {
      starsCount: 800, //数量
      distance: 600, //间距
      details: {},
      text: "",
      logList: [],
      isActive: 0,
    };
  },
  mounted() {
    this.getDetail();
    console.log(window.innerWidth);
    this.getElement();
  },
  methods: {
    async getDetail() {
      let detail = null;
      try {
        detail = await this.$store.dispatch("getdetails", this.$route.query);
      } catch (error) {}
      this.details = detail.article;
      this.getcomments();
    },
    async addComments() {
      if(!sessionStorage.getItem("token")){
        this.$alert('您还没有登录，请登录', '登录', {
          confirmButtonText: '确定',
          callback:action=>{
            this.$router.push("/login")
          }
        });

      }else{
        if (this.text.trim() == "") {
        this.$message({
          message: "输入内容不能为空",
          type: "warning",
        });
      } else {
        console.log(this.articleDetail);
        try {
          await this.$store.dispatch("addComments", {
            id: this.articleDetail._id,
            body: this.text,
          });
          this.text = "";
          this.getcomments();
        } catch (error) {
          console.log(error.message);
        }
      }
      }
    },
    async getcomments() {
      console.log(123);
      try {
        await this.$store.dispatch("getComments", {
          id: this.articleDetail._id,
        });
      } catch (error) {
        console.log(error.message);
      }
    },

    getElement() {
      setTimeout(() => {
        let count = 0;
        let arr = [];
        const thisa = this;
        function makeList() {
          for (let i of thisa.$refs.articlebody.children) {
            let arrItem = {};
            arrItem.flag = 1;
            arrItem.id = ++count;
            if (i.nodeName == "H1") {
              (arrItem.content = i.textContent),
                (arrItem.pid = 0),
                arr.push(arrItem);
            }
            if (i.nodeName == "H2") {
              (arrItem.content = i.textContent),
                (arrItem.pid = 1),
                arr.push(arrItem);
            }
            if (i.nodeName == "H3") {
              (arrItem.content = i.textContent),
                (arrItem.pid = 2),
                arr.push(arrItem);
            }
            if (i.nodeName == "H4") {
              (arrItem.content = i.textContent),
                (arrItem.pid = 3),
                arr.push(arrItem);
            }
            if (i.nodeName == "H5") {
              (arrItem.content = i.textContent),
                (arrItem.pid = 4),
                arr.push(arrItem);
            }
            if (i.nodeName == "H7") {
              (arrItem.content = i.textContent),
                (arrItem.pid = 5),
                arr.push(arrItem);
            }
          }
        }
        makeList();
        // function list2tree(arr) {
        //   let map = {};
        //   let newArr = [];
        //   //先根据pid排个序,,这是个树形结构,pid越小说明越上层,
        //   arr.sort((a, b) => a.pid - b.pid);
        //   for (let obj of arr) {
        //     map[obj.id] = obj;
        //     if (obj.pid === 0) {
        //       newArr.push(obj);
        //     } else {
        //       if (map[obj.pid].children) {
        //         map[obj.pid].children.push(obj);
        //       } else {
        //         map[obj.pid].children = [obj];
        //       }
        //     }
        //   }
        //   return newArr;
        // }
        arr[0].flag = 0;
        this.logList = arr;
      }, 2000);
    },
    // 点击后添加样式
    showStyle(item, id) {
      this.logList.forEach((e) => {
        e.flag = 1;
      });
      item.flag = 0;
      let top = $(document).scrollTop()
      const distance =$("#"+id).offset().top;
      console.log(distance);

      window.scroll({
        top:distance, //y 上线
        left:0,//x 左右
        behavior:'smooth',//属性值：默认值auto（相当于instant）、平滑滚动smooth、瞬间滚动instant
      });
    },
  },
  computed: {
    articleDetail() {
      return this.$store.state.articles.articleDetail.article;
    },
    comments() {
      return this.$store.state.articles.comments.reverse();
    },
    userImg() {
      return sessionStorage.getItem("image");
    },
  },
};
</script>

<style lang="less" scoped>
// 正文效果
.detailBod .articlebody ol li {
  color: #821b1b;
}
.detailBody {
  position: relative;
  top: -1px;
  height: 3000px;
  background-color: #eef2f5;
}
.bgc {
  height: 300px;
  width: 100%;
  position: relative;
  top: -1px;
  img {
    height: 300px;
    width: 100%;
  }
}
.content {
  margin: 0 50px 0px 50px;
  width: 1400px;
  height: 2000px;
  padding: 10px;
  background-color: rgb(255, 255, 255);
  box-shadow:  0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  top: 100px;
}
.leftside {
  padding: 20px;
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  .otherInfo {
    div {
      margin-bottom: 10px;
      a,
      span {
        color: #0090ef;
        i {
          margin-right: 5px;
        }
        margin-right: 20px;
      }
      .icon-xihuan {
        color: rgb(228, 118, 118);
      }
    }
    border-bottom: 1px dashed black;
  }
  .articlebody {
    margin-top: 20px;
    border: 15px solid transparent;

    padding: 2rem;
    p {
      word-break: break-all;
      text-indent: 2em;
      font-size: 20px;
      line-height: 30px;
    }
  }
  .favorite {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: rgb(254, 143, 161);
    font-size: 17px;

    margin-top: 30px;
    div {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      border: 3px solid rgb(254, 143, 161);
      text-align: center;
      line-height: 60px;
      margin-bottom: 10px;
      cursor: pointer;
      .icon-xihuan1 {
        font-size: 40px;
      }
    }
  }
  .comment {
    width: 100%;
    margin-top: 50px;
    border-top: 1px dashed black;
    h2 {
      margin-top: 20px;
      text-align: center;
    }
    .inptComment {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 70px;
      .touxiang {
        width: 60px;
        height: 60px;
        border-radius: 30px;
        margin-right: 20px;
        background-color: rgb(255, 255, 255);
        img {
          width: 60px;
          height: 60px;
        }
      }
      textarea {
        width: 600px;
        height: 70px;
        resize: none;
        background-color: rgb(250, 250, 250);
        outline: none;
        border: 1px solid rgb(64, 158, 255);
        font-size: 16px;
        padding: 5px;
      }
      .el-button {
        height: 70px;
      }
    }
  }
  .commentArea {
    width: 100%;
    height: 1000px;
    margin-top: 50px;
    padding: 0 30px;
    list-style: none;
    li {
      margin-top: 20px;
    }
  }
  .rightside {
    background-color: rgb(82, 41, 41);
  }
}
.rightside {
  position: relative;
  top: -10px;
  padding-left: 30px;
  padding-bottom: 20px;
  padding-top: 20px;
  background-color: #fefefe;
}
.detailBody :deep(pre) {
  padding: 0.8rem !important;
  margin: 1rem 0 !important;
  background: rgb(40, 44, 52);
  overflow: auto;
  border-radius: 0.35rem;
  tab-size: 4;
}
.detailBody :deep(pre::before) {
  content: "";
  height: 16px;
  margin-bottom: 0;
  display: block;
}

.detailBody :deep(code) {
  padding: 1px 5px;
  font-family: Inconsolata, Monaco, Consolas, "Courier New", Courier, monospace;
  font-size: 0.91rem;
  color: #f3f0ee;

  border-radius: 2px;
}
.detailBody :deep(pre code) {
  padding: 0;
  color: #e8eaf6;
  background-color: rgb(40, 44, 52);
  position: relative;
  display: block;
}
.articlebody:deep(h1){
  font-size: 1.6rem;
  text-align: center;
  margin-top: 3rem;
}

.articlebody {
  font-family: Arial, Helvetica, sans-serif;
}

.log {
  width: 25vw;
  box-shadow:  0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: rgb(255, 255, 255);
  margin-bottom: 2rem;
  padding: 1rem 1rem 1rem;
  h3 {
    width: 25vw;
    height: 8vh;
    display: block;
    font-size: 1.3rem;
  }
  h3::after {
    content: " ";
    display: block;
    width: 20vw;
    height: 2px;
    margin-top: 1rem;
    background-color: rgba(155, 212, 243, 0.4);
    transition: all 0.2s;
  }
  div {
    height: 5.5vh;
    width: 22vw;
    font-size: 1.1rem;
    padding: 0.04rem 0.2rem 0;
    display: flex;
    align-items: center;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s;
  }
  div:hover {
    background-color: rgba(240, 240, 240, 0.6);
  }
  .active {
    color: rgb(9, 163, 198);
  }
  .active::before {
    content: "";
    display: block;
    width: 5px;
    height: 20px;
    border-radius: 0 50% 50% 0 /0 50% 50% 0;
    margin-right: 0.6rem;
    background-color: rgb(9, 163, 198);
  }
  .title1 {
  }
  .title2 {
    text-indent: 1em;
  }
  .title3 {
    text-indent: 2em;
  }
  .title4 {
    text-indent: 3em;
  }
  .title5 {
    text-indent: 4em;
  }
}
</style>

