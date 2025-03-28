<!-- 本组件用于在main.vue中显示状态监测相关内容 -->

<template>
  <div style="float: left;">

      <div class="elc_setting1">

              <div>
                <div class="chart_tem1" style="width: 100%; float: left;">
                  <!-- 伺服电机电流与温度 -->
                  <div class="chart_e_item">
                    <div class="chart_e" id="chart_tem_s1_1" style="width: 300px; float: left; height: 300px; margin-bottom: -50px; margin-top: -30px;"></div>
                    <div class="chart_e" id="chart_tem_s1_2" style="width: 300px; height: 300px; float: left; margin-bottom: -50px; margin-top: -30px;"></div>
                    <div class="text">伺服电机_1</div>
                    <div style="text-align: center; ">
                        <span v-if="status_s_1_t">
                            <i class="dotClass" style="background-color: springgreen"></i>
                        </span>
                        <span  v-if="!status_s_1_t" >
                            <i class="dotClass" style="background-color: red"></i>
                        </span>
                        <span v-if="status_s_1_e">
                            <i class="dotClass" style="background-color: springgreen"></i>
                        </span>
                        <span  v-if="!status_s_1_e" >
                            <i class="dotClass" style="background-color: red"></i>
                        </span>
                    </div>
                  </div>
                  <div class="chart_e_item">
                    <div class="chart_e" id="chart_tem_s2_1" style="width: 300px; float: left; height: 300px; margin-bottom: -50px; margin-top: -30px;"></div>
                    <div class="chart_e" id="chart_tem_s2_2" style="width: 300px; height: 300px; float: left; margin-bottom: -50px; margin-top: -30px;"></div>
                    <div class="text">伺服电机_2</div>
                    <div style="text-align: center; ">
                        <span v-if="status_s_2_t">
                            <i class="dotClass" style="background-color: springgreen"></i>
                        </span>
                        <span  v-if="!status_s_2_t" >
                            <i class="dotClass" style="background-color: red"></i>
                        </span>
                        <span v-if="status_s_2_e">
                            <i class="dotClass" style="background-color: springgreen"></i>
                        </span>
                        <span  v-if="!status_s_2_e" >
                            <i class="dotClass" style="background-color: red"></i>
                        </span>
                    </div>
                  </div>
                  <div class="chart_e_item">
                    <div class="chart_e" id="chart_tem_s3_1" style="width: 300px; float: left; height: 300px; margin-bottom: -50px; margin-top: -30px;"></div>
                    <div class="chart_e" id="chart_tem_s3_2" style="width: 300px; height: 300px; float: left; margin-bottom: -50px; margin-top: -30px;"></div>
                    <div class="text">伺服电机_3</div>
                    <div style="text-align: center; ">
                        <span v-if="status_s_3_t">
                            <i class="dotClass" style="background-color: springgreen"></i>
                        </span>
                        <span  v-if="!status_s_3_t" >
                            <i class="dotClass" style="background-color: red"></i>
                        </span>
                        <span v-if="status_s_3_e">
                            <i class="dotClass" style="background-color: springgreen"></i>
                        </span>
                        <span  v-if="!status_s_3_e" >
                            <i class="dotClass" style="background-color: red"></i>
                        </span>
                    </div>
                  </div>
                  <div class="chart_e_item">
                    <div class="chart_e" id="chart_tem_s4_1" style="width: 300px; float: left; height: 300px; margin-bottom: -50px; margin-top: -30px;"></div>
                    <div class="chart_e" id="chart_tem_s4_2" style="width: 300px; height: 300px; float: left; margin-bottom: -50px; margin-top: -30px;"></div>
                    <div class="text">伺服电机_4</div>
                    <div style="text-align: center; ">
                        <span v-if="status_s_4_t">
                            <i class="dotClass" style="background-color: springgreen"></i>
                        </span>
                        <span  v-if="!status_s_4_t" >
                            <i class="dotClass" style="background-color: red"></i>
                        </span>
                        <span v-if="status_s_4_e">
                            <i class="dotClass" style="background-color: springgreen"></i>
                        </span>
                        <span  v-if="!status_s_4_e" >
                            <i class="dotClass" style="background-color: red"></i>
                        </span>
                    </div>
                  </div>
                  <div class="chart_e_item">
                    <div class="chart_e" id="chart_tem_s5_1" style="width: 300px; float: left; height: 300px; margin-bottom: -50px; margin-top: -30px;"></div>
                    <div class="chart_e" id="chart_tem_s5_2" style="width: 300px; height: 300px; float: left; margin-bottom: -50px; margin-top: -30px;"></div>
                    <div class="text">伺服电机_5</div>
                    <div style="text-align: center; ">
                        <span v-if="status_s_5_t">
                            <i class="dotClass" style="background-color: springgreen"></i>
                        </span>
                        <span  v-if="!status_s_5_t" >
                            <i class="dotClass" style="background-color: red"></i>
                        </span>
                        <span v-if="status_s_5_e">
                            <i class="dotClass" style="background-color: springgreen"></i>
                        </span>
                        <span  v-if="!status_s_5_e" >
                            <i class="dotClass" style="background-color: red"></i>
                        </span>
                    </div>
                  </div>
                  <div class="chart_e_item">
                    <div class="chart_e" id="chart_tem_s6_1" style="width: 300px; float: left; height: 300px; margin-bottom: -50px; margin-top: -30px;"></div>
                    <div class="chart_e" id="chart_tem_s6_2" style="width: 300px; height: 300px; float: left; margin-bottom: -50px; margin-top: -30px;"></div>
                    <div class="text">伺服电机_6</div>
                    <div style="text-align: center; ">
                        <span v-if="status_s_6_t">
                            <i class="dotClass" style="background-color: springgreen"></i>
                        </span>
                        <span  v-if="!status_s_6_t" >
                            <i class="dotClass" style="background-color: red"></i>
                        </span>
                        <span v-if="status_s_6_e">
                            <i class="dotClass" style="background-color: springgreen"></i>
                        </span>
                        <span  v-if="!status_s_6_e" >
                            <i class="dotClass" style="background-color: red"></i>
                        </span>
                    </div>
                  </div>
                  <div class="chart_e_item">
                    <div class="chart_e" id="chart_tem_s7_1" style="width: 300px; float: left; height: 300px; margin-bottom: -50px; margin-top: -30px;"></div>
                    <div class="chart_e" id="chart_tem_s7_2" style="width: 300px; height: 300px; float: left; margin-bottom: -50px; margin-top: -30px;"></div>
                    <div class="text">伺服电机_7</div>
                    <div style="text-align: center; ">
                        <span v-if="status_s_7_t">
                            <i class="dotClass" style="background-color: springgreen"></i>
                        </span>
                        <span  v-if="!status_s_7_t" >
                            <i class="dotClass" style="background-color: red"></i>
                        </span>
                        <span v-if="status_s_7_e">
                            <i class="dotClass" style="background-color: springgreen"></i>
                        </span>
                        <span  v-if="!status_s_7_e" >
                            <i class="dotClass" style="background-color: red"></i>
                        </span>
                    </div>
                  </div>
                  <div class="chart_e_item">
                    <div class="chart_e" id="chart_tem2" style="width: 300px; float: left; height: 300px; margin-bottom: -50px; margin-top: -30px;"></div>
                    <div class="chart_e" id="chart_tem2_1" style="width: 300px; height: 300px; float: left; margin-bottom: -50px; margin-top: -30px;"></div> 
                    <div class="text">主轴电机</div>
                    <div style="text-align: center;">
                      <span v-if="status_4">
                          <i class="dotClass" style="background-color: springgreen"></i>
                      </span>
                      <span  v-if="!status_4" >
                          <i class="dotClass" style="background-color: red"></i>
                      </span>
                      <span v-if="status_5">
                          <i class="dotClass" style="background-color: springgreen"></i>
                      </span>
                      <span  v-if="!status_5" >
                          <i class="dotClass" style="background-color: red"></i>
                      </span>
                    </div>
                  </div>
                  <div class="chart_e_item">
                    <div style="width: 300px;">
                      <div class="chart_e" id="chart_tem3" style="width: 300px; float: left; height: 300px; margin-bottom: -50px; margin-top: -30px;"></div>
                      <div style="float: left; text-align: center; height: 30px; line-height: 30px;">电柜温度</div>
                      <div style="text-align: center; ">
                        <span v-if="status_6">
                            <i class="dotClass" style="background-color: springgreen"></i>
                        </span>
                        <span  v-if="!status_6" >
                            <i class="dotClass" style="background-color: red"></i>
                        </span>
                      </div>
                    </div>
                    <div>
                      <el-button style="text-align: center;" @click="search_history">查看历史数据</el-button>
                    </div>
                  </div>
                </div>
              </div>
          
      </div>

      
      <!-- 用于查看历史信息的弹窗，此弹窗浮动于以上所有组件之上 -->
      <div class="history" v-if="history_flag">
        <div class="history_chart" style="margin-top: 20px;">
          <div class="history_tem" id="history_tem" style="width: 50%; float: left; height: 400px; "></div>
          <div class="history_elc" id="history_elc" style="width: 50%; float: left; height: 400px; "></div>         
        </div>
        <div class="history_button">
          <el-button style="text-align: center;"  @click="search_history">关闭窗口</el-button>
        </div>
      </div>

        

  </div>
      
  
</template>

<script>
import axios from 'axios';
import { TrackOpTypes } from 'vue';
import { instance1, instance2 } from '../axiosInstances'


export default {
  name: 'ConditionMonitoring',
  mounted:function(){
    //获取数据并画图
    this.getLastEleInfo();

  },
  data:function(){
      return{

          //历史数据显示标记
          history_flag:false,

          //伺服电机电流与温度状态标记
          status_s_1_t:true,
          status_s_1_e:true,
          status_s_2_t:true,
          status_s_2_e:true,
          status_s_3_t:true,
          status_s_3_e:true,
          status_s_4_t:true,
          status_s_4_e:false,
          status_s_5_t:true,
          status_s_5_e:true,
          status_s_6_t:true,
          status_s_6_e:true,
          status_s_7_t:true,
          status_s_7_e:false,
          tem_servo_motor_1:0,
          elc_servo_motor_1:0,
          tem_servo_motor_2:0,
          elc_servo_motor_2:0,
          tem_servo_motor_3:0,
          elc_servo_motor_3:0,
          tem_servo_motor_4:0,
          elc_servo_motor_4:0,
          tem_servo_motor_5:0,
          elc_servo_motor_5:0,
          tem_servo_motor_6:0,
          elc_servo_motor_6:0,
          tem_servo_motor_7:0,
          elc_servo_motor_7:0,

          //主轴电机电流与温度状态标记
          status_4:true,
          status_5:false,
          elc_2:0,
          tem_2:0,

          //电柜温度状态标记
          status_6:true,
          tem_3:0,


          //以下数据用于存储历史数据
          arr_id:[],
          arr_tem_servo_motor_1:[],
          arr_elc_servo_motor_1:[],
          arr_tem_servo_motor_2:[],
          arr_elc_servo_motor_2:[],
          arr_tem_servo_motor_3:[],
          arr_elc_servo_motor_3:[],
          arr_tem_servo_motor_4:[],
          arr_elc_servo_motor_4:[],
          arr_tem_servo_motor_5:[],
          arr_elc_servo_motor_5:[],
          arr_tem_servo_motor_6:[],
          arr_elc_servo_motor_6:[],
          arr_tem_servo_motor_7:[],
          arr_elc_servo_motor_7:[],
          arr_elc_2:[],
          arr_tem_2:[],
          arr_tem_3:[],


          


      }
  },





  methods:{
      
      //获取本页面的最新的一次data
      getLastEleInfo(){
        instance1.get('/ele/findLasteleinfo').then((response)=>{
            if(response.status==200){
                this.tem_servo_motor_1 = response.data[0].tem_servo_motor_1
                this.elc_servo_motor_1 = response.data[0].elc_servo_motor_1
                this.tem_servo_motor_2 = response.data[0].tem_servo_motor_2
                this.elc_servo_motor_2 = response.data[0].elc_servo_motor_2
                this.tem_servo_motor_3 = response.data[0].tem_servo_motor_3
                this.elc_servo_motor_3 = response.data[0].elc_servo_motor_3
                this.tem_servo_motor_4 = response.data[0].tem_servo_motor_4
                this.elc_servo_motor_4 = response.data[0].elc_servo_motor_4
                this.tem_servo_motor_5 = response.data[0].tem_servo_motor_5
                this.elc_servo_motor_5 = response.data[0].elc_servo_motor_5
                this.tem_servo_motor_6 = response.data[0].tem_servo_motor_6
                this.elc_servo_motor_6 = response.data[0].elc_servo_motor_6
                this.tem_servo_motor_7 = response.data[0].tem_servo_motor_7
                this.elc_servo_motor_7 = response.data[0].elc_servo_motor_7

                this.elc_2 = response.data[0].elc_spindle_motor
                this.tem_2 = response.data[0].tem_spindle_motor
                this.tem_3 = response.data[0].tem_cabinet

                this.Drow("chart_tem_s1_2","电流(A)",this.elc_servo_motor_1)
                this.Drow("chart_tem_s1_1","温度(℃)",this.tem_servo_motor_1)
                this.Drow("chart_tem_s2_2","电流(A)",this.elc_servo_motor_2)
                this.Drow("chart_tem_s2_1","温度(℃)",this.tem_servo_motor_2)
                this.Drow("chart_tem_s3_2","电流(A)",this.elc_servo_motor_3)
                this.Drow("chart_tem_s3_1","温度(℃)",this.tem_servo_motor_3)
                this.Drow("chart_tem_s4_2","电流(A)",this.elc_servo_motor_4)
                this.Drow("chart_tem_s4_1","温度(℃)",this.tem_servo_motor_4)
                this.Drow("chart_tem_s5_2","电流(A)",this.elc_servo_motor_5)
                this.Drow("chart_tem_s5_1","温度(℃)",this.tem_servo_motor_5)
                this.Drow("chart_tem_s6_2","电流(A)",this.elc_servo_motor_6)
                this.Drow("chart_tem_s6_1","温度(℃)",this.tem_servo_motor_6)
                this.Drow("chart_tem_s7_2","电流(A)",this.elc_servo_motor_7)
                this.Drow("chart_tem_s7_1","温度(℃)",this.tem_servo_motor_7)
                this.Drow("chart_tem2","电流(A)",this.elc_2)
                this.Drow("chart_tem2_1","温度(℃)",this.tem_2)
                this.Drow("chart_tem3","温度(℃)",this.tem_3)

                

            }else{
                alert("系统错误！")
            }
        })
      },

      //获取历史数据
      getHisEleInfo(){
        try{
          instance1.get('/ele/findAlleleinfo').then((response)=>{
            if(response.status==200){
                
              
              this.arr_id = []
              this.arr_tem_2 = []
              this.arr_tem_3 = []
              this.arr_tem_servo_motor_1 = []
              this.arr_tem_servo_motor_2 = []
              this.arr_tem_servo_motor_3 = []
              this.arr_tem_servo_motor_4 = []
              this.arr_tem_servo_motor_5 = []
              this.arr_tem_servo_motor_6 = []
              this.arr_tem_servo_motor_7 = []
            
              this.arr_elc_servo_motor_1 = []
              this.arr_elc_servo_motor_2 = []
              this.arr_elc_servo_motor_3 = []
              this.arr_elc_servo_motor_4 = []
              this.arr_elc_servo_motor_5 = []
              this.arr_elc_servo_motor_6 = []
              this.arr_elc_servo_motor_7 = []
              // console.log(response.data)

              for(let item of response.data){
                  this.arr_id.push(item.id)
                  this.arr_tem_2.push(item.tem_spindle_motor)
                  this.arr_tem_3.push(item.tem_cabinet)
                  this.arr_tem_servo_motor_1.push(item.tem_servo_motor_1)
                  this.arr_tem_servo_motor_2.push(item.tem_servo_motor_2)
                  this.arr_tem_servo_motor_3.push(item.tem_servo_motor_3)
                  this.arr_tem_servo_motor_4.push(item.tem_servo_motor_4)
                  this.arr_tem_servo_motor_5.push(item.tem_servo_motor_5)
                  this.arr_tem_servo_motor_6.push(item.tem_servo_motor_6)
                  this.arr_tem_servo_motor_7.push(item.tem_servo_motor_7)
                  
                  this.arr_elc_servo_motor_1.push(item.elc_servo_motor_1)
                  this.arr_elc_servo_motor_2.push(item.elc_servo_motor_2)
                  this.arr_elc_servo_motor_3.push(item.elc_servo_motor_3)
                  this.arr_elc_servo_motor_4.push(item.elc_servo_motor_4)
                  this.arr_elc_servo_motor_5.push(item.elc_servo_motor_5)
                  this.arr_elc_servo_motor_6.push(item.elc_servo_motor_6)
                  this.arr_elc_servo_motor_7.push(item.elc_servo_motor_7)
              }

              this.Drow_history_tem()
              this.Drow_history_elc()

            }else{
                alert("系统错误！")
            }
          })
        }catch (error) {
            console.log(error)
        }
        
      },

      //画历史温度数据
      Drow_history_tem(){
        //初始化实例
        try {
          let Chart_1 = this.$echarts.init(document.getElementById('history_tem'))
          //绘制图表
          Chart_1.setOption({
              //options配置项
              title: {
              text: '历史温度数据(℃)'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              left: 'center',
              bottom:'bottom',
              data: ['主轴电机温度', '电柜温度', '伺服电机1', '伺服电机2', '伺服电机3', '伺服电机4', '伺服电机5', '伺服电机6', '伺服电机7']
            },
            grid: {
              left: '3%',
              right: '4%',
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
              data: this.arr_id,

            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '主轴电机温度',
                type: 'line',
                data: this.arr_tem_2
              },
              {
                name: '电柜温度',
                type: 'line',
                data: this.arr_tem_3
              },
              {
                name: '伺服电机1',
                type: 'line',
                data: this.arr_tem_servo_motor_1
              },
              {
                name: '伺服电机2',
                type: 'line',
                data: this.arr_tem_servo_motor_2
              },
              {
                name: '伺服电机3',
                type: 'line',
                data: this.arr_tem_servo_motor_3
              },
              {
                name: '伺服电机4',
                type: 'line',
                data: this.arr_tem_servo_motor_4
              },
              {
                name: '伺服电机5',
                type: 'line',
                data: this.arr_tem_servo_motor_5
              },
              {
                name: '伺服电机6',
                type: 'line',
                data: this.arr_tem_servo_motor_6
              },
              {
                name: '伺服电机7',
                type: 'line',
                data: this.arr_tem_servo_motor_7
              },
            ]
          })
          } catch (error) {
            console.log(error)
          }
      },
      //画历史电流数据
      Drow_history_elc(){
        //初始化实例
        try {
          let Chart_1 = this.$echarts.init(document.getElementById('history_elc'))
          //绘制图表
          Chart_1.setOption({
              //options配置项
              title: {
              text: '历史电流数据(A)'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              left: 'center',
              bottom:'bottom',
              data: ['伺服电机1', '伺服电机2', '伺服电机3', '伺服电机4', '伺服电机5', '伺服电机6', '伺服电机7']
            },
            grid: {
              left: '3%',
              right: '4%',
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
              data: this.arr_id,

            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '伺服电机1',
                type: 'line',
                data: this.arr_elc_servo_motor_1
              },
              {
                name: '伺服电机2',
                type: 'line',
                data: this.arr_elc_servo_motor_2
              },
              {
                name: '伺服电机3',
                type: 'line',
                data: this.arr_elc_servo_motor_3
              },
              {
                name: '伺服电机4',
                type: 'line',
                data: this.arr_elc_servo_motor_4
              },
              {
                name: '伺服电机5',
                type: 'line',
                data: this.arr_elc_servo_motor_5
              },
              {
                name: '伺服电机6',
                type: 'line',
                data: this.arr_elc_servo_motor_6
              },
              {
                name: '伺服电机7',
                type: 'line',
                data: this.arr_elc_servo_motor_7
              },
            ]
          })
          } catch (error) {
            console.log(error)
          }
      },

      Drow(char_element, data_name, data_value){
          //初始化实例
          var i=0
          try {
              //绘制图表
              let chart_tem1 = this.$echarts.init(document.getElementById(char_element))
              i++
              //绘制图表
              chart_tem1.setOption({
                tooltip: {
                formatter: '{a} <br/>{b} : {c}%'
              },
              series: [
                {
                  name: 'Pressure',
                  type: 'gauge',
                  progress: {
                    show: true
                  },
                  detail: {
                    valueAnimation: true,
                    formatter: '{value}'
                  },
                  data: [
                    {
                      value: data_value,
                      name: data_name
                    }
                  ]
                }
              ]

              })
          } catch (error) {
            console.log(error)
          }
          
      },

      //查看历史数据 按钮
      search_history(){
        this.history_flag= !this.history_flag
        if(this.history_flag===true){
          this.getHisEleInfo()
        }
      },
      
      
  },
}

</script>

<style>

.up_part{
  float: left;
  width: 100%;
  height: 300px;
}

.main_spindle{
  width: 600px;

}

.tem_elc{
  width: 300px;
  display: flex;
  flex-direction: column;
  
}


.elc_setting1{
  float: left;
  width: 100%;

}

.chart_e{
  margin-left: -40px;

}

.chart_e_item{
  width: 530px;
  height: 250px; 
  float: left;
}

.text{
  float:left;
  width: 10%;
  height:30px;
  line-height: 30px;
}

.dotClass {
  width:30px;
  height:30px;
  border-radius: 50%;
  float: left;
  
}

.history{
  position: absolute;
  width: 80%;
  height: 500px;
  background-color: rgb(238, 248, 255);
  z-index:1;
	top: 50%;
	left:50%;
	transform: translate(-50%,-50%);
  border-radius: 15px;
  
}


</style>