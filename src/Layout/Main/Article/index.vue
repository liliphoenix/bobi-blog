<template>
  <div class="article">
    <ul>
      <li v-for="items in artiList" :key="items.id" class="arti-li" @click="jump(items._id)">
        <img src="../../../assets/list_list.png" alt="" />
        <div class="content">
          <h2 class="liTitle">{{ items.title }}</h2>
          <p>{{ items.body }}</p>
          <div >
            <a href=""><i class="el-icon-location"></i>关于我</a>
            <a href=""><i class="el-icon-chat-round"></i>123</a>
            <span href=""><i class="el-icon-timer"></i>{{items.updatedAt}} </span>
            <span class="editor" @click="linkto(items._id)" ><i class="el-icon-edit"></i>编辑文章</span>  
          </div>
        </div>
      </li>
    </ul>

    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8"
        ><el-pagination
          background
          layout="prev, pager, next"
          @current-change="changePage"
          :current-page="current"
          :total="tol"
        >
        </el-pagination
      ></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Article",

  data() {
    return {
      limit: 9,
      current: 1,
      articleList:[]
    };
  },

  mounted() {
    this.getList();
  },
  computed: {
    artiList() {
      return this.$store.state.articles.articleList;
    },
    tol() {
      return this.$store.state.articles.artCount;
    },
  },
  methods: {
    async getList() {
      const res=await this.$store.dispatch("getArticle", {
        limit: this.limit,
        current: this.current - 1,
      });
      console.log(res);
    },
    changePage(val) {
      this.current = val;
      console.log(this.current);
      this.getList();
    },
    jump(id){
      console.log(id);
      this.$router.push({path:"/detail",query:{id}})
    },
    linkto(id){
      this.$router.push({path:"/life",query:{id}})
    }
  },
};
</script>

<style lang="less" scoped>
.article {
  width: 100%;
  height: 1600px;
  background-color: white;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
li {
  display: flex;
  width: 100%;
  height: 150px;
  padding: 10px;
  border-radius: 20px;
  background-color: rgba(224, 219, 219, 0.3);
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
      a:hover{
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
.liTitle:hover{
  text-decoration: underline;
}
.editor{
  margin-left: 1.4rem;
  i{
    margin-right: .5rem;
  }
}
.editor:hover{
  text-decoration: underline;
}
</style>