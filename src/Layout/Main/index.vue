<template>

<div>
  <Nav></Nav>
  <div class="block">
    <Carousel></Carousel>
    <Title></Title>
    <div class="under-block">
        <el-row :gutter="50">
      <el-col :span="15"><div class="grid-content bg-purple">
        <Article></Article>
      </div></el-col>
      <el-col :span="8" ><div class="grid-content bg-purple">
        <Introduce></Introduce>
      </div></el-col>
    </el-row>
    </div>
  </div>
  <LoginBtn></LoginBtn>
  <Footer></Footer>
</div>
</template>

<script>
import Nav from "../../components/Nav"
import Carousel from "../../components/Carousel";
import Article from "./Article"
import Title from "../../components/Title"
import Introduce from "./introduce"
import LoginBtn from "../../components/LoginBtn"
import Footer from "../../components/Footer"
export default {
  components: {
    Nav,Carousel,Article,Title,Introduce,LoginBtn,Footer
  },
  created(){

  }
};
</script>

<style lang="less" scoped>
.block {
  padding: 0 100px;
  margin-top: 20px;
}
.under-block{
    margin-top: 20px;
}
</style>