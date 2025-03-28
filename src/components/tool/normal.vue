<template>
    <div>
        <div>
            <span v-if="status==0" style="background-color: yellow; padding: 3px 10px; border-radius: 4px;">
                未采集
            </span>
            <span  v-if="status==1" style="background-color: rgb(168, 255, 168); padding: 3px 10px; border-radius: 4px;" >
                正常
            </span>
            <span v-if="status==-1" style="background-color: rgb(255, 79, 79); padding: 3px 10px; border-radius: 4px;">
                异常
            </span>  
        </div>
        
    </div>
</template>

<script>

export default{
    name:'normal',
    props:{
        "status":Number,
    },
    data(){
        return{

        }
    }
}
    

</script>

<style>
</style>