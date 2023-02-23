<template>
    <div class="title">
        <img src="../../assets/list_list.png" alt="" width="35" height="35">
        <span>我的文章</span>
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
    .title{
        width: 1300px;
        height: 50px;
        display: flex;
        align-items: center;
        border-left:3px solid #22A39F ;
        border-bottom:3px solid #22A39F ;
        padding-left: 15px;
    }
    img{
        margin-right: 15px;
    }
    span{
        font-size: 20px;
        font-weight: bold;
    }
</style>