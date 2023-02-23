<template>
  <div class="com-all" >
    <div class="touxiang">
      <img :src="commentBody.author.image" alt="">
    </div>
    <div class="content">
      <span class="name">{{ commentBody.author.username }}</span>
      <span class="com-body">{{commentBody.body }}</span>
      <div class="com-info">
        <span href=""><i class="iconfont icon-xihuan"></i>123</span>
        <span href=""><i class="el-icon-timer"></i>2023-1-12</span> 
      </div>
    </div>
  </div>
</template>

<script>
export default {  
  props:['commentBody'],
};
</script>

<style lang="less" scoped>
.com-all {
  display: flex;

  .touxiang {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-right: 20px;
    background-color: rgb(255, 255, 255);
    img{
      width: 40px;
    height: 40px;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    line-height: 30px;
    .name {
      font-size: 16px;
    }
    .com-body {
      font-size: 20px;
    }
    .com-info {
      font-size: 16px;
      span{
        margin-right: 20px;
        i{
          margin-right: 5px;
        }
      }
    }
  }
}
</style>