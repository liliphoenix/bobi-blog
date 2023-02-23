<template>
  <div>
    <Nav></Nav>
    <div style="border: 1px solid #ccc">
      <div>
        <label for="">文章标题</label><el-input v-model="title"></el-input>
      </div>
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="html"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="onCreated"
      />
    </div>
    <el-button type="primary" @click="submited">更新文章</el-button>
  </div>
</template>

<script>
import Nav from "../../components/Nav";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
export default {
  name: "BlogIndex",
  components: {
    Nav,
    Editor,
    Toolbar,
  },
  data() {
    return {
      editor: null,
      html: "<p>输入你想要的内容吧</p>",
      toolbarConfig: {},
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default", // or 'simple',
      title: "",
      details:""
    };
  },
  methods: {
    async getDetail() {
      console.log(1);
      let detail = null;
      try {
        detail = await this.$store.dispatch("getdetails", this.$route.query);
      } catch (error) {

      }
      this.details = detail.article;
      this.title=detail.article.title
      this.html=detail.article.body
    },
    onChange(editor) {
      this.$store.commit("changeTitle", this.title);
      this.$store.commit("changeHtml", editor.getHtml());
    },
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    async submited() {
      try {
        const item = {
          article: {
            title: this.title,
            body: this.html,
            description: "hhh",
          },
        };
        const id=this.$route.query
        console.log(item);
        await this.$store.dispatch("updateArticle", [item,id]);
      } catch (error) {
        if (error.response.status === 401) {
          this.$message({
            message: error.response.data,
            type: "warning",
          });
          this.$router.push("/login");
        }

      }
    },
  },
  mounted() {
    this.getDetail()
    // 模拟 ajax 请求，异步渲染编辑器
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>

<style lang="less" scoped>
.editor {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.el-button {
  margin-top: 1rem;
  width: 14rem;
  height: 3.2rem;
  margin-bottom: 3rem;
  position: relative;
  left: 40rem;
}
label {
  margin-left: 2rem;
  font-size: 1.3rem;
  color: rgb(4, 42, 38);
}
.el-input {
  width: 70vw;
  margin: 1rem 1rem;
}
</style>
<style src="@wangeditor/editor/dist/css/style.css"></style>
