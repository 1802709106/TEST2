<template>
    <div class="signin-form">
        <h3 class="sign-title">数控机床关键部件状态监测与故障诊断系统</h3>
        <div>
            <el-form>

                <el-form-item prop="username">
                    <el-input
                            v-model="user_name"
                            autocomplete="off"
                            placeholder="用户名"
                            prefix-icon="el-icon-user-solid"
                    ></el-input>
                </el-form-item>

                <el-form-item>
                    <el-input
                            type="password"
                            v-model="user_password"
                            autocomplete="off"
                            placeholder="请输入密码"
                            prefix-icon="el-icon-lock"
                    ></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button @click="loginIn" style="text-align: center;">登录</el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import MainArea from "./MainArea.vue"
import {instance1, instance2} from './axiosInstances.js'

export default{
 name:"Login",
 components:{
    MainArea
 },
 props:{
    changeShow:{
        type:Function
    }
 },
 data:function(){
     return {
        user_name:'',
        user_password:'',
     }
 },
 methods:{
     loginIn(){
        var vm = this
        if(this.user_name==""||this.user_password==""){
                return
        }
        var params = new URLSearchParams()
        params.append('user_name',this.user_name)
        params.append('user_password',this.user_password)
        instance1.post('/login/user/login', params).then((response)=>{
            if(response.status==200){
                //将token和user保存到localStorage中
                if(response.data==="flase_login"){
                    alert("账号密码输入错误或用户状态不正常！")
                }else{
                    vm.$store.commit('setToken',response.data)
                    vm.$store.commit('setUsername',this.user_name)
                    var params2 = new URLSearchParams()
                    params2.append('user_name',this.user_name)
                    instance1.post('/login/user/getuserinfo', params2).then((response2)=>{
                        this.$store.state.user_id = response2.data.user_id
                        this.$store.state.user_name = response2.data.user_name
                        this.$store.state.manager = response2.data.manager
                        this.$store.state.user_tel = response2.data.user_tel
                        this.$store.state.state = response2.data.state
                    })
                    if(localStorage.getItem("username")!=null&&localStorage.getItem("token")!=null){
                        this.$store.commit('setShow',false)
                    }
                    this.$store.state.show=false
                }
            }else{
                alert("系统错误！")
            }
        })

     },
 }
} 

</script>


<style>

/* 基础样式，适用于所有屏幕 */
.signin-form {
  border: 2px dashed rgba(128, 133, 134, 0.5);
  position: absolute;
  top: 35%;
  left: 30%;
  width: 850px;
  height: 350px;
  margin: -50px 0 0 -50px;
  border-radius: 15px;
}

.sign-title {
  font-size: 40px;
  font-family: 'Courier New', Courier, monospace;
}

body, html {
  background-color: #E9EEF3;
  margin: 0; /* 移除默认的外边距 */
  height: 100%; /* 设置body和html的高度为100%，以确保绝对定位的元素能够正确计算位置 */
}

/* 为手机屏幕添加媒体查询 */
@media screen and (max-width: 768px) {
  .signin-form {
    width: 90%; /* 使用百分比宽度，使登录框宽度适应屏幕 */
    height: auto; /* 高度自动调整 */
    top: 20%; /* 调整顶部位置，使登录框在手机屏幕上居中 */
    left: 5%; /* 调整左侧位置，使登录框在手机屏幕上居中 */
    margin: 0; /* 移除负边距 */
    padding: 20px; /* 添加内边距，使内容不紧贴边框 */
  }

  .sign-title {
    font-size: 10px; /* 减小字体大小，以适应手机屏幕 */
  }
}

</style>