<template>
  <div class="article">
    <ul>
      <li
        v-for="items in $store.state.articles.searchList"
        :key="items.id"
        class="arti-li"
        @click="jump(items._id)"
      >
        <img src="../../../assets/list_list.png" alt="" />
        <div class="content">
          <h2 class="liTitle">{{ items.title }}</h2>
          <p>{{ items.body }}</p>
          <div>
            <a href=""><i class="el-icon-location"></i>关于我</a>
            <a href=""><i class="el-icon-chat-round"></i>123</a>
            <span href=""
              ><i class="el-icon-timer"></i>{{ items.updatedAt }}
            </span>
          </div>
        </div>
      </li>
    </ul>

    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <el-pagination
          v-show="tol === 0 ? false : true"
          background
          layout="prev, pager, next"
          @current-change="changePage"
          :current-page="current"
          :total="tol"
        >
        </el-pagination>
        <div class="noRes" v-show="tol === 0 ? true : false">
          对不起,没有对应的搜索结果
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Article",
  props: ["searchList","name"],
  data() {
    return {
      limit: 9,
      current: 1,
    };
  },
  mounted() {
    this.changePage();
  },
  computed: {
    artiList() {
      return this.$store.state.articles.articleList;
    },
    tol() {
      return this.$store.state.articles.searchCount;
    },
  },
  methods: {
    // async getList() {
    //       const res = await this.$store.dispatch("searchArticle", {
    //         keyword: this.name,
    //         limit: this.limit,
    //         current: this.current - 1,
    //       });
    //       this.searchlist = res.searchlist;
    // },
    changePage(val = 1) {
      this.current = val;
      console.log(this.current);
      this.$emit("changePage", {
        limit: this.limit,
        current: Number.parseInt(this.current) - 1,
      });
      // 返回顶部
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    },
    jump(id) {
      this.$router.push({ path: `/detail`, query: { id ,name:this.name,keyword:this.$route.query.keyword}});
    },
  },
};
</script>

<style lang="less" scoped>
.article {
  width: 100%;
  height: 1600px;
  background: linear-gradient(limegreen, transparent),
    linear-gradient(90deg, skyblue, transparent),
    linear-gradient(-90deg, coral, transparent);
  background-blend-mode: screen;
  padding: 20px;

  overflow: hidden;
}
li {
  display: flex;
  width: 100%;
  height: 150px;
  padding: 10px;
  border-radius: 20px;
  background-color: rgba(224, 219, 219, 0.7);
  list-style: none;
  transition: 0.3s;
  margin-bottom: 20px;
  display: flex;
  position: relative;
  align-items: center;
  cursor: pointer;
  animation: showin 0.9s ease;
  img {
    width: 130px;
    height: 130px;
  }
  .content {
    height: 120px;
    width: 100%;
    margin-left: 15px;
    border-left: 2px solid rgb(8, 177, 244);
    padding: 0 15px;
    h2 {
      margin-bottom: 10px;
      color: rgb(7, 156, 176);
    }
    p {
      height: 36px;
      margin-bottom: 20px;
      width: 550px;
      font-size: 15px;
      color: rgb(120, 144, 156);
      display: -webkit-box;
      -webkit-line-clamp: 2; /* 行数 */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    div {
      font-size: 14px;
      a {
        margin-right: 15px;
        color: rgb(36, 94, 118);
      }
      a:hover {
        text-decoration: underline;
      }
    }
  }
}
li:hover {
  transform: scale(1.02);
  box-shadow: 5px 5px 10px 1px #e1e0dd;
}
@keyframes showin {
  from {
    left: -790px;
  }
  to {
    left: 0;
  }
}
.liTitle:hover {
  text-decoration: underline;
}
.noRes {
  font-size: 30px;
  margin-top: 50px;
  color: #5c5b5a; 
}
</style>