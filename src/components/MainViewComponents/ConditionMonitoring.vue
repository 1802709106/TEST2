<!-- 本组件用于在main.vue中显示状态监测总览相关内容 -->

<template>

  <div class="CMpart">

      <div class="toppart">
          <div class="leftpart">
          
              <div class="border_class">
                  <div style="width: 100%; padding-top: 10px;">主传动关键机械部件监测</div>
                  <div style="padding-left: 10px; padding-bottom: 10px;">
                      <div style="float: left; padding-top: 10px;">主轴转速 : </div>
                      <div style=" padding-top: 10px; text-align: center;">{{ NumFilter(this.Spindle_speed) }} rpm/min</div>
                      <div style="float: left; padding-top: 10px;">齿轮箱挡位 : </div>
                      <div style=" padding-top: 10px; text-align: center;">{{ (this.Gearbox_gear) }} 档</div>
                  </div>
              </div>
              <div class="border_class">
                  <div style="float: left; width: 100%; padding-bottom: 10px; padding-top: 10px;">主轴变速齿轮箱状态指示</div>
                  <div>
                      <div style="width: 100%; padding-top: 10px; padding-left: 10px;">
                          <div style="float: left;">齿轮箱X向振动 : </div>
                          <normal :status=this.Spindle_variable_status[0]></normal>
                      </div>
                      <div style="width: 100%; padding-top: 10px; padding-left: 10px;">
                          <div style="float: left;">齿轮箱Y向振动 : </div>
                          <normal :status=this.Spindle_variable_status[1]></normal>
                      </div>
                      <div style="width: 100%; padding-top: 10px; padding-bottom: 10px; padding-left: 10px;">
                          <div style="float: left;">齿轮箱Z向振动 : </div>
                          <normal :status=this.Spindle_variable_status[2]></normal>
                      </div>
                  </div>
              </div>
              <div class="border_class">
                  <div>
                      <div style="padding-bottom: 10px; padding-top: 10px;">主轴轴承状态指示</div>
                  </div>
                  <div>
                      <div style="float: left; padding-left: 10px;">主轴前轴承振动 : </div>
                      <normal :status=this.Spindle_bearing_status[0]></normal>
                      <div style="float: left; padding-left: 10px; padding-top: 10px;">主轴前轴承温度 : </div>
                      <div style="text-align: center; padding-top: 10px;">{{ NumFilter(this.Spindle_front_bearing_temperature) }} ℃</div>
                      <div style="float: left; padding-left: 10px; padding-top: 10px;">主轴后轴承温度 : </div>
                      <div style="text-align: center; padding-top: 10px;">{{ NumFilter(this.Rear_spindle_bearing_temperature) }} ℃</div>
                      <div style="float: left; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;">主轴尾轴承温度 : </div>
                      <div style="text-align: center; padding-top: 10px; padding-bottom: 10px;">{{ NumFilter(this.Spindle_tail_bearing_temperature) }} ℃</div>
                  </div>
              </div>


          </div>
          <div class="middlepart">
              <div style="margin-top: -5px; padding-bottom: 10px;">机床型号及名称 : xxxxxxx</div>
              <div class="pic" id="pic" style="width: 100%;">
                  <img class="machine_pic"  style="width: 100%; height: 80%; border-radius: 15px;" :src="getImagePath('machine_pic.jpg')" alt="Example Image">
              </div>
          </div>

          <div class="rightpart">
              <div class="border_class">
                  <div style="padding-top: 10px;">液压系统监测</div>
                  <div style="display: flex; text-align: center; padding-left: 10px; padding-top: 8px;">
                      <div style="width: 33%;">
                          <div style="float: left;">油品</div>
                          <normal :status=this.Hydraulic_system_status[0]></normal>
                      </div>
                      <div style="width: 33%;">
                          <div style="float: left;">油泵油压</div>
                          <normal :status=this.Hydraulic_system_status[1]></normal>
                      </div>
                      <div style="width: 33%;">
                          <div style="float: left;">油路流量</div>
                          <normal :status=this.Hydraulic_system_status[2]></normal>
                      </div>
                  </div>
                  <div style="display: flex; text-align: center; padding-left: 10px; padding-top: 8px;">
                      <div style="width: 100%;">
                          <div style="float: left;">主轴箱平衡补偿油路油压 </div>
                          <normal :status=this.Hydraulic_system_status[3] style="margin-right: 5%;"></normal>
                      </div>                  
                  </div>
                  <div style="display: flex; text-align: center; padding-left: 10px; padding-top: 8px; margin-bottom: 8px;">
                      <div style="width: 100%;">
                          <div style="float: left;">滑枕平衡补偿油路油压 </div> 
                          <normal :status=this.Hydraulic_system_status[4] style="margin-right: 5%;"></normal>
                      </div>        
                  </div>
                

              </div>
              <div class="border_class">
                  <div style="padding-top: 8px;">电气系统监测</div>
                  <div>
                      <div style=" margin-top: -3px;">
                          <template style="display: flex;">
                            <el-table
                              :data="elc_machine_arr"
                              style="width: 100%"
                              :row-style="{height:'20px'}"
                              :cell-style="{padding:'0px',background:'#e9eef3',color:'#606266',}"
                              :header-row-style="{height:'30px'}"
                              :header-cell-style="{background:'#e9eef3',color:'#606266'}">
                              <!-- 200改150 -->
                              <el-table-column
                                prop="machine_name"
                                label="电机名"
                                width="150">
                              </el-table-column>
                              <el-table-column
                                prop="elc"
                                label="电流"
                                width="150">
                                  <template slot-scope="scope">
                                      {{ NumFilter( scope.row.elc) }} A
                                  </template>
                              </el-table-column>
                              <el-table-column
                                prop="tem"
                                label="温度">
                                  <template slot-scope="scope">
                                      {{ NumFilter(scope.row.tem) }} ℃
                                  </template>
                              </el-table-column>
                            </el-table>
                          </template>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div class="buttonpart">
          <div class="botton_left" v-loading="left_chart_loading">
            <div class="border_class">
                <template style="text-align: center; height: 30px;">
                  <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="主轴变速齿轮箱状态监测趋势变化" name="first"></el-tab-pane>
                    <el-tab-pane label="主轴轴承状态监测趋势变化" name="second"></el-tab-pane>
                  </el-tabs>
                </template>
                <div>
                  <div v-if="activeName=='first'">
                    <!-- margin-left减100px -->
                    <div style="position: absolute; margin-left: 700px; margin-top: 5px; z-index: 3;">
                      <select v-model="current_channel" style="height: 30px; margin-right: 30px;">
                          <option v-for="(machine, index) in chart_channel_arr" :key="index" :value="machine">
                            {{ machine }}
                          </option>
                      </select>  
                    </div>
                  </div>
                  <!-- margin-left减100px -->
                  <div v-if="activeName=='first'">
                    <div style="position: absolute; margin-left: 800px; margin-top: 5px; z-index: 3;">
                      <select v-model="current_method" style="height: 30px; margin-right: 30px;">
                          <option v-for="(machine, index) in chart_method_arr" :key="index" :value="machine">
                            {{ machine }}
                          </option>
                      </select>  
                    </div>
                  </div>
                  <!-- margin-left减100px -->
                  <div v-if="activeName=='second'">
                    <div style="position: absolute; margin-left: 800px; margin-top: 5px; z-index: 3;">
                      <select v-model="current_method_2" style="height: 30px; margin-right: 30px;">
                          <option v-for="(machine, index) in chart_method_arr_2" :key="index" :value="machine">
                            {{ machine }}
                          </option>
                      </select>  
                    </div>
                  </div>

                  <div class="chartBox1">
                    <div id="Chart_button_left" style="width: 100%; height: 280px;"></div>
                  </div>
                </div>
                
            </div>
                

          </div>
          <!-- margin-left减50px ，margin-top加10px -->
          <div class="botton_right">
            <div style="position: absolute; margin-left: 350px; margin-top: 15px; z-index: 3;">
              <select v-model="current_elc_machine" style="height: 30px; margin-right: 30px;">
                  <option v-for="(machine, index) in elc_machine_name" :key="index" :value="index">
                    {{ machine }}
                  </option>
              </select>  
            </div>
            <div class="border_class" v-loading="right_chart_loading">
                <div class="chartBox2">
                    <div id="Chart_button_right" style="width: 100%; height: 333px;"></div>
                </div>
            </div>
              
          </div>

      </div>
          

  </div>
  
</template>


<script>
import axios from 'axios';
import { TrackOpTypes } from 'vue';
import { instance1, instance2 } from '../axiosInstances';
import normal from '../tool/normal.vue';
import * as echarts from 'echarts'
import dayjs from 'dayjs'

export default {
name: 'ConditionMonitoring',
components:{
  normal:normal
},
data() {
    return {

      //定时器
      timer_3sigma:null,
      timer2:null,
      timer3:null,
      timer4:null,

      //主轴转速
      Spindle_speed:0,
      //齿轮变速箱挡位
      Gearbox_gear:0,
      //主轴变速齿轮箱状态指示
      Spindle_variable_status:[1,1,1],
      //主轴轴承状态指示
      Spindle_bearing_status:[1],

      //主轴前轴承状态指示
      Spindle_front_bearing:false,
      //主轴前轴承温度
      Spindle_front_bearing_temperature:0,
      //主轴后轴承温度
      Rear_spindle_bearing_temperature:0,
      //主轴尾轴承温度
      Spindle_tail_bearing_temperature:0,


      //液压系统监测
      Hydraulic_system_status:[1,1,1,1,1],

      //主轴箱平衡补偿油路油压 滑枕平衡补偿油路油压
      // oil_pressure:[0,0],

      //电气系统监测 数据列表
      elc_machine_arr:[{
        machine_name: '主轴电机',
        elc: 0,
        tem: 0,
        elc_arr:[],
      }, {
        machine_name: 'X1电机',
        elc: 0,
        tem: 0,
        elc_arr:[],
      }, {
        machine_name: 'X2电机',
        elc: 0,
        tem: 0,
        elc_arr:[],
      },{
        machine_name: 'Y1电机',
        elc: 0,
        tem: 0,
        elc_arr:[],
      },{
        machine_name: 'Y2电机',
        elc: 0,
        tem: 0,
        elc_arr:[],
      },{
        machine_name: 'Z电机',
        elc: 0,
        tem: 0,
        elc_arr:[],
      },{
        machine_name: 'W电机',
        elc: 0,
        tem: 0,
        elc_arr:[],
      },{
        machine_name: 'V电机',
        elc: 0,
        tem: 0,
        elc_arr:[],
      },{
        machine_name: 'B1电机',
        elc: 0,
        tem: 0,
        elc_arr:[],
      },{
        machine_name: 'B2电机',
        elc: 0,
        tem: 0,
        elc_arr:[],
      },],
      elc_machine_name:[],
      current_elc_machine:0,

      //切换左下方的图
      activeName:'first',
      //左下方图下拉框数组_左
      chart_method_arr:['均方根','峰值','峭度'],
      current_method:'均方根',

      chart_method_arr_2:['均方根','峰值','峭度'],
      current_method_2:'均方根',

      //left_chart_loading
      left_chart_loading:true,
      //right_chart_loading
      right_chart_loading:true,

      //左下方通道选择
      chart_channel_arr:['channel1','channel2','channel3'],
      current_channel:'channel1',

      //主轴变速齿轮箱状态监测趋势变化、主轴轴承状态监测趋势变化的数据(两个一维数组,表示当前数据)
      Spindle_speed_trends:[1,2,5,48,12,23,47],
      Spindle_bearing_trends:[85,16,241,145,314],
      
      //数据集合(一共为两个大数组，每个里面12个小数组)
      Data_trends:[{
        channel_name:'channel1',
        root_mean_square:[],
        peak:[],
        kurtosis:[],
      },{
        channel_name:'channel2',
        root_mean_square:[],
        peak:[],
        kurtosis:[],
      },{
        channel_name:'channel3',
        root_mean_square:[],
        peak:[],
        kurtosis:[],
      },{
        channel_name:'channel4',
        root_mean_square:[],
        peak:[],
        kurtosis:[],
      },
      ],
      
      Data_three_sigma:[{
        channel_name:'channel1',
        standard_root_mean_square:0,
        standard_peak:0,
        standard_kurtosis:0,
      },{
        channel_name:'channel2',
        standard_root_mean_square:0,
        standard_peak:0,
        standard_kurtosis:0,
      },{
        channel_name:'channel3',
        standard_root_mean_square:0,
        standard_peak:0,
        standard_kurtosis:0,
      },{
        channel_name:'channel4',
        standard_root_mean_square:0,
        standard_peak:0,
        standard_kurtosis:0,
      },],



    };

    
},

mounted:function(){
  this.get_elc_machine_name()
  this.getMainTrendInfo()
  this.getOPCUA_2_elc_info()
  this.getOPCUA_3_elc_info()
  this.timer2 = setInterval(this.getOPCUA_2_info, 3000)
  this.timer3 = setInterval(this.getOPCUA_3_info, 3000)
  this.timer_3sigma = setInterval(this.getMainTrendInfo, 1000*60*10)
  this.timer4 = setInterval(this.getmonitorhy, 3000)
  this.timer5 = setInterval(this.addalarmrecord, 1000*30)
  
},

beforeDestroy:function(){
  clearInterval(this.timer2)
  clearInterval(this.timer3)
  clearInterval(this.timer_3sigma)
  clearInterval(this.timer4)
  clearInterval(this.timer5)
},

computed: {
    listenChange () {
        const { current_method, current_channel } = this
        return { current_method, current_channel }
    },
},

watch:{

  //此处用于对电流的历史情况进行监测
  current_elc_machine(current_left_chart){
    let index = this.getIndexFromArr(this.elc_machine_name, current_left_chart)
    let myChart1= echarts.getInstanceByDom(document.getElementById('Chart_button_right'));
    myChart1.dispose()
    this.Drow_smooth_pic('Chart_button_right','电流曲线(A)',this.elc_machine_arr[this.current_elc_machine].elc_arr)
  },

  //此处用于对主轴变速齿轮箱的相关状态进行监测
  listenChange (val) {
    // console.log(val)
    let myChart1= echarts.getInstanceByDom(document.getElementById('Chart_button_left'));
    myChart1.dispose()
    if(val.current_channel=='channel1'&&val.current_method=='均方根'){
      this.Drow_left_part('Chart_button_left','主轴变速齿轮箱状态监测',this.Data_trends[0].root_mean_square,this.Data_three_sigma[0].standard_root_mean_square)
    }else if(val.current_channel=='channel1'&&val.current_method=='峰值'){
      this.Drow_left_part('Chart_button_left','主轴变速齿轮箱状态监测',this.Data_trends[0].peak,this.Data_three_sigma[0].standard_peak)
    }else if(val.current_channel=='channel1'&&val.current_method=='峭度'){
      this.Drow_left_part('Chart_button_left','主轴变速齿轮箱状态监测',this.Data_trends[0].kurtosis,this.Data_three_sigma[0].standard_kurtosis)
    }else if(val.current_channel=='channel2'&&val.current_method=='均方根'){
      this.Drow_left_part('Chart_button_left','主轴变速齿轮箱状态监测',this.Data_trends[1].root_mean_square,this.Data_three_sigma[1].standard_root_mean_square)
    }else if(val.current_channel=='channel2'&&val.current_method=='峰值'){
      this.Drow_left_part('Chart_button_left','主轴变速齿轮箱状态监测',this.Data_trends[1].peak,this.Data_three_sigma[1].standard_peak)
    }else if(val.current_channel=='channel2'&&val.current_method=='峭度'){
      this.Drow_left_part('Chart_button_left','主轴变速齿轮箱状态监测',this.Data_trends[1].kurtosis,this.Data_three_sigma[1].standard_kurtosis)
    }else if(val.current_channel=='channel3'&&val.current_method=='均方根'){
      this.Drow_left_part('Chart_button_left','主轴变速齿轮箱状态监测',this.Data_trends[2].root_mean_square,this.Data_three_sigma[2].standard_root_mean_square)
    }else if(val.current_channel=='channel3'&&val.current_method=='峰值'){
      this.Drow_left_part('Chart_button_left','主轴变速齿轮箱状态监测',this.Data_trends[2].peak,this.Data_three_sigma[2].standard_peak)
    }else if(val.current_channel=='channel3'&&val.current_method=='峭度'){
      this.Drow_left_part('Chart_button_left','主轴变速齿轮箱状态监测',this.Data_trends[2].kurtosis,this.Data_three_sigma[2].standard_kurtosis)
    }
  },

  //此处用于对主轴轴承状态的监测
  current_method_2(current_method_2){
    let myChart1= echarts.getInstanceByDom(document.getElementById('Chart_button_left'));
    myChart1.dispose()
    if(current_method_2=="均方根"){
      this.Drow_left_part('Chart_button_left','主轴轴承状态监测',this.Data_trends[3].root_mean_square,this.Data_three_sigma[3].standard_root_mean_square)
    }else if(current_method_2=="峰值"){
      this.Drow_left_part('Chart_button_left','主轴轴承状态监测',this.Data_trends[3].peak,this.Data_three_sigma[3].standard_peak)
    }else if(current_method_2=="峭度"){
      this.Drow_left_part('Chart_button_left','主轴轴承状态监测',this.Data_trends[3].kurtosis,this.Data_three_sigma[3].standard_kurtosis)
    }
  },

},



methods: {


  Drow_left_part(char_element,title_text,data_trend,data_standard){
        var arr_xAxis = []
        var arr_standard = []
        var length = data_trend.length
        for(var i=0;i<length;i++){
          arr_xAxis.push(i)
          arr_standard.push(data_standard)
        } 
        //初始化实例
        try {
          let Chart_1 = this.$echarts.init(document.getElementById(char_element))
          //绘制图表
          Chart_1.setOption({
              //options配置项
              title: {
              text: title_text
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['trend', 'standard',],
              // selectedMode: 'single'
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: arr_xAxis
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: 'trend',
                type: 'line',
                data: data_trend
              },
              {
                name: 'standard',
                type: 'line',
                data: arr_standard
              },
            ]
          })
          } catch (error) {
            console.log(error)
          }
  },

  //用于获取数组中名为name 的元素的index
  getIndexFromArr(arr, name){
    let len = arr.length
    for(var i = 0; i<len; i++){
      if(arr[i] == name){
        return i;
      }
    }
    return -1;
  },

  // 用于获取切换电流曲线电机名数组
  get_elc_machine_name(){
      for(var i=0;i<this.elc_machine_arr.length;i++){
        this.elc_machine_name.push(this.elc_machine_arr[i].machine_name)
      }
  },

  // 切换左下角的两张图
  handleClick(){
      if(this.activeName=='first'){
          var middle_method = this.current_method
          var middle_channel = this.current_channel
          this.current_channel = "1"
          this.current_method = "1"
          this.current_method = middle_method
          this.current_channel = middle_channel
      }else if(this.activeName=='second'){
          let myChart1= echarts.getInstanceByDom(document.getElementById('Chart_button_left'));
          myChart1.dispose()
          this.Drow_left_part('Chart_button_left','主轴轴承状态监测',this.Data_trends[3].root_mean_square,this.Data_three_sigma[3].standard_root_mean_square)
      }
  },

  //画平滑曲线图
  Drow_smooth_pic(char_element,title_text,data){
      let arr_x = []
      for(let i = 0;i<data.length;i++){
          arr_x.push(i)
      }
      // arr_x = ['2024-1-1','2024-1-2','2024-1-3','2024-1-4','2024-1-5']
      //初始化实例
      try {
        let Chart_1 = this.$echarts.init(document.getElementById(char_element))
        //绘制图表
        Chart_1.setOption({
          //options配置项
          title: {
            text: title_text
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: arr_x
          },
          yAxis: {
            type: 'value'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          series: [
            {
              data: data,
              type: 'line',
              smooth: true
            }
          ]
        })
        } catch (error) {
          console.log(error)
        }
  },
  
  NumFilter (value) {
      // 截取当前数据到小数点后两位
      let realVal = parseFloat(value).toFixed(2)
      return realVal
    },
  getImagePath(imageName) {
      return process.env.BASE_URL + imageName;
  },
  NumFilter (value) {
    // 截取当前数据到小数点后两位
    let realVal = parseFloat(value).toFixed(2)
    return realVal
  },

  //用于获取主页面的信息
  getOPCUA_2_info(){
      try{
      instance2.get("/monitor/OPCUA_2_info").then((response)=>{
          // console.log(response.data)
          this.Spindle_speed = response.data[0].run_rate
          //主轴3个温度
          this.Spindle_front_bearing_temperature = response.data[0].spindle_fro
          this.Rear_spindle_bearing_temperature = response.data[0].spindle_rea
          this.Spindle_tail_bearing_temperature = response.data[0].spindle_tai
          this.elc_machine_arr[0].elc = response.data[0].spindle_mot
          this.elc_machine_arr[0].tem = response.data[0].spindle_cur
          this.elc_machine_arr[0].elc_arr.push(response.data[0].spindle_cur)
          this.Drow_smooth_pic('Chart_button_right','电流曲线(A)',this.elc_machine_arr[this.current_elc_machine].elc_arr)
          this.right_chart_loading = false
          this.Gearbox_gear = 1
      })
      }catch (error) {
          console.log("获取文件数据失败！请重新尝试")
      }
  },

  //用于获取主页面的信息
  getOPCUA_2_elc_info(){
      try{
      instance2.get("/monitor/OPCUA_2_elc_info").then((response)=>{
          this.elc_machine_arr[0].elc_arr = response.data
      })
      }catch (error) {
          console.log("获取OPCUA_2_elc_info失败！请重新尝试")
      }
  },

  //用于获取主页面的信息
  getOPCUA_3_elc_info(){
      try{
      instance2.get("/monitor/OPCUA_3_elc_info").then((response)=>{
          this.elc_machine_arr[1].elc_arr = response.data[0]
          this.elc_machine_arr[2].elc_arr = response.data[1]
          this.elc_machine_arr[3].elc_arr = response.data[2]
          this.elc_machine_arr[4].elc_arr = response.data[3]
          this.elc_machine_arr[5].elc_arr = response.data[4]
          this.elc_machine_arr[6].elc_arr = response.data[5]
          this.elc_machine_arr[7].elc_arr = response.data[6]
          this.elc_machine_arr[8].elc_arr = response.data[7]
          this.elc_machine_arr[9].elc_arr = response.data[8]
      })
      }catch (error) {
          console.log("获取OPCUA_3_elc_info失败！请重新尝试")
      }
  },

  //用于获取主页面的信息
  getOPCUA_3_info(){
      try{
      instance2.get("/monitor/OPCUA_3_info").then((response)=>{
          // 对9个电机进行赋值
          this.elc_machine_arr[1].elc = response.data[0].x1_axis_cur
          this.elc_machine_arr[1].tem = response.data[0].x1_axis_tem
          this.elc_machine_arr[1].elc_arr.push(response.data[0].x1_axis_cur)
          this.elc_machine_arr[2].elc = response.data[0].x2_axis_cur
          this.elc_machine_arr[2].tem = response.data[0].x2_axis_tem
          this.elc_machine_arr[2].elc_arr.push(response.data[0].x2_axis_cur)
          this.elc_machine_arr[3].elc = response.data[0].y1_axis_cur
          this.elc_machine_arr[3].tem = response.data[0].y1_axis_tem
          this.elc_machine_arr[3].elc_arr.push(response.data[0].y1_axis_cur)
          this.elc_machine_arr[4].elc = response.data[0].y2_axis_cur
          this.elc_machine_arr[4].tem = response.data[0].y2_axis_tem
          this.elc_machine_arr[4].elc_arr.push(response.data[0].y2_axis_cur)
          this.elc_machine_arr[5].elc = response.data[0].z_axis_curr
          this.elc_machine_arr[5].tem = response.data[0].z_axis_temp
          this.elc_machine_arr[5].elc_arr.push(response.data[0].z_axis_curr)
          this.elc_machine_arr[6].elc = response.data[0].w_axis_curr
          this.elc_machine_arr[6].tem = response.data[0].w_axis_temp
          this.elc_machine_arr[6].elc_arr.push(response.data[0].w_axis_curr)
          this.elc_machine_arr[7].elc = response.data[0].v_axis_curr
          this.elc_machine_arr[7].tem = response.data[0].v_axis_temp
          this.elc_machine_arr[7].elc_arr.push(response.data[0].v_axis_curr)
          this.elc_machine_arr[8].elc = response.data[0].b1_axis_cur
          this.elc_machine_arr[8].tem = response.data[0].b1_axis_tem
          this.elc_machine_arr[8].elc_arr.push(response.data[0].b1_axis_cur)
          this.elc_machine_arr[9].elc = response.data[0].b2_axis_cur
          this.elc_machine_arr[9].tem = response.data[0].b2_axis_tem
          this.elc_machine_arr[9].elc_arr.push(response.data[0].b2_axis_cur)
      })
      }catch (error) {
          console.log("获取文件数据失败！请重新尝试")
      }
  },

  //用于获取液压系统监测值
  getmonitorhy(){
    try{
      instance1.get("/front/hydraulic/monitorhy").then((response)=>{
          // console.log(response.data)
          this.Hydraulic_system_status = response.data
      })
      }catch (error) {
          console.log("获取液压系统监测数据失败！请重新尝试")
      }
  },

  //用于获取左下角图形信息，共两个大数组，每个大数组12个小数组
  getMainTrendInfo(){
      try{
        var params = new URLSearchParams()
        params.append('machine_table', "real1")
        params.append('window_size', "2048")
        params.append('stride', "2048")
        params.append('window_size_3sigma', "50")
        instance2.post("/state/main/3sigma",params).then((response)=>{
          // console.log(response.data)

          //完成对 Data_trends 的赋值（已校对）
          this.Data_trends[0].root_mean_square = response.data[0][0][0]
          this.Data_trends[0].peak = response.data[0][1][0]
          this.Data_trends[0].kurtosis = response.data[0][2][0]

          this.Data_trends[1].root_mean_square = response.data[0][0][1]
          this.Data_trends[1].peak = response.data[0][1][1]
          this.Data_trends[1].kurtosis = response.data[0][2][1]

          this.Data_trends[2].root_mean_square = response.data[0][0][2]
          this.Data_trends[2].peak = response.data[0][1][2]
          this.Data_trends[2].kurtosis = response.data[0][2][2]
          
          this.Data_trends[3].root_mean_square = response.data[0][0][3]
          this.Data_trends[3].peak = response.data[0][1][3]
          this.Data_trends[3].kurtosis = response.data[0][2][3]

          //完成对 Data_three_sigma 的赋值（已校对）
          this.Data_three_sigma[0].standard_root_mean_square = response.data[1][0][0]
          this.Data_three_sigma[0].standard_peak = response.data[1][1][0]
          this.Data_three_sigma[0].standard_kurtosis = response.data[1][2][0]
          
          this.Data_three_sigma[1].standard_root_mean_square = response.data[1][0][1]
          this.Data_three_sigma[1].standard_peak = response.data[1][1][1]
          this.Data_three_sigma[1].standard_kurtosis = response.data[1][2][1]
          
          this.Data_three_sigma[2].standard_root_mean_square = response.data[1][0][2]
          this.Data_three_sigma[2].standard_peak = response.data[1][1][2]
          this.Data_three_sigma[2].standard_kurtosis = response.data[1][2][2]
          
          this.Data_three_sigma[3].standard_root_mean_square = response.data[1][0][3]
          this.Data_three_sigma[3].standard_peak = response.data[1][1][3]
          this.Data_three_sigma[3].standard_kurtosis = response.data[1][2][3]

          
          this.Drow_left_part('Chart_button_left','主轴变速齿轮箱状态监测',this.Data_trends[0].root_mean_square,this.Data_three_sigma[0].standard_root_mean_square)
          this.left_chart_loading = false

        })
      }catch (error) {
          alert("获取数据失败！请重新尝试")
      }
  },
  
}
}
</script>



<style>

.CMpart{

  width: 100%;
  height: 100%;
  
  .toppart{
      width: 100%;
      height: 52%;
      display: flex;

      .leftpart{
          width: 33.3%;
          margin-right: 5px;
      }
      .middlepart{
          width: 33.3%;
          margin-right: 5px;

      }
      .rightpart{
          width: 33.3%;

      }

  }

  .buttonpart{
      width: 100%;
      height: 48%;
      display: flex;
      .botton_left{
          width: 66.6%;
      }
      .botton_right{
          width: 33.3%;
          margin-left: 10px;
      }

  }

}

div{
  font-size:large;
}

.border_class{
  border: 2px dashed rgba(128, 133, 134, 0.5);
  border-radius: 15px;
  margin-bottom: 10px;
}

@media screen and (max-width: 768px) {
  .CMpart {
    display: flex;
    flex-direction: column; /* 垂直排列 */

    .toppart {
      display: flex;
      flex-direction: column; /* 垂直排列子元素 */
      height: auto; /* 自动调整高度 */

      .leftpart,
      .middlepart,
      .rightpart {
        width: 100%; /* 每个部分占据整行 */
        margin-right: 0; /* 移除右边距 */
        margin-bottom: 10px; /* 添加底部边距 */
      }
    }

    .buttonpart {
      display: flex;
      flex-direction: column; /* 垂直排列子元素 */
      height: auto; /* 自动调整高度 */

      .botton_left,
      .botton_right {
        width: 100%; /* 每个部分占据整行 */
        margin-left: 0; /* 移除左边距 */
        margin-bottom: 10px; /* 添加底部边距 */
      }
    }
  }
}



</style>