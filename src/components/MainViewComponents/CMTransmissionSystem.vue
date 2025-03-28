<!-- 本组件用于在main.vue中显示监测传动系统相关内容 -->

<template>
    
    <div>
        <div class="settingBox" style="float: left;">
          <div class="watching_1" style="float: left;">
            <div  class="watching_1_title">传动系统状态监测</div>
              <span v-if="status_1">
                  <i class="dotClass" style="background-color: springgreen"></i>
              </span>
              <span  v-if="!status_1" >
                  <i class="dotClass" style="background-color: red"></i>
              </span>
              <div class="watching_tem">
                  <div class="watching_tem_item">主轴前轴承温度：{{this.NumFilter(tem1)}} ℃</div>
                  <div class="watching_tem_item">主轴后轴承温度：{{this.NumFilter(tem2)}} ℃</div>
                  <div class="watching_tem_item">主轴尾轴承温度：{{this.NumFilter(tem3)}} ℃</div>
              </div>
          </div>

          <div class="watching_2" style="float: left;">
            <div  class="watching_1_title">链条长度监测：上次链条长度：{{ cha_lenth }} cm</div>
              <span v-if="status_lenth">
                  <i class="dotClass" style="background-color: springgreen"></i>
              </span>
              <span  v-if="!status_lenth" >
                  <i class="dotClass" style="background-color: red"></i>
              </span>
          </div>


          <div class="choose">
            <div style="float: left; width: 100%;">
              <div style="float: left; margin-right: 30px;">选择分析数据:</div>
              <div style="float: left; ">
                <select v-model="selectedMachine" style="height: 30px; margin-right: 30px;">
                  <option v-for="(machine, index) in machine_arr" :key="index" :value="machine">
                    {{ machine }}
                  </option>
                </select>               
              </div>
              <div style="float: left; width: 50%px; float: right;">
                <div style="float: left; margin-left: 4px; margin-right: 20px;">窗口大小:</div>
                <el-input v-model="window_size" placeholder="" style="width: 80px; float: left; margin-top: -5px;margin-right: 50px;"></el-input>
                <div style="float: left; margin-left: -10px;margin-right: 20px;">步长:</div>
                <el-input v-model="stride" placeholder="" style="width: 80px; float: left; margin-top: -5px; margin-right: 50px;"></el-input>
                <el-button @click="search_tran" style="width: 80px; text-align: center; margin-top: -5px;">查询</el-button>
              </div>
            </div>
          </div>
        </div>

        <div class="chartBox" v-loading="loading_flag">

            <div style="display: flex; justify-content: center; align-items: center; margin-top: 0px; margin-bottom: -15px;">
              <el-tabs v-model="activeName" @tab-click="handleClick_1" style="text-align: center;">
                <el-tab-pane label="主轴变齿轮速箱" name="first" style="width: 120px;"></el-tab-pane>
                <el-tab-pane label="主轴前轴承" name="second" style="width: 120px;"></el-tab-pane>
              </el-tabs>
            </div>

            <div>

                  <div class="chartBox1">
                    <div id="Chart_top_left" style="width: 50%; height: 350px; float: left; border-top: 2px solid rgba(128, 133, 134, 0.5);"></div>
                  </div>

                  <div>
                    <div>
                      <select v-model="current_left_chart" style="height: 30px; margin-right: 30px; position: absolute; left: 93%; z-index: 3;">
                        <option v-for="(chart_left, index) in chart_left_arr" :key="index" :value="chart_left">
                          {{ chart_left }}
                        </option>
                      </select>               
                    </div>
                    <div class="choosepart" style="height: 350px;">
                      <div class="chartBox2">
                        <div id="Chart_choose_left" style="width: 50%; height: 350px; float: left; border-top: 2px solid rgba(128, 133, 134, 0.5);"></div>
                      </div>
                    </div>
                  </div>
                  

                  <div>

                    <div>
                      <select v-model="current_right_chart" style="height: 30px; position: absolute; left: 50%; z-index: 3;">
                        <option v-for="(chart_right, index) in chart_right_arr" :key="index" :value="chart_right">
                          {{ chart_right }}
                        </option>
                      </select>               
                    </div>

                    <div v-if="change_flag">
                      <select v-model="current_channel" style="height: 30px; position: absolute; left: 93%; z-index: 3;">
                        <option v-for="(channel, index) in channel_arr" :key="index" :value="channel">
                          {{ channel }}
                        </option>
                      </select>               
                    </div>

                      <div class="choosepart" style="height: 350px;">
                        <div class="chartBox2" style="margin-top: 20px;">
                          <div id="Chart_choose_right" style="width: 50%; height: 350px; float: left;"></div>
                        </div>
                        <div class="chartBox2" style="margin-top: 20px;">
                          <div id="time_rate" style="width: 50%; height: 350px; float: left;"></div>
                        </div>
                      </div>

                  </div>
                    
                  

            </div>
                

                
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
import { TrackOpTypes } from 'vue';
import * as echarts from 'echarts'
import { instance1, instance2 } from '../axiosInstances'


export default {
  name: 'ConditionMonitoring',
  mounted:function(){
      // 在生命周期中调用 getRenderer 方法
      this.getMachineData()

      
  },
  data:function(){
      return{

          //加载状态标记
          loading_flag:true,

          //页面切换标记
          activeName: 'first',
        
          //用于接收图一data
          chartData:[],
          id:[],
          channel1:[],
          channel2:[],
          channel3:[],
          channel4:[],

          //用于接收均方根的data
          chartData_2:[],
          id_2:[],
          channel1_2:[],
          channel2_2:[],
          channel3_2:[],
          channel4_2:[],

          //用于接收峰值的data
          chartData_3:[],
          id_3:[],
          channel1_3:[],
          channel2_3:[],
          channel3_3:[],
          channel4_3:[],

          //用于接收峭度的data
          chartData_4:[],
          id_4:[],
          channel1_4:[],
          channel2_4:[],
          channel3_4:[],
          channel4_4:[],

          //用于接收频谱的data
          chartData_5:[],
          id_5:[],
          channel1_5:[],
          channel2_5:[],
          channel3_5:[],
          channel4_5:[],

          //用于接收包络谱的data
          chartData_6:[],
          id_6:[],
          channel1_6:[],
          channel2_6:[],
          channel3_6:[],
          channel4_6:[],

          //用于接收时频图的data
          timedata:[],

          //传动系统的状态及三个温度
          status_1:true,
          tem1:0,
          tem2:0,
          tem3:0,

          //链条长度
          cha_lenth:20,
          status_lenth:true,

          //选择机器表的数组
          machine_arr:[],
          // 用于存储所选机器的数据
          selectedMachine: 'tb_2023_09_12_09_00_06_6000rpm_304钢_重型机床1',
          window_size:1000,
          stride:1000,

          //请求方法数组
          reques_methods:['data','rms','kurtosis','rms','rms','rms'],

          // 选择表数组
          current_left_chart : '均方根',
          current_right_chart : '频谱',
          current_channel: 'channel1',
          chart_left_arr:['均方根','峰值','峭度'],
          chart_right_arr:['频谱','包络谱'],
          channel_arr:['channel1','channel2','channel3'],

          //切换页面状态标记
          change_flag: true,

          
      }
  },


  watch:{
    current_left_chart(current_left_chart, oldval){
      echarts.init(document.getElementById('Chart_choose_left')).dispose(); // 销毁实例
      if(this.change_flag){
        if(current_left_chart === '均方根'){
          this.Drow_left_part('Chart_choose_left','时域分析',this.id_2,this.channel1_2,this.channel2_2,this.channel3_2)
        }else if(current_left_chart === '峰值'){
          this.Drow_left_part('Chart_choose_left','时域分析',this.id_3,this.channel1_3,this.channel2_3,this.channel3_3)
        }else if(current_left_chart === '峭度'){
          this.Drow_left_part('Chart_choose_left','时域分析',this.id_4,this.channel1_4,this.channel2_4,this.channel3_4)
        }
      }else{
        if(current_left_chart === '均方根'){
          this.Drow_left_part('Chart_choose_left','时域分析',this.id_2,this.channel4_2)
        }else if(current_left_chart === '峰值'){
          this.Drow_right_part('Chart_choose_left','时域分析',this.id_3,this.channel4_3)
        }else if(current_left_chart === '峭度'){
          this.Drow_right_part('Chart_choose_left','时域分析',this.id_4,this.channel4_4)
        }
      }
      
    },
    current_right_chart(current_right_chart, oldval){
        echarts.init(document.getElementById('Chart_choose_right')).dispose(); // 销毁实例
      if(this.change_flag){
        if(current_right_chart === '频谱'){
          this.Drow_left_part('Chart_choose_right','频域分析',this.id_5,this.channel1_5,this.channel2_5,this.channel3_5)
        }else if(current_right_chart === '包络谱'){
          this.Drow_left_part('Chart_choose_right','频域分析',this.id_6,this.channel1_6,this.channel2_6,this.channel3_6)
        }
      }else{
        if(current_right_chart === '频谱'){
          this.Drow_right_part('Chart_choose_right','频域分析',this.id_5,this.channel4_5)
        }else if(current_right_chart === '包络谱'){
          this.Drow_right_part('Chart_choose_right','频域分析',this.id_6,this.channel4_6)
        }
      }
    },
    change_flag(change_flag, oldval){
      if((oldval && change_flag)){
        console.log('全为真')
      }else if(!oldval && !change_flag){
        console.log('全为假')
      }else if(oldval && !change_flag){
        this.destory_chart()
        this.Drow_test1()
        this.Drow_Time_Rate('time_rate', '时频域分析', 'channel4', this.timedata[3][0], this.timedata[3][1], this.timedata[3][2])
      }else if(!oldval && change_flag){
        this.destory_chart()
        this.Drow_test()
      }
    },
    current_channel(current_channel, oldval){
      if(current_channel=='channel1'){
        this.Drow_Time_Rate('time_rate', '时频域分析', 'channel1', this.timedata[0][0], this.timedata[0][1], this.timedata[0][2])
      }else if(current_channel=='channel2'){
        this.Drow_Time_Rate('time_rate', '时频域分析', 'channel2', this.timedata[1][0], this.timedata[1][1], this.timedata[1][2])
      }else if(current_channel=='channel3'){
        this.Drow_Time_Rate('time_rate', '时频域分析', 'channel3', this.timedata[2][0], this.timedata[2][1], this.timedata[2][2])
      }
    }
  },


  methods:{

      NumFilter (value) {
        // 截取当前数据到小数点后两位
        let realVal = parseFloat(value).toFixed(2)
        return realVal
      },

      //开局默认请求数据库中的machine表
      getMachineData(){
        try{
          instance2.post("/state/move/table_names").then((response)=>{
              this.machine_arr = response.data
              this.selectedMachine = response.data[0]
              //console.log(this.selectedMachine)
              this.getAllData()
          })
        }catch (error) {
            alert("获取数据失败！请重新尝试")
        }
          
      },

      search_tran(){
        this.loading_flag = true
        this.getAllData()
      },

      getAllData(){
        try{
          var params = new URLSearchParams()
          params.append('machine_table', this.selectedMachine)
          params.append('window_size', this.window_size)
          params.append('stride', this.stride)
          params.append('method_names', "")
          instance2.post("/state/move/calculate",params).then((response)=>{

              console.log(response.data)
              
              this.id = response.data[0][0]
              this.channel1 = response.data[0][1]
              this.channel2 = response.data[0][2]
              this.channel3 = response.data[0][3]
              this.channel4 = response.data[0][4]

              this.id_2 = response.data[1][0]
              this.channel1_2 = response.data[1][1]
              this.channel2_2 = response.data[1][2]
              this.channel3_2 = response.data[1][3]
              this.channel4_2 = response.data[1][4]

              this.id_3 = response.data[2][0]
              this.channel1_3 = response.data[2][1]
              this.channel2_3 = response.data[2][2]
              this.channel3_3 = response.data[2][3]
              this.channel4_3 = response.data[2][4]
              
              this.id_4 = response.data[3][0]
              this.channel1_4 = response.data[3][1]
              this.channel2_4 = response.data[3][2]
              this.channel3_4 = response.data[3][3]
              this.channel4_4 = response.data[3][4]

              
              this.id_5 = response.data[4][0]
              this.channel1_5 = response.data[4][1]
              this.channel2_5 = response.data[4][2]
              this.channel3_5 = response.data[4][3]
              this.channel4_5 = response.data[4][4]

              
              this.id_6 = response.data[5][0]
              this.channel1_6 = response.data[5][1]
              this.channel2_6 = response.data[5][2]
              this.channel3_6 = response.data[5][3]
              this.channel4_6 = response.data[5][4]

              this.timedata = response.data[6]

              
              this.Drow_test()
              
              this.loading_flag = false

          })
        }catch (error) {
            alert("获取数据失败！请重新尝试")
        }
      },
      
      //排序数据
      sorterItems(){
          return this.items.sort((a,b)=>{
              if(a.id<b.id){
                  return -1;
              }else if(a.id>b.id){
                  return 1;
              }else{
                  return 0;
              }
          })
      },

      Drow_test(){
        this.Drow_left_part('Chart_top_left','主轴变速齿轮箱震动加速度(g)',this.id,this.channel1,this.channel2,this.channel3)
        this.Drow_left_part('Chart_choose_left','时域分析',this.id_2,this.channel1_2,this.channel2_2,this.channel3_2)
        this.Drow_left_part('Chart_choose_right','频域分析',this.id_5,this.channel1_5,this.channel2_5,this.channel3_5)
        this.Drow_Time_Rate('time_rate', '时频域分析', 'channel1', this.timedata[0][0], this.timedata[0][1], this.timedata[0][2])
      },

      Drow_test1(){
          this.Drow_right_part('Chart_top_left','主轴前轴承加速度(g)',this.id,this.channel4)
          this.Drow_left_part('Chart_choose_left','时域分析',this.id_2,this.channel4_2)
          this.Drow_right_part('Chart_choose_right','频域分析',this.id_5,this.channel4_5)
      },

      Drow_left_part(char_element,title_text,arr_xAxis,data_channel1,data_channel2,data_channel3){
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
              data: ['Channel1', 'Channel2', 'Channel3']
              //selectedMode: 'single'
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
                name: 'Channel1',
                type: 'line',
                data: data_channel1
              },
              {
                name: 'Channel2',
                type: 'line',
                data: data_channel2
              },
              {
                name: 'Channel3',
                type: 'line',
                data: data_channel3
              },
            ]
          })
          } catch (error) {
            console.log(error)
          }
      },
      
      Drow_right_part(char_element,title_text,arr_xAxis,data_channel4){
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
              data: ['Channel4']
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
                name: 'Channel4',
                type: 'line',
                data: data_channel4
              },
            ]
          })
          } catch (error) {
            console.log(error)
          }
      },  

      Drow_Time_Rate(char_element, title_text, channel, x_data, y_data, data){
        //初始化实例
          try {
            let chart_1 = this.$echarts.init(document.getElementById(char_element))
            chart_1.setOption({
            tooltip: {},
              xAxis: {
                type: 'category',
                data: x_data
              },
              yAxis: {
                type: 'category',
                data: y_data
              },
              title: {
                text: title_text
              },
              visualMap: {
                left: 'right',
                min: 0,
                max: 1,
                calculable: true,
                realtime: false,
                inRange: {
                  color: [
                    '#313695',
                    '#4575b4',
                    '#74add1',
                    '#abd9e9',
                    '#e0f3f8',
                    '#ffffbf',
                    '#fee090',
                    '#fdae61',
                    '#f46d43',
                    '#d73027',
                    '#a50026'
                  ]
                }
              },
              series: [
                {
                  name: channel,
                  type: 'heatmap',
                  data: data,
                  emphasis: {
                    itemStyle: {
                      borderColor: '#333',
                      borderWidth: 1
                    }
                  },
                  progressive: 1000,
                  animation: false
                }
              ],
              legend:{
                padding:[0,50,0,0]
              },
            })

          } catch (error) {
            console.log(error)
          }
      },

      change_flag1(){
          this.change_flag = true
      },
      change_flag2(){
          this.change_flag = false
      },
      destory_chart(){
        let myChart1= echarts.getInstanceByDom(document.getElementById('Chart_choose_left'));
        let myChart2= echarts.getInstanceByDom(document.getElementById('Chart_choose_right'));
        let myChart3= echarts.getInstanceByDom(document.getElementById('Chart_top_left'));
        let myChart4= echarts.getInstanceByDom(document.getElementById('time_rate'));
        myChart1.dispose()
        myChart2.dispose()
        myChart3.dispose()
        myChart4.dispose()

      },
      handleClick_1(tab, event) {
        if(tab.name=='first'){
          this.change_flag1()
        }else{
          this.change_flag2()
        }
      }

      },
}

</script>

<style>


.settingBox{
float: left;
width: 100%;
border: 2px dashed rgba(128, 133, 134, 0.5);
border-radius: 15px;
margin-bottom: 5px;
text-align: center;
height: 80px;
}

.watching_1{
float: left;
width: 65%;
margin-left: 20px;
margin-top: 5px;
margin-bottom: 5px;
}
.watching_2{
float: left;
width: 33%;
margin-top: 5px;
margin-bottom: 5px;
}

.choose{
  float: left;
  width: 70%;
  height: 30px;
  line-height: 30px;
  margin-top: 5px;
  margin-left: 20px;
}

.watching_1_title{
float: left;
height: 30px;
line-height: 30px;
}

.watching_tem{
float: left;

}

.watching_tem_item{
float: left;
height: 30px;
line-height: 30px;
margin-left: 50px;
}

.dotClass {
width:30px;
height:30px;
border-radius: 50%;
float: left;
margin-left: 10px;
margin-right: 5px;
margin-top: 1px;
}

.chartBox{
float: left;
width: 100%;
border: 2px dashed rgba(128, 133, 134, 0.5); 
border-radius: 15px;
}

.elc_setting{
border: 2px dashed rgba(128, 133, 134, 0.5); 
border-radius: 15px;
width: 38%;
float: right;

}

.chart_tem1{
border-radius: 15px;
float: left;
}

.liq_setting{
border: 2px dashed rgba(128, 133, 134, 0.5); 
border-radius: 15px;
width: 38%;
float: right;
height: 30%;
margin-top: 5px;
}

.chan_setting{
float: right;
}

.settingBox div{
  font-size:large;
}

</style>