<template>
    <div class="recommend">
        <!-- 标题 排行榜-->
        <div class="title"><h3><i class=" iconfont icon-fire"></i>文章热度排行</h3><a href=""><span class=" more">更多</span><i class="more iconfont icon-you-jiantou"></i></a></div>
        
        <!-- 榜单 -->
        <ul>
            <li>
                
                <img src="../../assets/奖杯6-1.png" alt="">
                <div class="item">
                    <span>xxxx</span>
                    <a href=""><i class="more iconfont icon-you-jiantou"></i></a>
                </div>
            </li>
            <li>
                <img src="../../assets/奖杯6-2.png" alt="">
                <div class="item">
                    <span>xxxx</span>
                    <a href=""><i class="more iconfont icon-you-jiantou"></i></a>
                </div>
            </li>
            <li>
                <img src="../../assets/奖杯6-3.png" alt="">
                <div class="item">
                    <span>xxxx</span>
                    <a href=""><i class="more iconfont icon-you-jiantou"></i></a>
                </div>
            </li>
            <li>
                <img src="../../assets/奖杯6-3.png" alt="">
                <div class="item">
                    <span>xxxx</span>
                    <a href=""><i class="more iconfont icon-you-jiantou"></i></a>
                </div>
            </li>
            <li>
                <img src="../../assets/奖杯6-3.png" alt="">
                <div class="item">
                    <span>xxxx</span>
                    <a href=""><i class="more iconfont icon-you-jiantou"></i></a>
                </div>
            </li>
            <li>
                <img src="../../assets/奖杯6-3.png" alt="">
                <div class="item">
                    <span>xxxx</span>
                    <a href=""><i class="more iconfont icon-you-jiantou"></i></a>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'BlogIndex',
    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="less" scoped>
.recommend{
  width: 100%;
  height: 300px;
  padding: 20px 20px;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); 
}
.title{
    border-bottom: 1px solid rgb(240, 240, 242);
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content:space-between;
}
.more{
    color:rgb(162, 162, 164);
    font-size: 13px;
}

h3 i{
    font-size: 16px;
    margin-right: 7px;
    color:red
}

li{
    display: flex;
    align-items: center;
    list-style: none;

}
li span{
    font-size:20px;
}
.item{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content:space-between;
}
img{
    width: 40px;
    height: 40px;
}
</style>