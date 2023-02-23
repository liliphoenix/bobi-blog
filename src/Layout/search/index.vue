<template>
  <div class="search-body">
    <Nav>
      <div style="width: 400px;"></div>
    </Nav>
    <div class="search-box">
      <div class="input-box">
        <input
          type="text"
          @keydown.enter="search"
          name=""
          v-model="name"
          id="name"
          placeholder="按回车检索"
        />
      </div>
    </div>
    <div class="search">
      <Article :searchList="searchlist" :name="name" @changePage="changePage">
      </Article>
    </div>
  </div>
</template>

<script>
import Nav from "../../components/Nav";
import Article from "./Article";
import Title from "../../components/Title";

export default {
  components: {
    Article,
    Title,
    Nav,
  },
  data() {
    return {
      name: '',
      searchlist: [],
      limit:9,
      current:1,
      bus:""
    };
  },
  mounted() {
    this.name=this.$route.query.keyword
    this.$route.query.keyword=''
    this.search();
  },
  beforeDestroy(){

  },
  methods: {
    async search(limit,current) {
      console.log(limit);
          const res = await this.$store.dispatch("searchArticle", {
            keyword: this.name,
            limit:this.limit,
            current:this.current
          });
          this.searchlist = res.searchlist;
    },
    changePage({limit,current}){
      this.limit=limit
      this.current=current
      this.search()
    }
  },
  computed: {
  },
  watch: {
    name() {
      sessionStorage.setItem('keyword',this.name)
      this.name = sessionStorage.getItem("keyword")
        let timeout;
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
          this.search()
        }, 500)
  }
}}
</script>

<style lang="less" scoped>
input {
  border: none;
  outline: none;
  width: 950px;
  height: 40px;
  margin-bottom: 50px;
  font-size: 16px;
  line-height: 20px;
  background-color: transparent;
  font-size: 30px;
}

.search-body {
  background: linear-gradient(limegreen, transparent),
    linear-gradient(90deg, skyblue, transparent),
    linear-gradient(-90deg, coral, transparent);
  background-blend-mode: screen;
}
.search {
  padding: 0 100px;
  margin-top: 100px;
}
.search-box {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  .input-box {
    margin-top: 170px;
    label {
      font-size: 25px;
    }
    position: relative;
  }

  .input-box::after {
    content: " ";
    display: block;
    width: 950px;
    height: 3px;
    position: relative;
    top: -40px;
    left: -10px;
    background: #a217dd;
  }
  .input-box:focus-within::after {
    animation: showBorder 0.5s linear forwards, colorChange 0.5s linear forwards;
  }
  .input-box::after label {
    font-size: 19px;
    margin-right: 20px;
    color: rgb(19, 95, 85);
  }
  .input-box input {
    color: rgb(9, 115, 43);
  }

  @keyframes showBorder {
    from {
      width: 0px;
    }
    to {
      width: 950px;
    }
  }
  @keyframes colorChange {
    from {
      background: #00dbde;
    }
    50% {
      background: #fc00ff;
    }
    to {
      background: linear-gradient(to right, #00dbde, #fc00ff);
    }
  }
}
</style>