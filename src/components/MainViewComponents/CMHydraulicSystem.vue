<!-- 本组件用于在main.vue中显示监测液压系统相关内容 -->

<template>
    
  <div style="float: left; width: 100%; height: 100%;">

      <!-- 油品监测 -->
      <div class="quality_oil">
        <div class="title">油品监测</div>

        <div>
          <div class="lable">液压油颗粒度</div>
          <div>
            <span v-if="oil_quality_status_1">
                <i class="dotClass" style="background-color: springgreen">{{ this.oil_quality_data_1 }}</i>
            </span>
            <span  v-if="!oil_quality_status_1" >
                <i class="dotClass" style="background-color: red">{{ this.oil_quality_data_1 }}</i>
            </span>
          </div>
        </div>
        
        <div>
          <div class="lable">液压油粘度</div>
          <div>
            <span v-if="oil_quality_status_2">
                <i class="dotClass" style="background-color: springgreen">{{ this.oil_quality_data_2 }}</i>
            </span>
            <span  v-if="!oil_quality_status_2" >
                <i class="dotClass" style="background-color: red">{{ this.oil_quality_data_2 }}</i>
            </span>
          </div>
        </div>

        <div>
          <div class="lable">液压油温度</div>
          <div>
            <span v-if="oil_quality_status_3">
                <i class="dotClass" style="background-color: springgreen">{{ this.oil_quality_data_3 }}</i>
            </span>
            <span  v-if="!oil_quality_status_3" >
                <i class="dotClass" style="background-color: red">{{ this.oil_quality_data_3 }}</i>
            </span>
          </div>
        </div>

        <div>
          <div class="lable">液压油水分</div>
          <div>
            <span v-if="oil_quality_status_4">
                <i class="dotClass" style="background-color: springgreen">{{ this.oil_quality_data_4 }}</i>
            </span>
            <span  v-if="!oil_quality_status_4" >
                <i class="dotClass" style="background-color: red">{{ this.oil_quality_data_4 }}</i>
            </span>
          </div>
        </div>

        <div>
          <div class="lable">油水混合</div>
          <div>
            <span v-if="oil_quality_status_5">
                <i class="dotClass" style="background-color: springgreen"></i>
            </span>
            <span  v-if="!oil_quality_status_5" >
                <i class="dotClass" style="background-color: red"></i>
            </span>
          </div>
        </div>



      </div>


      <!-- 流量监测 -->
      <div class="flow_monitoring">

        <div class="title">流量监测</div>

        <div>
          <div class="lable">主变速箱润滑流量 Q1</div>
          <div>
            <span v-if="flow_monitoring_Q1_status">
                <i class="dotClass" style="background-color: springgreen"></i>
            </span>
            <span  v-if="!flow_monitoring_Q1_status" >
                <i class="dotClass" style="background-color: red"></i>
            </span>
          </div>
        </div>

        <div>
          <div class="lable">循环冷却套流量Q2/Q3/Q4</div>
          <div>
            <span v-if="flow_monitoring_Q234_status">
                <i class="dotClass" style="background-color: springgreen"></i>
            </span>
            <span  v-if="!flow_monitoring_Q234_status" >
                <i class="dotClass" style="background-color: red"></i>
            </span>
          </div>
        </div>
        
        <div>
          <div class="lable">X轴传动箱润滑流量Q5</div>
          <div>
            <span v-if="flow_monitoring_Q5_status">
                <i class="dotClass" style="background-color: springgreen"></i>
            </span>
            <span  v-if="!flow_monitoring_Q5_status" >
                <i class="dotClass" style="background-color: red"></i>
            </span>
          </div>
        </div>

        <div>
          <div class="lable">Y轴传动箱润滑流量Q6</div>
          <div>
            <span v-if="flow_monitoring_Q6_status">
                <i class="dotClass" style="background-color: springgreen"></i>
            </span>
            <span  v-if="!flow_monitoring_Q6_status" >
                <i class="dotClass" style="background-color: red"></i>
            </span>
          </div>
        </div>

        <div>
          <div class="lable">管路滤油器发讯器</div>
          <div>
            <span v-if="flow_monitoring_status">
                <i class="dotClass" style="background-color: springgreen"></i>
            </span>
            <span  v-if="!flow_monitoring_status" >
                <i class="dotClass" style="background-color: red"></i>
            </span>
          </div>
        </div>

      </div>  

      <!-- 油路压力监测 -->
      <div class="oil_road_pressure_monitoring">
        <div class="title">主轴压力监测</div>

        <div class="cube">
          <div class="lable">主轴箱平衡补偿压力</div>
          <div>
            <span v-if="preessure_spindle_status">
                <i class="dotClass" style="background-color: springgreen">{{ this.preessure_spindle }}</i>
            </span>
            <span  v-if="!preessure_spindle_status" >
                <i class="dotClass" style="background-color: red">{{ this.preessure_spindle }}</i>
            </span>
          </div>
        </div>

        <div class="cube">
          <div class="lable">滑枕平衡补偿压力</div>
          <div>
            <span v-if="preessure_compensate_status">
                <i class="dotClass" style="background-color: springgreen">{{ this.preessure_compensate }}</i>
            </span>
            <span  v-if="!preessure_compensate_status" >
                <i class="dotClass" style="background-color: red">{{ this.preessure_compensate }}</i>
            </span>
          </div>
        </div>

      </div>

      <!-- 油压检测 -->
      <div class="oil_pressure_monitoring">

        <div class="title" style="font-size: large;">油压监测</div>
        <div class="part_1">

          <div class="cube">
            <div class="lable">地坑油泵压力P0</div>
            <div>
              <span v-if="oil_pressure_p0">
                  <i class="dotClass" style="background-color: springgreen"></i>
              </span>
              <span  v-if="!oil_pressure_p0" >
                  <i class="dotClass" style="background-color: red"></i>
              </span>
            </div>
          </div>

          <div class="cube">
            <div class="lable">L3油泵压力P1</div>
              <div>
                <span v-if="oil_pressure_p1">
                    <i class="dotClass" style="background-color: springgreen"></i>
                </span>
                <span  v-if="!oil_pressure_p1" >
                    <i class="dotClass" style="background-color: red"></i>
                </span>
              </div>
            </div>

            <div class="cube">
              <div class="lable">L2油泵压力P2</div>
                <div>
                  <span v-if="oil_pressure_p2">
                      <i class="dotClass" style="background-color: springgreen"></i>
                  </span>
                  <span  v-if="!oil_pressure_p2" >
                      <i class="dotClass" style="background-color: red"></i>
                  </span>
                </div>
            </div>

            <div class="cube">
              <div class="lable">L8油泵压力P3</div>
              <div>
                <span v-if="oil_pressure_p3">
                    <i class="dotClass" style="background-color: springgreen"></i>
                </span>
                <span  v-if="!oil_pressure_p3" >
                    <i class="dotClass" style="background-color: red"></i>
                </span>
              </div>
            </div>

        </div>


        <div class="part_2">

          <div class="cube">
              <div class="lable">多头泵入口1压力</div>
              <div>
                <span v-if="pump_entrance_pressure1">
                    <i class="dotClass" style="background-color: springgreen"></i>
                </span>
                <span  v-if="!pump_entrance_pressure1" >
                    <i class="dotClass" style="background-color: red"></i>
                </span>
              </div>
          </div>

          <div class="cube">
              <div class="lable">多头泵入口2压力</div>
              <div>
                <span v-if="pump_entrance_pressure2">
                    <i class="dotClass" style="background-color: springgreen"></i>
                </span>
                <span  v-if="!pump_entrance_pressure2" >
                    <i class="dotClass" style="background-color: red"></i>
                </span>
              </div>
          </div>

          <div class="cube">
              <div class="lable">多头泵入口3压力</div>
              <div>
                <span v-if="pump_entrance_pressure3">
                    <i class="dotClass" style="background-color: springgreen"></i>
                </span>
                <span  v-if="!pump_entrance_pressure3" >
                    <i class="dotClass" style="background-color: red"></i>
                </span>
              </div>
          </div>


        </div>  

        <div class="part_3">

          <div class="cube">
              <div class="lable">多头泵出口1压力</div>
              <div>
                <span v-if="pump_exit_pressure1">
                    <i class="dotClass" style="background-color: springgreen"></i>
                </span>
                <span  v-if="!pump_exit_pressure1" >
                    <i class="dotClass" style="background-color: red"></i>
                </span>
              </div>
          </div>

          <div class="cube">
              <div class="lable">多头泵出口2压力</div>
              <div>
                <span v-if="pump_exit_pressure2">
                    <i class="dotClass" style="background-color: springgreen"></i>
                </span>
                <span  v-if="!pump_exit_pressure2" >
                    <i class="dotClass" style="background-color: red"></i>
                </span>
              </div>
          </div>

          <div class="cube">
              <div class="lable">多头泵出口3压力</div>
              <div>
                <span v-if="pump_exit_pressure3">
                    <i class="dotClass" style="background-color: springgreen"></i>
                </span>
                <span  v-if="!pump_exit_pressure3" >
                    <i class="dotClass" style="background-color: red"></i>
                </span>
              </div>
          </div>

          <div class="cube">
              <div class="lable">多头泵出口4压力</div>
              <div>
                <span v-if="pump_exit_pressure4">
                    <i class="dotClass" style="background-color: springgreen"></i>
                </span>
                <span  v-if="!pump_exit_pressure4" >
                    <i class="dotClass" style="background-color: red"></i>
                </span>
              </div>
          </div>

          <div class="cube">
              <div class="lable">多头泵出口5压力</div>
              <div>
                <span v-if="pump_exit_pressure5">
                    <i class="dotClass" style="background-color: springgreen"></i>
                </span>
                <span  v-if="!pump_exit_pressure5" >
                    <i class="dotClass" style="background-color: red"></i>
                </span>
              </div>
          </div>

          <div class="cube">
              <div class="lable">多头泵出口6压力</div>
              <div>
                <span v-if="pump_exit_pressure6">
                    <i class="dotClass" style="background-color: springgreen"></i>
                </span>
                <span  v-if="!pump_exit_pressure6" >
                    <i class="dotClass" style="background-color: red"></i>
                </span>
              </div>
          </div>


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
      
  },
  data:function(){
      return{
        

        //油品监测相关指标
        oil_quality_data_1:0,
        oil_quality_data_2:0,
        oil_quality_data_3:0,
        oil_quality_data_4:0,
        oil_quality_status_1:true,
        oil_quality_status_2:true,
        oil_quality_status_3:true,
        oil_quality_status_4:true,
        oil_quality_status_5:false,
          
        //流量监测相关指标
        flow_monitoring_Q1_status:false,
        flow_monitoring_Q234_status:true,
        flow_monitoring_Q5_status:true,
        flow_monitoring_Q6_status:true,
        flow_monitoring_status:true,

        //主轴压力监测相关指标
        preessure_spindle_status:false,
        preessure_compensate_status:true,
        preessure_spindle:0,
        preessure_compensate:0,
        

        //油压检测相关指标
        oil_pressure_p0:true,
        oil_pressure_p1:true,
        oil_pressure_p2:true,
        oil_pressure_p3:true,
        pump_entrance_pressure1:false,
        pump_entrance_pressure2:true,
        pump_entrance_pressure3:true,
        pump_exit_pressure1:true,
        pump_exit_pressure2:true,
        pump_exit_pressure3:true,
        pump_exit_pressure4:true,
        pump_exit_pressure5:true,
        pump_exit_pressure6:true,



      }
  },





  methods:{
 
      
  },
}

</script>

<style>

.quality_oil{
  border: 2px dashed rgba(128, 133, 134, 0.5);
  border-radius: 15px;
  width: 32%;
  float: left;
  margin-right: 1.5%;
  margin-top: 50px;

}

.flow_monitoring{
  border: 2px dashed rgba(128, 133, 134, 0.5);
  border-radius: 15px;
  width: 32%;
  float: left;
  margin-right: 1.5%;
  margin-top: 50px;

}

.oil_road_pressure_monitoring{
  border: 2px dashed rgba(128, 133, 134, 0.5);
  border-radius: 15px;
  width: 32%;
  float: left;
  margin-top: 50px;

}

.oil_pressure_monitoring{
  border: 2px dashed rgba(128, 133, 134, 0.5);
  border-radius: 15px;
  width: 100%;
  float: left;
  margin-top: 50px;
}

.title{
  margin-top: 10px;
  margin-bottom: 10px;
}

.part_1{
  border: 2px dashed rgba(128, 133, 134, 0.5);
  border-radius: 15px;
  float: left;
  width: 33%;
  margin: auto;
  margin-top: 30px;
}

.part_2{
  float: left;
  border: 2px dashed rgba(128, 133, 134, 0.5);
  border-radius: 15px;
  width: 33%;
  margin: auto;
  margin-top: 30px;
  
}

.part_3{
  float: left;
  border: 2px dashed rgba(128, 133, 134, 0.5);
  border-radius: 15px;
  width: 33%;
  margin: auto;
  margin-top: 30px;
  
}

.lable{
  float: left;
  width: 50%;
  text-align: left;
  margin-left: 20%;
}

.cube{
  margin-top: 10px;
  margin-bottom: 10px;
}

i{
  font-size: larger;
  font-style: normal;
  line-height: 30px;
}


</style>