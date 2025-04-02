<!-- 本组件用于在main.vue中显示用户管理相关内容 -->

<template>
    <div>
      <div style="width: 50%; float: left;">
          <el-tabs v-model="current_page" @tab-click="change_yemian">
            <el-tab-pane label="用户管理" name="first"></el-tab-pane>
            <el-tab-pane label="公告管理" name="second"></el-tab-pane>
          </el-tabs>
      </div>

      <div v-show="current_page=='first'">
        <div style="display: flex;">
          <div>
              <download-excel class = "export-excel-wrapper" :data = "tableData"
                     :fields = "user_json_field" :name = file_name>
                  		<el-button type="primary" style="text-align: center;"> 数据导出 </el-button>
              </download-excel>
          </div>  
          <div>
              <el-button type="info" style="text-align: center;" @click="add_user">添加用户</el-button>  
          </div>
        </div>
        <div>
        <el-table
          :data="table_show_data"
          style="width: 100%"
          border
          :row-style="{height:'20px'}"
          :cell-style="{padding:'0px',color:'#606266',}"
          :header-row-style="{height:'30px'}">
          <el-table-column
            fixed
            prop="user_id"
            label="用户编号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="user_name"
            label="用户名"
            width="200">
          </el-table-column>
          <el-table-column
            prop="user_password"
            label="用户密码"
            width="200">
            <template slot-scope = "scope" style="float: left;">
              <div style="float: left; width: 60%; line-height: 57px;">
                <span v-if="passwordflag">
                    {{ falsecode }}
                </span>
                <span v-else>
                    {{ scope.row.user_password }}
                </span>
              </div>
              <div style="float: left; line-height: 57px;">
                <div class="pic" id="pic">
                  <img class="machine_pic" style=" width: 25px; margin-top: 13px;
                  border-radius: 15px; " :src="getImagePath('eyes.png')" alt="Example Image"
                  @click="show_pass">
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="manager"
            label="是否为管理员"
            width="200">
            <template slot-scope = "scope">
                {{ scope.row.manager ? "是" : "否" }}
            </template>
            
          </el-table-column>
          <el-table-column
            prop="user_tel"
            label="用户电话"
            width="200">
          </el-table-column>
          <el-table-column
            prop="state"
            label="用户状态"
            width="120">
            <template slot-scope = "scope">
                {{ scope.row.state ? "正常" : "异常" }}
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">修改用户信息</el-button>
            </template>
          </el-table-column>
        </el-table>
        </div>
         <div style="margin-top: 10px;">
           <el-pagination @current-change="el_pagination_change"
             background
             layout="prev, pager, next"
             :page-count=total_pages>
           </el-pagination>
         </div>
        <!-- 此模块用于动态修改用户信息 -->
        <div class="change_userInfo" v-if="change_info_flag">
        <div class="top_part">
          <div class="item">
            <div class="title">用户名：</div>
            <el-input v-model="current_username" placeholder="请输入内容" :disabled="true"></el-input>
          </div>
          <div class="item">
            <div class="title">用户密码：</div>
            <el-input v-model="current_userpass" placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <div class="title">是否为管理员：</div>
            <div class="switch">
              <el-switch
              v-model="current_manager"
              active-color="#13ce66"
              inactive-color="#ff4949">
              </el-switch>
            </div>
          </div>  
          <div class="item">
            <div class="title">用户电话：</div>
            <el-input v-model="current_usertel" placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <div class="title">用户状态：</div>
            <div class="switch">
              <el-switch
              v-model="current_userstate"
              active-color="#13ce66"
              inactive-color="#ff4949">
              </el-switch>
            </div>
          </div>
        </div>
        <div class="button_part">
          <el-button style="text-align: center;" @click="changeInfo()">确认修改</el-button>
          <el-button style="text-align: center;" @click="show_changeInfo">关闭窗口</el-button>
        </div>
        </div>
        <!-- 此模块用于管理员添加用户信息 -->
        <div class="change_userInfo" v-if="add_info.add_info_flag">
        <div class="top_part">
          <div class="item">
            <div class="title">用户名：</div>
            <el-input v-model="add_info.new_username" placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <div class="title">用户密码：</div>
            <el-input v-model="add_info.new_userpass" placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <div class="title">是否为管理员：</div>
            <div class="switch">
              <el-switch
              v-model="add_info.manager"
              active-color="#13ce66"
              inactive-color="#ff4949">
              </el-switch>
            </div>
          </div>  
          <div class="item">
            <div class="title">用户电话：</div>
            <el-input v-model="add_info.new_usertel" placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <div class="title">用户状态：</div>
            <div class="switch">
              <el-switch
              v-model="add_info.userstate"
              active-color="#13ce66"
              inactive-color="#ff4949">
              </el-switch>
            </div>
          </div>
        </div>
        <div class="button_part">
          <el-button style="text-align: center;" @click="adduser()">确认添加</el-button>
          <el-button style="text-align: center;" @click="add_user">关闭窗口</el-button>
        </div>
        </div>
        

      </div>
      
      <div v-show="current_page=='second'">
        <div>
            <el-button type="info" style="text-align: center;" @click="change_add_notice_flag">添加公告</el-button>  
        </div>
        <div>
          <el-table
          :data="table_data_notice"
          style="width: 100%"
          border
          :row-style="{height:'20px'}"
          :cell-style="{padding:'0px',color:'#606266',}"
          :header-row-style="{height:'30px'}">
          <el-table-column
            fixed
            prop="id"
            label="公告编号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="notice_info"
            label="公告">
          </el-table-column>
          <el-table-column
            prop="man_name"
            label="发布者"
            width="200">
          </el-table-column>
          <el-table-column
            prop="time"
            label="发布时间"
            width="350">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick_delete_notice(scope.row)" type="text" size="small">删除公告</el-button>
            </template>
          </el-table-column>
          </el-table>
        </div>
        <!-- 此模块用于管理员添加公告信息 -->
        <div class="change_userInfo" v-if="add_notice_flag">
          <div class="top_part">
            <div class="item">
              <div class="title" style="float: left;">公告内容：</div>
              <div style="float: left;">
                <el-input
                  type="textarea"
                  :rows="10"
                  placeholder="请输入内容"
                  v-model="textarea">
                </el-input>                
              </div>
            </div>
          </div>
        <div class="button_part">
          <el-button style="text-align: center;" @click="add_notice">确认添加</el-button>
          <el-button style="text-align: center;" @click="change_add_notice_flag">关闭窗口</el-button>
        </div>
        </div>
      </div>

    </div>
</template>

<script>
import axios from 'axios';
import { instance1, instance2 } from '../axiosInstances'

  export default {
    

    data:function(){
      return {

        //顶部切换
        current_page:"first",

        // 用于翻页
        tableData: [],
        page_size:12,
        total_pages:0,
        table_data_size:0,
        table_show_data:[],


        // 用于导出成员信息
        user_json_field:{
                用户编号: "user_id",
                用户姓名:"user_name",
                用户密码:"user_password",
                是否为管理员: "manager",
                用户电话:"user_tel",
                用户状态:"state",
        },

        // 用于导出文件命名
        file_name:"user_info",


        //用于动态显示密码
        passwordflag:true,
        falsecode:"*********",

        //用于动态显示修改信息界面
        change_info_flag:false,

        //用于管理员添加成员标记
        add_info:{
          add_info_flag:false,
          //用于修改用户信息时暂存信息
          new_username:"",
          new_userpass:"",
          new_manager:false,
          new_usertel:"",
          new_userstate:true,
        },

        //用于修改用户信息时暂存信息
        current_userid:0,
        current_username:"",
        current_userpass:"",
        current_manager:false,
        current_usertel:"",
        current_userstate:false,

        
        //公告信息数据区
        table_data_notice:[],
        add_notice_flag:false,
        textarea:"",

      }
    },
    methods: {
      el_pagination_change(val){
        var start = (val-1) * this.page_size
        var end = start + this.page_size
        this.table_show_data = []
        if(val==this.total_pages){
          end = start + this.table_data_size-((val-1)*this.page_size)
        }
        for(var i = start; i<end; i++){
          this.table_show_data.push(this.tableData[i])
        }

      },
      show_pass(){
        this.passwordflag = !this.passwordflag
      },
      show_changeInfo(){
        this.change_info_flag = !this.change_info_flag
      },
      handleClick(row) {
        this.current_userid = row.user_id;
        this.current_username = row.user_name;
        this.current_userpass = row.user_password;
        this.current_manager = row.manager;
        this.current_usertel = row.user_tel;
        if(row.state===1){
          this.current_userstate = true;
        }else{
          this.current_userstate = false;
        }
        this.change_info_flag = true
      },
      getImagePath(imageName) {
        return process.env.BASE_URL + imageName;
      },
      getusersInfo(){
        instance1.get('/login/user/getalluserinfo').then((response)=>{
            this.table_data_size = response.data.length
            this.total_pages = parseInt(this.table_data_size/this.page_size + 1)
            if(response.status==200){
                this.tableData = response.data
                if(this.table_data_size<this.page_size){
                  for(var i=0;i<this.table_data_size;i++){
                    this.table_show_data.push(this.tableData[i])
                  }
                }else{
                  for(var i=0;i<this.page_size;i++){
                    this.table_show_data.push(this.tableData[i])
                  }
                }
            }else{
                alert("系统错误！")
            }
        })
      },
      //此函数用于管理员修改用户信息
      changeInfo(){
        var params = new URLSearchParams()
        params.append('user_id',this.current_userid)
        params.append('user_name',this.current_username)
        params.append('user_password',this.current_userpass)
        params.append('manager',this.current_manager)
        params.append('user_tel',this.current_usertel)
        params.append('state',this.current_userstate)
        // console.log(this.current_userstate)
        instance1.post('/login/user/changeuserinfobymanager',params).then((response)=>{
            // console.log(response.data)
            if(response.status==200){
                // console.log(response.data)
                if(response.data=="sucess"){
                    this.tableData = []
                    this.table_show_data = []
                    this.getusersInfo()
                    alert("修改系统用户信息成功！")
                    this.change_info_flag = false
                    this.getCurrentTime()
                }
            }else{
                alert("系统错误！")
            }
        })
      },


      //用于管理员添加成员标记
      // add_info:{
      //     add_info_flag:false,
      //     //用于修改用户信息时暂存信息
      //     new_username:"",
      //     new_userpass:"",
      //     new_manager:false,
      //     new_usertel:"",
      //     new_userstate:true,
      //   },

      //此函数用于管理员增加新用户
      adduser(){
        var params = new URLSearchParams()
        params.append('user_name',this.add_info.new_username)
        params.append('user_password',this.add_info.new_userpass)
        params.append('manager',this.add_info.new_manager)
        params.append('user_tel',this.add_info.new_usertel)
        params.append('state',this.add_info.new_userstate)
        instance1.post('/login/user/adduser',params).then((response)=>{
            console.log(response.data)
            if(response.status==200){
                if(response.data=="fail"){
                        alert("添加用户信息存在冲突，请重试！")
                        this.change_info_flag = false
                }
                // console.log(response.data)
                if(response.data=="sucess"){
                    this.tableData = []
                    this.table_show_data = []
                    this.getusersInfo()
                    alert("添加用户信息成功！")
                    this.change_add_notice_flag = false
                    this.getCurrentTime()
                }
                this.add_info.new_username = ""
                this.add_info.new_userpass = ""
                this.add_info.new_manager = false
                this.add_info.new_usertel = ""
                this.add_info.new_userstate = true
                this.add_info.add_info_flag = false
            }else{
                alert("添加用户失败，请重新尝试！")
            }
        })
      },
      // 此函数用于获取当前时间
      getCurrentTime() {
        //获取当前时间并打印
        var _this = this;
        let yy = new Date().getFullYear();
        let mm = new Date().getMonth()+1;
        let dd = new Date().getDate();
        let hh = new Date().getHours();
        let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
        let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
        _this.gettime = '用户信息_'+yy+'/'+mm+'/'+dd+' '+hh+':'+mf+':'+ss;
        this.file_name = _this.gettime
      },
      add_user(){
        this.add_info.add_info_flag = !this.add_info.add_info_flag
      },
      change_yemian(tab, event){
        if(tab.name=="first"){
            this.current_page = "first"
        }else if(tab.name=="second"){
            this.current_page = "second"
        }else{
            console.log("error")
        }
      },
      get_all_notice(){
        instance1.get('/front/notice/getallnotice').then((response)=>{
            if(response.status==200){
                this.table_data_notice = []
                this.table_data_notice = response.data
            }else{
                alert("系统错误！")
            }
        })
      },
      handleClick_delete_notice(index, row){
        var params = new URLSearchParams()
        params.append('notice_id',index.id)
        instance1.post('/front/notice/delete_notice', params).then((response)=>{
            if(response.status==200){
                this.get_all_notice()
            }else{
                alert("系统错误！")
            }
        })
      },
      change_add_notice_flag(){
        this.add_notice_flag = !this.add_notice_flag
      },
      add_notice(){
        var _this = this;
        let yy = new Date().getFullYear();
        let mm = new Date().getMonth()+1;
        let dd = new Date().getDate();
        let hh = new Date().getHours();
        let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
        let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
        _this.gettime = yy+'/'+mm+'/'+dd+' '+hh+':'+mf+':'+ss;
        
        var params = new URLSearchParams()
        params.append('notice_info',this.textarea)
        params.append('man_id',this.$store.state.user_id)
        params.append('time',_this.gettime)
        instance1.post('/front/notice/add_notice', params).then((response)=>{
            if(response.status==200){
                this.get_all_notice()
                this.textarea=""
                this.add_notice_flag = false
            }else{
                alert("系统错误！")
            }
        })
        
      }

    },
    mounted:function(){
        this.getusersInfo()
        this.getCurrentTime()
        this.get_all_notice()

    },

  }

  
</script>

<style>

.change_userInfo{
  position: absolute;
  width: 30%;
  height: 650px;
  background-color: rgb(238, 248, 255);
  z-index:3;
	top: 50%;
	left:50%;
	transform: translate(-50%,-50%);
  border-radius: 15px;
  .top_part{
    float: left;
    margin-left: 15%;
    margin-top: 8%;
    width: 100%;
    .item{
      display: flex;
      height: 40px;
      line-height: 40px;
      margin-top: 20px;
      .switch{
        line-height: 40px;
        margin-left: 13px;
      }
      .title{
        float: left;
        text-align: left;
        width: 20%;
        height: 40px;
        line-height: 40px;
        margin: 0;
      }
    }
  }
  .button_part{
    float: left;
    margin-left:20%;
    margin-top: 10%;
  }
}
/* 媒体查询：当屏幕宽度小于或等于600px时 */
@media (max-width: 1444px) {
  .change_userInfo {
    width: 80%; /* 让容器宽度适应屏幕宽度 */
    height: auto; /* 让容器高度自适应内容 */
    margin: 20px; /* 添加一些外边距以避免内容被屏幕边缘截断 */

    .top_part {
      margin-left: 5%; /* 减少左边距以适应较小的屏幕 */
      margin-top: 5%; /* 减少上边距以适应较小的屏幕 */
    }

    .item {
      width:80%;
      margin-top: 20px; /* 减少间距以适应较小的屏幕 */
      margin-left: 40px;
    }
    .title {
    font-size: 15px;
    margin-top: 20px; /* 减少间距以适应较小的屏幕 */
    margin-right: 20px;
    width: auto; /* 宽度自适应内容 */
    height: auto; /* 高度自适应内容 */
    line-height: normal; /* 恢复默认行高 */
    white-space: nowrap; /* 禁止换行 */
    display: inline-block; /* 让元素在一行显示 */
}
    .button_part {
      margin-left: 10%; /* 减少左边距以适应较小的屏幕 */
      margin-top: 5%; /* 减少上边距以适应较小的屏幕 */
    }
  }
}

</style>