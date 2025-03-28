<!-- 此组件用于主界面中内容区显示 -->
<template>
    <div>
        <router-view></router-view>
    </div>
    
</template>

<script>



export default{
    name:'MainArea',
    components:{
        
    },
    created:function(){
        // 一般在此网络请求
        // console.log("App组件被创建了!")
        // this.$axios.get(this.$store.state.baseUrl1+"/hello").then(function(response){
        //     console.log(response)
        // })
    },
    mounted:function(){
        //console.log("App被挂载完毕!")
    }
}


</script>

<style>

</style>