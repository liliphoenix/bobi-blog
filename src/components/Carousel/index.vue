<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16"
        ><div class="grid-content bg-purple">
          <el-carousel :interval="4000" type="card" height="300px">
            <el-carousel-item v-for="(item,index) in imglist" :key="index">
              <img :src="item.url" alt="" class="carousel">
            </el-carousel-item>
          </el-carousel>
        </div></el-col
      >
      <el-col :span="7">
        <Recommend></Recommend>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Recommend from "../Recommend"
export default {
  components:{
    Recommend
  },
  data(){
    return{
      imglist:[
        {
          url:require("../../assets/1.jpg")
        },
        {
          url:require("../../assets/2.jpg")
        },
        {
          url:require("../../assets/3.jpg")
        },
        {
          url:require("../../assets/4.jpg")
        },

      ]
    }
  }
};
</script>

<style>

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.carousel{
  width: 436px;
  height: 298px;

}
/*  */
</style>