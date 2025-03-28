<!-- 本组件用于在main.vue中显示运维管理相关内容 -->
<template>
    <div class="total">
        <div style="width: 50%; float: left;">
            <el-tabs v-model="current_page" @tab-click="handleClick">
              <el-tab-pane label="库存备件记录" name="first"></el-tab-pane>
              <el-tab-pane label="故障诊断记录" name="second"></el-tab-pane>
              <el-tab-pane label="寿命预测记录" name="third"></el-tab-pane>
              <el-tab-pane label="状态监测告警记录" name="forth"></el-tab-pane>
            </el-tabs>
        </div>
        <div style="display: flex;">
          <div>
              <download-excel class = "export-excel-wrapper" :data = "this.print_table.current_print_data"
                     :fields = "this.print_table.current_fields" :name = print_table.file_name>
                  		<el-button type="primary" style="text-align: center;"> 数据导出 </el-button>
              </download-excel>
          </div>  
          <div v-show="current_page=='first'">
              <el-button type="info" style="text-align: center;" @click="add_record">添加记录</el-button>  
          </div>
        </div>

        <div v-show="current_page=='first'">
           
            <template>
              <el-table
                id="first_Table"
                :data="this.first_data.first_show_data.record"
                border
                style="width: 100%">
                <el-table-column
                  prop="id"
                  label="序号"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="名称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="型号"
                  label="型号">
                </el-table-column>
                <el-table-column
                  prop="生产厂家"
                  label="生产厂家">
                </el-table-column>
                <el-table-column
                  prop="储存地址"
                  label="储存地址">
                </el-table-column>
                <el-table-column
                  prop="入库数量"
                  label="入库数量">
                </el-table-column>
                <el-table-column
                  prop="出库数量"
                  label="出库数量">
                </el-table-column>
                <el-table-column
                  prop="实际库存量"
                  label="实际库存量">
                </el-table-column>
                <el-table-column
                  prop="操作人员"
                  label="操作人员"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="时间"
                  label="时间"
                  width="300">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <div style="display: flex;">
                            <div style="width: 50%;">
                                <button
                                  size="mini"
                                  @click="first_handleEdit(scope.$index, scope.row)">编辑</button>
                            </div>
                            <div style="width: 50%;">
                                <button
                                  size="mini"
                                  type="danger"
                                  @click="first_handleDelete(scope.$index, scope.row)">删除</button>
                            </div>
                        </div>
                    </template>
                </el-table-column>
              </el-table>
            </template>
            <div style="margin-top: 10px;">
              <el-pagination @current-change="el_pagination_change"
                background
                layout="prev, pager, next"
                :page-count=first_data.first_show_data.total_page_num>
              </el-pagination>
            </div>
            <!-- 此模块用于管理员添加用户信息 -->
            <div class="change_userInfo" v-if="first_data.add_info.add_jilu_flag">
              <div class="top_part">
                <div class="item">
                  <div class="title">名称：</div>
                  <el-input v-model="first_data.add_info.partName" placeholder="请输入内容"></el-input>
                </div>
                <div class="item">
                  <div class="title">型号：</div>
                  <el-input v-model="first_data.add_info.partModel" placeholder="请输入内容"></el-input>
                </div>
                <div class="item">
                  <div class="title">生产厂家：</div>
                  <el-input v-model="first_data.add_info.Manufacturer" placeholder="请输入内容"></el-input>
                </div>  
                <div class="item">
                  <div class="title">存储地址：</div>
                  <el-input v-model="first_data.add_info.storageAddress" placeholder="请输入内容"></el-input>
                </div>
                <div class="item">
                  <div class="title">入库数量：</div>
                  <el-input v-model="first_data.add_info.inboundQuantity" placeholder="请输入内容"></el-input>
                </div>
                <div class="item">
                  <div class="title">出库数量：</div>
                  <el-input v-model="first_data.add_info.outboundQuantity" placeholder="请输入内容"></el-input>
                </div>
                <div class="item">
                  <div class="title">实际库存量：</div>
                  <el-input v-model="first_data.add_info.inventoryLevels" placeholder="请输入内容"></el-input>
                </div>
                <div class="button_part">
                  <el-button style="text-align: center;" @click="add_kucun">确认</el-button>
                  <el-button style="text-align: center;" @click="add_record">关闭窗口</el-button>
                </div>
            </div>
            </div>
        </div>
        <div v-show="current_page=='second'">
            <template>
              <el-table
                id="second_Table"
                :data="this.second_data.second_show_data.record"
                border
                style="width: 100%">
                <el-table-column
                  prop="id"
                  label="序号"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="诊断方法"
                  label="诊断方法"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="数据选择"
                  label="数据选择">
                </el-table-column>
                <el-table-column
                  prop="数据起始终止点"
                  label="数据起始终止点">
                </el-table-column>
                <!-- <el-table-column
                  prop="采样数"
                  label="采样数">
                </el-table-column> -->
                <el-table-column
                  prop="采样数"
                  label="采样数">
                  <template slot-scope = "scope">
                      {{ scope.row.采样数==0 ? "-" : scope.row.采样数 }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="诊断特征选择"
                  label="诊断特征选择">
                </el-table-column>
                <el-table-column
                  prop="算法模型选择"
                  label="算法模型选择">
                </el-table-column>
                <el-table-column
                  prop="诊断结果"
                  label="诊断结果">
                </el-table-column>
                <el-table-column
                  prop="操作人员"
                  label="操作人员"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="时间"
                  label="时间"
                  width="300">
                </el-table-column>
              </el-table>
            </template>
            <div style="margin-top: 10px;">
              <el-pagination @current-change="el_pagination_change"
                background
                layout="prev, pager, next"
                :page-count=second_data.second_show_data.total_page_num>
              </el-pagination>
            </div>
        </div>
        <div v-show="current_page=='third'">
            <template>
              <el-table
                id="third_Table"
                :data="this.third_data.third_show_data.record"
                border
                style="width: 100%">
                <el-table-column
                  prop="id"
                  label="序号"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="数据选择"
                  label="数据选择"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="算法模型"
                  label="算法模型">
                </el-table-column>
                <el-table-column
                  prop="预测结果"
                  label="预测结果">
                </el-table-column>
                <el-table-column
                  prop="操作人员"
                  label="操作人员"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="时间"
                  label="时间"
                  width="300">
                </el-table-column>
              </el-table>
            </template>
            <div style="margin-top: 10px;">
              <el-pagination @current-change="el_pagination_change"
                background
                layout="prev, pager, next"
                :page-count=third_data.third_show_data.total_page_num>
              </el-pagination>
            </div>
        </div>
        <div v-show="current_page=='forth'">
            <template>
              <el-table
                id="forth_Table"
                :data="this.forth_data.forth_show_data.record"
                border
                style="width: 100%">
                <el-table-column
                  prop="id"
                  label="序号"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="告警位置"
                  label="告警位置"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="告警原因"
                  label="告警原因">
                </el-table-column>
                <el-table-column
                  prop="时间"
                  label="时间"
                  width="300">
                </el-table-column>
              </el-table>
            </template>
            <div style="margin-top: 10px;">
              <el-pagination @current-change="el_pagination_change"
                background
                layout="prev, pager, next"
                :page-count=forth_data.forth_show_data.total_page_num>
              </el-pagination>
            </div>
        </div>
    </div>
</template>


<script>

import axios from 'axios'
import * as echarts from 'echarts'
import { instance1, instance2 } from '../axiosInstances'
import JsonExcel from 'vue-json-excel'
import dayjs from 'dayjs'

export default {
  name: 'PersonalInfo',
  components: {
    DownloadExcel: JsonExcel
  },
  mounted:function(){
    this.getexcelData()
    this.getinventoryrecords()
    this.troubleshootingrecords()
    this.lifeforecastrecords()
    this.alarmrecords()
  },
  data:function(){
      return{
        //此处用于切换page
        current_page:"first",


        //用于导出文件
        print_table:{
          current_fields:{},
          current_print_data:[],
          file_name:'运维管理',
        },

        first_data:{
            add_edit:"add",
            add_info:{
              add_jilu_flag:false,
              id:0,
              partName:"",
              partModel:"",
              Manufacturer:"",
              storageAddress:"",
              inboundQuantity:"",
              outboundQuantity:"",
              inventoryLevels:"",
            },
            first_table_data:{
                "record":[],
                "length":0
            },
            first_show_data:{
                "record":[],
                // 单个页面数据量大小
                "show_num":12,
                // 当前页面
                "current_page_num":1,
                // 总共有多少页
                "total_page_num":0,
            },
            first_json_field:{
                编号: "id",
                零件名称:"name",
                型号:"型号",
                生产厂家: "生产厂家",
                储存地址:"储存地址",
                入库数量:"入库数量",
                出库数量:"出库数量",
                实际库存量:"实际库存量",
                操作人员:"操作人员",
                时间:"时间",
            },
        },

        second_data:{
            second_table_data:{
                "record":[],
                "length":0
            },
            second_show_data:{
                "record":[],
                // 单个页面数据量大小
                "show_num":12,
                // 当前页面
                "current_page_num":1,
                // 总共有多少页
                "total_page_num":1,
            },
            second_json_field:{
              编号: "id",
              诊断方法:"诊断方法",
              数据选择:"数据选择",
              数据起始终止点:"数据起始终止点",
              采样数:"采样数",
              诊断特征选择: "诊断特征选择",
              算法模型选择:"算法模型选择",
              诊断结果:"诊断结果",
              操作人员:"操作人员",
              时间:"时间",
            },
        },

        third_data:{
            third_table_data:{
                "record":[],
                "length":0
            },
            third_show_data:{
                "record":[],
                // 单个页面数据量大小
                "show_num":12,
                // 当前页面
                "current_page_num":1,
                // 总共有多少页
                "total_page_num":1,
            },
            third_json_field:{
              id: "id",
              数据选择:"数据选择",
              算法模型:"算法模型",
              预测结果:"预测结果",
              操作人员:"操作人员",
              时间:"时间",
            },
        },

        forth_data:{
            forth_table_data:{
                "record":[],
                "length":0
            },
            forth_show_data:{
                "record":[],
                // 单个页面数据量大小
                "show_num":12,
                // 当前页面
                "current_page_num":1,
                // 总共有多少页
                "total_page_num":1,
            },
            forth_json_field:{
              id: "id",
              告警位置:"告警位置",
              告警原因:"告警原因",
              时间:"时间",
            },
        },
        
      }
  },

  methods:{


    first_handleEdit(index, row){
        this.first_data.add_info.id=row.id
        this.first_data.add_info.partName=row.name
        this.first_data.add_info.partModel=row.型号
        this.first_data.add_info.Manufacturer=row.生产厂家
        this.first_data.add_info.storageAddress=row.储存地址
        this.first_data.add_info.inboundQuantity=row.入库数量
        this.first_data.add_info.outboundQuantity=row.出库数量
        this.first_data.add_info.inventoryLevels=row.实际库存量
        this.first_data.add_info.add_jilu_flag = true
    },

    first_handleDelete(index, row){
        var params = new URLSearchParams()
        params.append('id',row.id)
        instance1.post('/front/om/delete_inventoryrecords', params).then((response)=>{
            if(response.status==200){
                this.getinventoryrecords()
                this.first_data.first_show_data.current_page_num = 1
            }else{
                alert("系统错误！")
            }
        })
    },

    // 用于库存记录添加新数据
    add_record(){
        this.first_data.add_edit = "add"
        this.first_data.add_info.add_jilu_flag = !this.first_data.add_info.add_jilu_flag
    },
    // 用于添加库存备件记录
    add_kucun(){
      var curr_time = dayjs().format('YYYY-MM-DD HH:mm:ss')
      if(this.first_data.add_edit=="add"){
        var params = new URLSearchParams()
        params.append('partName',this.first_data.add_info.partName)
        params.append('partModel',this.first_data.add_info.partModel)
        params.append('Manufacturer',this.first_data.add_info.Manufacturer)
        params.append('storageAddress',this.first_data.add_info.storageAddress)
        params.append('inboundQuantity',this.first_data.add_info.inboundQuantity)
        params.append('outboundQuantity',this.first_data.add_info.outboundQuantity)
        params.append('inventoryLevels',this.first_data.add_info.inventoryLevels)
        params.append('user_name',this.$store.state.username)
        params.append('time',curr_time)
        instance1.post('/front/om/add_inventoryrecords', params).then((response)=>{
            if(response.status==200){
                this.getinventoryrecords()
                this.first_data.add_info.add_jilu_flag = false
                this.first_data.add_info.partName=""
                this.first_data.add_info.partModel=""
                this.first_data.add_info.Manufacturer=""
                this.first_data.add_info.storageAddress=""
                this.first_data.add_info.inboundQuantity=""
                this.first_data.add_info.outboundQuantity=""
                this.first_data.add_info.inventoryLevels=""
            }else{
                alert("系统错误！")
            }
        })        
      }else if(this.first_data.add_edit=="edit"){
        var params = new URLSearchParams()
        params.append('id',this.first_data.add_info.id)
        params.append('partName',this.first_data.add_info.partName)
        params.append('partModel',this.first_data.add_info.partModel)
        params.append('Manufacturer',this.first_data.add_info.Manufacturer)
        params.append('storageAddress',this.first_data.add_info.storageAddress)
        params.append('inboundQuantity',this.first_data.add_info.inboundQuantity)
        params.append('outboundQuantity',this.first_data.add_info.outboundQuantity)
        params.append('inventoryLevels',this.first_data.add_info.inventoryLevels)
        params.append('user_name',this.$store.state.username)
        params.append('time',curr_time)
        instance1.post('/front/om/update_inventoryrecords', params).then((response)=>{
            if(response.status==200){
                this.getinventoryrecords()
                this.first_data.add_info.add_jilu_flag = false
                this.first_data.add_info.partName=""
                this.first_data.add_info.partModel=""
                this.first_data.add_info.Manufacturer=""
                this.first_data.add_info.storageAddress=""
                this.first_data.add_info.inboundQuantity=""
                this.first_data.add_info.outboundQuantity=""
                this.first_data.add_info.inventoryLevels=""
            }else{
                alert("系统错误！")
            }
        })    
      }
        
    },

    handleClick(tab, event){
        if(tab.name=="first"){
            this.current_page = "first"
        }else if(tab.name=="second"){
            this.current_page = "second"
        }else if(tab.name=="third"){
            this.current_page = "third"
        }else if(tab.name=="forth"){
            this.current_page = "forth"
        }else{
            console.log("error")
        }
        this.getexcelData()
    },

    // 分页
    el_pagination_change(val){
      // console.log(this.current_page)
      // console.log(val)
      if(this.current_page=="first"){
        var start = (val-1) * this.first_data.first_show_data.show_num
        var end = start + this.first_data.first_show_data.show_num
        this.first_data.first_show_data.record = []
        if(val==this.first_data.first_show_data.total_page_num){
          end = start + this.first_data.first_table_data.length-((val-1)*this.first_data.first_show_data.show_num)
        }
        for(var i = start; i<end; i++){
          this.first_data.first_show_data.record.push(this.first_data.first_table_data.record[i])
        }
      }else if(this.current_page=="second"){
        var start = (val-1) * this.second_data.second_show_data.show_num
        var end = start + this.second_data.second_show_data.show_num
        this.second_data.second_show_data.record = []
        if(val==this.second_data.second_show_data.total_page_num){
          end = start + this.second_data.second_table_data.length-((val-1)*this.second_data.second_show_data.show_num)
        }
        for(var i = start; i<end; i++){
          this.second_data.second_show_data.record.push(this.second_data.second_table_data.record[i])
        }
      }else if(this.current_page=="third"){
        var start = (val-1) * this.third_data.third_show_data.show_num
        var end = start + this.third_data.third_show_data.show_num
        this.third_data.third_show_data.record = []
        if(val==this.third_data.third_show_data.total_page_num){
          end = start + this.third_data.third_table_data.length-((val-1)*this.third_data.third_show_data.show_num)
        }
        for(var i = start; i<end; i++){
          this.third_data.third_show_data.record.push(this.third_data.third_table_data.record[i])
        }
      }else if(this.current_page=="forth"){
        var start = (val-1) * this.forth_data.forth_show_data.show_num
        var end = start + this.forth_data.forth_show_data.show_num
        this.forth_data.forth_show_data.record = []
        if(val==this.forth_data.forth_show_data.total_page_num){
          end = start + this.forth_data.forth_table_data.length-((val-1)*this.forth_data.forth_show_data.show_num)
        }
        for(var i = start; i<end; i++){
          this.forth_data.forth_show_data.record.push(this.forth_data.forth_table_data.record[i])
        }
      }else{
          console.log("error")
      }
    },

    // 用于返回导出数据
    getexcelData () {
      if(this.current_page=="first"){
          this.print_table.current_fields = this.first_data.first_json_field,
          this.print_table.current_print_data = this.first_data.first_table_data.record
      }else if(this.current_page=="second"){
          this.print_table.current_fields = this.second_data.second_json_field,
          this.print_table.current_print_data = this.second_data.second_table_data.record
      }else if(this.current_page=="third"){
          this.print_table.current_fields = this.third_data.third_json_field,
          this.print_table.current_print_data = this.third_data.third_table_data.record
      }else if(this.current_page=="forth"){
          this.print_table.current_fields = this.forth_data.forth_json_field,
          this.print_table.current_print_data = this.forth_data.forth_table_data.record
      }else{
          console.log("error")
      }
    },

    getinventoryrecords(){
        instance1.get('/front/om/inventoryrecords').then((response)=>{
           if(response.status==200){
                this.first_data.first_table_data.record = []
                this.first_data.first_show_data.record = []
                this.first_data.first_table_data.record = response.data
                this.first_data.first_table_data.length = response.data.length
                  if(response.data.length%this.second_data.second_show_data.show_num==0){
                    this.first_data.first_show_data.total_page_num = parseInt(response.data.length/this.first_data.first_show_data.show_num)
                  }else{
                    this.first_data.first_show_data.total_page_num = parseInt(response.data.length/this.first_data.first_show_data.show_num)+1
                  }
                for(var i=0;i<this.first_data.first_show_data.show_num;i++){
                  this.first_data.first_show_data.record.push(this.first_data.first_table_data.record[i])
                }
           }else{
               alert("系统错误！")
           }
        })
    },

    troubleshootingrecords(){
        instance1.get('/front/om/troubleshootingrecords').then((response)=>{
             if(response.status==200){
                  this.second_data.second_table_data.record = response.data
                  this.second_data.second_table_data.length = response.data.length
                  if(response.data.length%this.second_data.second_show_data.show_num==0){
                    this.second_data.second_show_data.total_page_num = parseInt(response.data.length/this.second_data.second_show_data.show_num)
                  }else{
                    this.second_data.second_show_data.total_page_num = parseInt(response.data.length/this.second_data.second_show_data.show_num)+1
                  }
                  for(var i=0;i<this.second_data.second_show_data.show_num;i++){
                    this.second_data.second_show_data.record.push(this.second_data.second_table_data.record[i])
                  }
             }else{
                 alert("系统错误！")
             }
          })
    },

    lifeforecastrecords(){
        instance1.get('/front/om/lifeforecastrecords').then((response)=>{
           if(response.status==200){
               this.third_data.third_table_data.record = response.data
               this.third_data.third_table_data.length = response.data.length
               if(response.data.length%this.third_data.third_show_data.show_num==0){
                this.third_data.third_show_data.total_page_num = parseInt(response.data.length/this.third_data.third_show_data.show_num)
               }else{
                this.third_data.third_show_data.total_page_num = parseInt(response.data.length/this.third_data.third_show_data.show_num)+1
               }
               for(var i=0;i<this.third_data.third_show_data.show_num;i++){
                 this.third_data.third_show_data.record.push(this.third_data.third_table_data.record[i])
               }
           }else{
               alert("系统错误！")
           }
        })
    },

    alarmrecords(){
        instance1.get('/front/om/alarmrecords').then((response)=>{
           if(response.status==200){
               this.forth_data.forth_table_data.record = response.data
               this.forth_data.forth_table_data.length = response.data.length
               if(response.data.length%this.forth_data.forth_show_data.show_num==0){
                  this.forth_data.forth_show_data.total_page_num = parseInt(response.data.length/this.forth_data.forth_show_data.show_num)
               }else{
                  this.forth_data.forth_show_data.total_page_num = parseInt(response.data.length/this.forth_data.forth_show_data.show_num)+1
               }
               for(var i=0;i<this.forth_data.forth_show_data.show_num;i++){
                 this.forth_data.forth_show_data.record.push(this.forth_data.forth_table_data.record[i])
               }
           }else{
               alert("系统错误！")
           }
        })
    },

  },


}


</script>


<style>





</style>

