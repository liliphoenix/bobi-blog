<template>
  <div>
    <li v-for="items in artiList" :key="items.id" class="arti-li">
        <img src="../../../assets/list_list.png" alt="" />
        <div class="content">
          <h2>{{ items.title }}</h2>
          <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
          <div>
            <a href=""><i class="el-icon-location"></i>关于我</a>
            <a href=""><i class="el-icon-chat-round"></i>123</a>
            <a href=""><i class="el-icon-timer"></i>2022.12.29 </a>
          </div>
        </div>
      </li>
  </div>
</template>

<script>
export default {
    
}
</script>

<style>

</style>