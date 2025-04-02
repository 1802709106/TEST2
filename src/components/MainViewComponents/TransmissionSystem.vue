<!-- 本组件用于在main.vue中显示传动系统相关内容 -->

<template>
  <div>
    <template style="text-align: center; height: 30px; margin-top: -10px;">
      <el-tabs v-model="change_judge_method" @tab-click="handleClick">
        <el-tab-pane label="信号处理方法诊断" name="first"></el-tab-pane>
        <el-tab-pane label="机器学习方法诊断" name="second"></el-tab-pane>
        <el-tab-pane label="信号处理方法" name="third"></el-tab-pane>
      </el-tabs>
    </template>
    <div v-show="change_method_flag == 1" style="height: 100%;">
      <div class="left_setting border_class" style="float: left; width: 30%;">
        <div style="display: flex; margin: 10px 0 10px 0">
          <div style="line-height: 40px;width: 30%;">数据选择: </div>
          <template class="">
            <el-select v-model="first_data.current_data_choose" placeholder="请选择数据" @change="change_data_choose">
              <el-option v-for="item in data_choose" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </div>
        <div style="margin: 10px 20px 5px 5px; width: 95%;">
          <div style="width: 100%;">
            <template>
              <div class="block">
                <el-slider v-model="first_data.area_choose" range show-stops :max="first_data.choose_length">
                </el-slider>
              </div>
            </template>
          </div>
          <div style="">
            <div v-show=disabled><el-button @click="first_begin_judge" disabled
                style=" text-align: center;">开始诊断</el-button></div>
            <div v-show=!disabled><el-button @click="first_begin_judge" style=" text-align: center;">开始诊断</el-button>
            </div>
          </div>
        </div>

        <div class="border_class" style="display: flex; width: 99%; margin-bottom: 10px;">
          <div style="width: 50%;">主轴转速: {{ NumFilter(first_data.Eigenfrequency.run_rate) }} rpm</div>
          <div style="width: 50%;">主轴转频: {{ NumFilter(first_data.Eigenfrequency.run_freq) }} Hz</div>
        </div>
        <div class="border_class" style="display: flex; width: 99%; margin-bottom: 10px;">
          <div style="width: 50%;">挡位：{{ first_data.Eigenfrequency.gear }}档</div>
          <div style="width: 50%;">电机转速：{{ NumFilter(first_data.Eigenfrequency.motor_speed) }} rpm</div>
        </div>
        <!-- 这里把40改45 -->
        <div class="border_class" style="width: 99%;">
          <div style="display: flex;">
            <div style="width: 58%; text-align: right;">Ⅰ&Ⅱ轴齿轮啮合频率: </div>
            <div style="width: 40%; ">{{ NumFilter(first_data.Eigenfrequency['engage_freq'].ax12) }} Hz</div>
          </div>
          <div style="display: flex;">
            <div style="width: 58%; text-align: right;">Ⅱ&Ⅲ轴齿轮啮合频率: </div>
            <div style="width: 40%; ">{{ NumFilter(first_data.Eigenfrequency['engage_freq'].ax23) }} Hz</div>
          </div>
        </div>
        <div class="border_class" style="width: 99%;">
          <div style="display: flex;">
            <div style="width: 40%; text-align: right;">Ⅰ轴转速: </div>
            <div style="width: 60%; ">{{ NumFilter(first_data.Eigenfrequency['ax_rates'][0]) }} rpm</div>
          </div>
          <div style="display: flex;">
            <div style="width: 40%; text-align: right;">Ⅱ轴转速: </div>
            <div style="width: 60%; ">{{ NumFilter(first_data.Eigenfrequency['ax_rates'][1]) }} rpm</div>
          </div>
          <div style="display: flex;">
            <div style="width: 40%; text-align: right;">Ⅲ轴转速: </div>
            <div style="width: 60%; ">{{ NumFilter(first_data.Eigenfrequency['ax_rates'][2]) }} rpm</div>
          </div>
        </div>
        <div>
          <div class="border_class" style="margin-bottom: 5px; width: 99%;">轴承故障特征频率</div>
          <div>
            <div class="border_class" style="width: 48%; float: left;">
              <div style="width: 100%;">
                <!-- 下面六组的30改35 -->
                <div class="little_title_ping">7212ACD/P4A轴承</div>
                <div style="display: flex;">
                  <div style="width: 40%; text-align: right;">内环: </div>
                  <div style="width: 55%; text-align: right;">{{
                    NumFilter(first_data.Eigenfrequency['freq'][7212].in_freq)
                    }} Hz</div>
                </div>
                <div style="display: flex;">
                  <div style="width: 40%; text-align: right;">外环: </div>
                  <div style="width: 55%; text-align: right;">{{
                    NumFilter(first_data.Eigenfrequency['freq'][7212].out_freq)
                    }} Hz</div>
                </div>
                <div style="display: flex;">
                  <div style="width: 40%; text-align: right;">滚动体: </div>
                  <div style="width:55%; text-align: right; ">{{
                    NumFilter(first_data.Eigenfrequency['freq'][7212].rolling_freq) }} Hz</div>
                </div>
                <div style="display: flex;">
                  <div style="width: 40%; text-align: right;">保持架: </div>
                  <div style="width: 55%; text-align: right; ">{{
                    NumFilter(first_data.Eigenfrequency['freq'][7212].cage_freq) }} Hz</div>
                </div>
              </div>
              <div style="width: 100%;">
                <div class="little_title_ping">7214ACD/P4A轴承</div>
                <div style="display: flex;">
                  <div style="width: 40%; text-align: right;">内环: </div>
                  <div style="width: 55%; text-align: right; ">{{
                    NumFilter(first_data.Eigenfrequency['freq'][7214].in_freq)
                    }} Hz</div>
                </div>
                <div style="display: flex;">
                  <div style="width: 40%; text-align: right;">外环: </div>
                  <div style="width: 55%; text-align: right; ">{{
                    NumFilter(first_data.Eigenfrequency['freq'][7214].out_freq) }} Hz</div>
                </div>
                <div style="display: flex;">
                  <div style="width: 40%; text-align: right;">滚动体: </div>
                  <div style="width: 55%; text-align: right; ">{{
                    NumFilter(first_data.Eigenfrequency['freq'][7214].rolling_freq) }} Hz</div>
                </div>
                <div style="display: flex;">
                  <div style="width: 40%; text-align: right;">保持架: </div>
                  <div style="width: 55%; text-align: right; ">{{
                    NumFilter(first_data.Eigenfrequency['freq'][7214].cage_freq) }} Hz</div>
                </div>
              </div>
              <div style="width: 100%;">
                <div class="little_title_ping">7019ACD/P4A轴承</div>
                <div style="display: flex;">
                  <div style="width: 40%; text-align: right;">内环: </div>
                  <div style="width: 55%; text-align: right; ">{{
                    NumFilter(first_data.Eigenfrequency['freq'][7019].in_freq)
                    }} Hz</div>
                </div>
                <div style="display: flex;">
                  <div style="width: 40%; text-align: right;">外环: </div>
                  <div style="width: 55%; text-align: right; ">{{
                    NumFilter(first_data.Eigenfrequency['freq'][7019].out_freq) }} Hz</div>
                </div>
                <div style="display: flex;">
                  <div style="width: 40%; text-align: right;">滚动体: </div>
                  <div style="width: 55%; text-align: right; ">{{
                    NumFilter(first_data.Eigenfrequency['freq'][7019].rolling_freq) }} Hz</div>
                </div>
                <div style="display: flex;">
                  <div style="width: 40%; text-align: right;">保持架: </div>
                  <div style="width: 55%; text-align: right; ">{{
                    NumFilter(first_data.Eigenfrequency['freq'][7019].cage_freq) }} Hz</div>
                </div>
              </div>
            </div>
            <div class="border_class" style="width: 48%; float: right;">
              <div style="width: 100%;">
                <div class="little_title_ping">6216ACD/P4A轴承</div>
                <div style="display: flex;">
                  <div style="width: 40%; text-align: right;">内环: </div>
                  <div style="width: 55%; text-align: right; ">{{
                    NumFilter(first_data.Eigenfrequency['freq'][6216].in_freq)
                    }} Hz</div>
                </div>
                <div style="display: flex;">
                  <div style="width: 40%; text-align: right;">外环: </div>
                  <div style="width: 55%; text-align: right; ">{{
                    NumFilter(first_data.Eigenfrequency['freq'][6216].out_freq) }} Hz</div>
                </div>
                <div style="display: flex;">
                  <div style="width: 40%; text-align: right;">滚动体: </div>
                  <div style="width: 55%; text-align: right; ">{{
                    NumFilter(first_data.Eigenfrequency['freq'][6216].rolling_freq) }} Hz</div>
                </div>
                <div style="display: flex;">
                  <div style="width: 40%; text-align: right;">保持架: </div>
                  <div style="width: 55%; text-align: right; ">{{
                    NumFilter(first_data.Eigenfrequency['freq'][6216].cage_freq) }} Hz</div>
                </div>
              </div>
              <div style="width: 100%;">
                <div class="little_title_ping">NU1019-M1</div>
                <div style="display: flex;">
                  <div style="width: 40%; text-align: right;">内环: </div>
                  <div style="width: 55%; text-align: right; ">{{
                    NumFilter(first_data.Eigenfrequency['freq'][1019].in_freq)
                    }} Hz</div>
                </div>
                <div style="display: flex;">
                  <div style="width: 40%; text-align: right;">外环: </div>
                  <div style="width: 55%; text-align: right; ">{{
                    NumFilter(first_data.Eigenfrequency['freq'][1019].out_freq) }} Hz</div>
                </div>
                <div style="display: flex;">
                  <div style="width: 40%; text-align: right;">滚动体: </div>
                  <div style="width: 55%; text-align: right; ">{{
                    NumFilter(first_data.Eigenfrequency['freq'][1019].rolling_freq) }} Hz</div>
                </div>
                <div style="display: flex;">
                  <div style="width: 40%; text-align: right;">保持架: </div>
                  <div style="width: 55%; text-align: right; ">{{
                    NumFilter(first_data.Eigenfrequency['freq'][1019].cage_freq) }} Hz</div>
                </div>
              </div>
              <div style="width: 100%;">
                <div class="little_title_ping">7016ACD/P4A轴承</div>
                <div style="display: flex;">
                  <div style="width: 40%; text-align: right;">内环: </div>
                  <div style="width: 55%; text-align: right; ">{{
                    NumFilter(first_data.Eigenfrequency['freq'][7016].in_freq)
                    }} Hz</div>
                </div>
                <div style="display: flex;">
                  <div style="width: 40%; text-align: right;">外环: </div>
                  <div style="width: 55%; text-align: right; ">{{
                    NumFilter(first_data.Eigenfrequency['freq'][7016].out_freq) }} Hz</div>
                </div>
                <div style="display: flex;">
                  <div style="width: 40%; text-align: right;">滚动体: </div>
                  <div style="width: 55%; text-align: right; ">{{
                    NumFilter(first_data.Eigenfrequency['freq'][7016].rolling_freq) }} Hz</div>
                </div>
                <div style="display: flex;">
                  <div style="width: 40%; text-align: right;">保持架: </div>
                  <div style="width: 55%; text-align: right; ">{{
                    NumFilter(first_data.Eigenfrequency['freq'][7016].cage_freq) }} Hz</div>
                </div>
              </div>
            </div>
          </div>
          <div>

          </div>
        </div>
      </div>

      <div class="right_four_pic" style="float: right; width: 68%;" v-loading="first_data.right_loading"
        element-loading-text="暂未开始诊断或诊断中" element-loading-spinner="el-icon-loading"
        element-loading-background="#f5f5f5">
        <div>
          <div id="first_top_chart" style="width: 100%; height: 350px; padding-left: 10px; padding-top: 10px;"></div>
        </div>
        <div>
          <div id="first_button_chart" style="width: 100%; height: 350px; padding-left: 10px; padding-top: 10px;"></div>
        </div>
      </div>
    </div>
    <div v-show="change_method_flag == 2">
      <div class="MLmainpart">
        <div class="top_part border_class" style="display: flex; text-align: center;">
          <div style="display: flex; padding-top: 10px; padding-bottom: 10px; padding-left: 10px;">
            <div style="display: flex;">
              <div style="line-height: 40px;">数据选择 : </div>
              <template>
                <el-select v-model="current_data_choose" placeholder="请选择">
                  <el-option v-for="item in data_choose" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </div>
            <div style="display: flex; margin-left: 180px;">
              <div style="line-height: 40px;">采样数 : </div>
              <div>
                <el-input v-model="Number_of_samples" placeholder="请输入采样数"></el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="middle" style="display: flex;">
          <div class="middle_leftpart border_class" style="padding-top: 10px; padding-bottom: 10px;">
            <div style="float: left; margin-left: 15%; width: 20%; line-height: 40px;">诊断特征选择</div>
            <div style="float: left; width: 50%;">
              <el-radio-group v-model="methods" @change="methodChange">
                <el-radio-button label="原始数据"></el-radio-button>
                <el-radio-button label="傅里叶变换"></el-radio-button>
                <el-radio-button label="小波包分解"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="middle_rightpart border_class" style="padding-top: 10px; padding-bottom: 10px;">
            <div style="float: left; margin-left: 5%; width: 20%; line-height: 40px;">算法模型选择</div>
            <div>
              <template>
                <el-select v-model="real_model" placeholder="请在选择诊断数据和诊断特征后，选择算法模型。">
                  <el-option v-for="item in model_choose_copy" :key="item.value" :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </div>
          </div>
        </div>
        <div class="judge_part border_class">
          <div style="display: flex; padding-top: 10px; padding-bottom: 10px;">
            <div style=" margin-left: 9%;">
              <el-button @click="begin_judge" style="text-align: center;">开始诊断</el-button>
            </div>
            <div>
              <div style="line-height: 40px; margin-left: 490px;">诊断结果 : {{ this.judge_result[current_error_index] }}
              </div>
            </div>
          </div>
        </div>
        <div class="buttonpart border_class" v-loading="judge_loading" element-loading-text="诊断中，请稍后。"
          element-loading-spinner="el-icon-loading" element-loading-background="#f5f5f5">
          <div class="button_leftpart" style="padding-left: 10px; padding-top: 10px;">
            <div class="chartBox1">
              <div id="Chart_left" style="width: 100%; height: 320px; padding-left: 10px; padding-top: 10px;"></div>
            </div>
          </div>
          <div class="button_rightpart" style="padding-left: 10px; padding-top: 10px;">
            <div class="chartBox2">
              <div id="Chart_right" style="width: 100%; height: 320px; padding-left: 10px; padding-top: 10px;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="change_method_flag == 3">
      <div>
        <div class="settingBox" style="float: left; height: 40px;">
          <div class="choose">
            <div style="float: left; width: 100%;">
              <div style="float: left; margin-right: 30px;">选择分析数据:</div>
              <div style="float: left; width: 45%;">
                <select v-model="selectedMachine" style="height: 30px; margin-right: 20px;width: 90%;">
                  <option v-for="(machine, index) in machine_arr" :key="index" :value="machine">
                    {{ machine }}
                  </option>
                </select>
              </div>
              <div class="select_windows">
                <div style="float: left; margin-left: 4px; margin-right: 20px;">窗口大小:</div>
                <el-input v-model="window_size" placeholder=""
                  style="width: 80px; float: left; margin-top: -5px;margin-right: 30px;"></el-input>
                <div style="float: left; margin-left: -10px;margin-right: 20px;">步长:</div>
                <el-input v-model="stride" placeholder=""
                  style="width: 80px; float: left; margin-top: -5px; margin-right: 50px;"></el-input>
                <el-button @click="search_tran"
                  style="width: 80px; text-align: center; margin-top: -5px;">查询</el-button>
              </div>
            </div>
          </div>
        </div>

        <div class="chartBox" v-loading="loading_flag">
          <div
            style="display: flex; justify-content: center; align-items: center; margin-top: 0px; margin-bottom: -15px;">
            <el-tabs v-model="activeName" @tab-click="handleClick_1" style="text-align: center;">
              <el-tab-pane label="主轴变齿轮速箱" name="first" style="width: 120px;"></el-tab-pane>
              <el-tab-pane label="主轴前轴承" name="second" style="width: 120px;"></el-tab-pane>
            </el-tabs>
          </div>
          <div>
            <div class="chartBox1">
              <div id="Chart_top_left"
                style="width: 50%; height: 350px; float: left; border-top: 2px solid rgba(128, 133, 134, 0.5);"></div>
            </div>
            <div>
              <div>
                <select v-model="current_left_chart"
                  style="height: 30px; margin-right: 30px;margin-top: 5px; position: absolute; left: 90%; z-index: 3;">
                  <option v-for="(chart_left, index) in chart_left_arr" :key="index" :value="chart_left">
                    {{ chart_left }}
                  </option>
                </select>
              </div>
              <div class="choosepart" style="height: 350px;">
                <div class="chartBox2">
                  <div id="Chart_choose_left"
                    style="width: 50%; height: 350px; float: left; border-top: 2px solid rgba(128, 133, 134, 0.5);">
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <select v-model="current_right_chart" style="height: 30px; position: absolute; left: 49%; z-index: 3;">
                  <option v-for="(chart_right, index) in chart_right_arr" :key="index" :value="chart_right">
                    {{ chart_right }}
                  </option>
                </select>
              </div>
              <div v-if="change_flag">
                <select v-model="current_channel" style="height: 30px; position: absolute; left: 90%; z-index: 3;">
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
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { TrackOpTypes } from 'vue';
import { instance1, instance2 } from '../axiosInstances'
import * as echarts from 'echarts'
import dayjs from 'dayjs'

export default {
  name: 'ConditionMonitoring',
  components: {

  },
  mounted: function () {
    this.getMachineData()
    this.getMainTransInfo()
    this.Drow_Scatter_plot("Chart_left", "散点图", this.point_data)
    this.Drow_radar("Chart_right", "故障雷达", this.judge_data, this.indicator1)

  },
  created: function () {

  },
  data: function () {
    return {
      //按钮禁止标记
      disabled: true,
      //此处开始是第一个页面的数据
      first_data: {
        current_data_choose: "",
        //滑动窗数据
        choose_length: 100,
        table_length: 0,
        area_choose: [4, 8],
        //主轴转速、转频
        Spindle_speed: 0,
        Spindle_frequency: 0,
        //特征频率数据
        Eigenfrequency: {
          "ax_rates": [
            0,
            0,
            0
          ],
          "engage_freq": {
            "ax12": 0,
            "ax23": 0
          },
          "freq": {
            "1019": {
              "cage_freq": 0,
              "in_freq": 0,
              "out_freq": 0,
              "rolling_freq": 0
            },
            "6216": {
              "cage_freq": 0,
              "in_freq": 0,
              "out_freq": 0,
              "rolling_freq": 0
            },
            "7016": {
              "cage_freq": 0,
              "in_freq": 0,
              "out_freq": 0,
              "rolling_freq": 0
            },
            "7019": {
              "cage_freq": 0,
              "in_freq": 0,
              "out_freq": 0,
              "rolling_freq": 0
            },
            "7212": {
              "cage_freq": 0,
              "in_freq": 0,
              "out_freq": 0,
              "rolling_freq": 0
            },
            "7214": {
              "cage_freq": 0,
              "in_freq": 0,
              "out_freq": 0,
              "rolling_freq": 0
            },
          },
          "gear": 0,
          "motor_speed": 0,
          "run_freq": 0,
          "run_rate": 0,

        },
        //右边图的数据
        pic_data: [],
        //右边加载标记
        right_loading: true,
      },



      //此处开始是第二个页面的数据
      // 用于切换诊断方法的标记
      change_method_flag: 1,
      change_judge_method: "first",

      //数据选择数组
      data_choose: [],
      current_data_choose: "",


      //采样数默认临时变量
      Number_of_samples: 16,

      //诊断方法的选择
      methods: [
        {
          method1: '原始数据',
          method2: '傅里叶变换',
          method3: '小波包分解',
        }
      ],


      //模型选择数组
      model_choose: [],
      current_choose: [],
      model_choose_copy: [],
      real_model: '',

      //诊断结果数组
      current_error_index: 0,
      judge_result: ['未诊断', '轴承内圈', '轴承外圈', '轴承滚动体', '轴承保持架', '齿轮齿根故障', '齿轮齿面故障', '轴承保持架故障-等级1', '轴承保持架故障-等级2', '轴承保持架故障-等级3', '轴承内圈故障-等级1', '轴承内圈故障-等级2', '轴承内圈故障-等级3', '轴承外圈故障-等级1', '轴承外圈故障-等级2', '轴承外圈故障-等级3'],

      //存储诊断数据的数组
      judge_data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      indicator: [
        { name: '轴承内圈', max: 1 },
        { name: '轴承外圈', max: 1 },
        { name: '轴承滚动体', max: 1 },
        { name: '轴承保持架', max: 1 },
        { name: '齿轮齿根故障', max: 1 },
        { name: '齿轮齿面故障', max: 1 }
      ],
      indicator1: [
        { name: '轴承保持架故障-等级1', max: 1 },
        { name: '轴承保持架故障-等级2', max: 1 },
        { name: '轴承保持架故障-等级3', max: 1 },
        { name: '轴承内圈故障-等级1', max: 1 },
        { name: '轴承内圈故障-等级2', max: 1 },
        { name: '轴承内圈故障-等级3', max: 1 },
        { name: '轴承外圈故障-等级1', max: 1 },
        { name: '轴承外圈故障-等级2', max: 1 },
        { name: '轴承外圈故障-等级3', max: 1 },
      ],

      //存储散点图的数据
      point_data: [],

      //点击诊断按钮开始加载
      judge_loading: false,

      //以下是third的数据
      //加载状态标记
      loading_flag: true,
      //页面切换标记
      activeName: 'first',
      //用于接收图一data
      chartData: [],
      id: [],
      channel1: [],
      channel2: [],
      channel3: [],
      channel4: [],
      //用于接收均方根的data
      chartData_2: [],
      id_2: [],
      channel1_2: [],
      channel2_2: [],
      channel3_2: [],
      channel4_2: [],
      //用于接收峰值的data
      chartData_3: [],
      id_3: [],
      channel1_3: [],
      channel2_3: [],
      channel3_3: [],
      channel4_3: [],
      //用于接收峭度的data
      chartData_4: [],
      id_4: [],
      channel1_4: [],
      channel2_4: [],
      channel3_4: [],
      channel4_4: [],
      //用于接收频谱的data
      chartData_5: [],
      id_5: [],
      channel1_5: [],
      channel2_5: [],
      channel3_5: [],
      channel4_5: [],
      //用于接收包络谱的data
      chartData_6: [],
      id_6: [],
      channel1_6: [],
      channel2_6: [],
      channel3_6: [],
      channel4_6: [],
      //用于接收时频图的data
      timedata: [],
      //选择机器表的数组
      machine_arr: [],
      // 用于存储所选机器的数据
      selectedMachine: '',
      window_size: 1000,
      stride: 1000,
      //请求方法数组
      reques_methods: ['data', 'rms', 'kurtosis', 'rms', 'rms', 'rms'],
      // 选择表数组
      current_left_chart: '均方根',
      current_right_chart: '频谱',
      current_channel: 'channel1',
      chart_left_arr: ['均方根', '峰值', '峭度'],
      chart_right_arr: ['频谱', '包络谱'],
      channel_arr: ['channel1', 'channel2', 'channel3'],
      //切换页面状态标记
      change_flag: true,


      //故障诊断结果模板，用于缓存数据库结果
      judge_Result_model: {
        diagnosticMethods: "",
        dataSelection: "",
        dataStartEnd: "",
        numberOfSamples: "",
        diagnosticFeatures: "",
        modelChoose: "",
        result: "",
        operators: "",
        time: "",
      }


    }
  },






  watch: {
    current_left_chart(current_left_chart, oldval) {
      echarts.init(document.getElementById('Chart_choose_left')).dispose(); // 销毁实例
      if (this.change_flag) {
        if (current_left_chart === '均方根') {
          this.Drow_left_part('Chart_choose_left', '时域分析', this.id_2, this.channel1_2, this.channel2_2, this.channel3_2)
        } else if (current_left_chart === '峰值') {
          this.Drow_left_part('Chart_choose_left', '时域分析', this.id_3, this.channel1_3, this.channel2_3, this.channel3_3)
        } else if (current_left_chart === '峭度') {
          this.Drow_left_part('Chart_choose_left', '时域分析', this.id_4, this.channel1_4, this.channel2_4, this.channel3_4)
        }
      } else {
        if (current_left_chart === '均方根') {
          this.Drow_left_part('Chart_choose_left', '时域分析', this.id_2, this.channel4_2)
        } else if (current_left_chart === '峰值') {
          this.Drow_right_part('Chart_choose_left', '时域分析', this.id_3, this.channel4_3)
        } else if (current_left_chart === '峭度') {
          this.Drow_right_part('Chart_choose_left', '时域分析', this.id_4, this.channel4_4)
        }
      }

    },
    current_right_chart(current_right_chart, oldval) {
      echarts.init(document.getElementById('Chart_choose_right')).dispose(); // 销毁实例
      if (this.change_flag) {
        if (current_right_chart === '频谱') {
          this.Drow_left_part('Chart_choose_right', '频域分析', this.id_5, this.channel1_5, this.channel2_5, this.channel3_5)
        } else if (current_right_chart === '包络谱') {
          this.Drow_left_part('Chart_choose_right', '频域分析', this.id_6, this.channel1_6, this.channel2_6, this.channel3_6)
        }
      } else {
        if (current_right_chart === '频谱') {
          this.Drow_right_part('Chart_choose_right', '频域分析', this.id_5, this.channel4_5)
        } else if (current_right_chart === '包络谱') {
          this.Drow_right_part('Chart_choose_right', '频域分析', this.id_6, this.channel4_6)
        }
      }
    },
    change_flag(change_flag, oldval) {
      if ((oldval && change_flag)) {
        console.log('全为真')
      } else if (!oldval && !change_flag) {
        console.log('全为假')
      } else if (oldval && !change_flag) {
        this.destory_chart()
        this.Drow_test1()
        this.Drow_Time_Rate('time_rate', '时频域分析', 'channel4', this.timedata[3][0], this.timedata[3][1], this.timedata[3][2])
      } else if (!oldval && change_flag) {
        this.destory_chart()
        this.Drow_test()
      }
    },
    current_channel(current_channel, oldval) {
      if (current_channel == 'channel1') {
        this.Drow_Time_Rate('time_rate', '时频域分析', 'channel1', this.timedata[0][0], this.timedata[0][1], this.timedata[0][2])
      } else if (current_channel == 'channel2') {
        this.Drow_Time_Rate('time_rate', '时频域分析', 'channel2', this.timedata[1][0], this.timedata[1][1], this.timedata[1][2])
      } else if (current_channel == 'channel3') {
        this.Drow_Time_Rate('time_rate', '时频域分析', 'channel3', this.timedata[2][0], this.timedata[2][1], this.timedata[2][2])
      }
    }
  },



  methods: {

    //画第一个页面四个通道的图
    Drow_first_part(char_element, title_text, data_channel1, data_channel2, data_channel3, data_channel4) {
      var arr_xAxis = []
      for (var i = 0; i < data_channel1.length; i++) {
        arr_xAxis.push(i)
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
            data: ['Channel1', 'Channel2', 'Channel3', 'Channel4']
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

    //第一个页面开始诊断按钮
    first_begin_judge() {
      var index = this.first_data.area_choose[0] * this.first_data.table_length / this.first_data.choose_length
      var length = (this.first_data.area_choose[1] - this.first_data.area_choose[0]) * this.first_data.table_length / this.first_data.choose_length
      var params = new URLSearchParams()
      params.append('table_name', this.data_choose[this.first_data.current_data_choose - 1].label)
      params.append('index', index)
      params.append('length', length)

      try {
        instance2.post("/state/move/get_data_info", params).then((response1) => {
          this.first_data.Eigenfrequency = response1.data
          this.first_data.Eigenfrequency.run_rate = response1.data.run_rate

        })
      } catch (error) {
        alert("获取左侧信息失败！请重新尝试")
      }

      try {
        instance2.post("/state/move/get_datas", params).then((response2) => {
          this.first_data.pic_data = response2.data

          this.Drow_first_part('first_top_chart', "原始数据", this.first_data.pic_data['data'][0], this.first_data.pic_data['data'][1], this.first_data.pic_data['data'][2], this.first_data.pic_data['data'][3])
          this.Drow_first_part('first_button_chart', "包络谱", this.first_data.pic_data['amplitude_envelope'][0], this.first_data.pic_data['amplitude_envelope'][1], this.first_data.pic_data['amplitude_envelope'][2], this.first_data.pic_data['amplitude_envelope'][3])
          this.first_data.right_loading = false
        })
      } catch (error) {
        alert("获取右侧信息失败！请重新尝试")
      }

      var data_start = this.first_data.area_choose[0] * this.first_data.table_length / this.first_data.choose_length.toString()
      var data_end = (this.first_data.area_choose[0] * this.first_data.table_length / this.first_data.choose_length + (this.first_data.area_choose[1] - this.first_data.area_choose[0]) * this.first_data.table_length / this.first_data.choose_length).toString()

      this.judge_Result_model.diagnosticMethods = "信号处理诊断方法"
      this.judge_Result_model.dataSelection = this.data_choose[this.first_data.current_data_choose - 1].label
      this.judge_Result_model.dataStartEnd = data_start + " - " + data_end
      this.judge_Result_model.numberOfSamples = 0
      this.judge_Result_model.diagnosticFeatures = "-"
      this.judge_Result_model.modelChoose = "-"
      this.judge_Result_model.result = "-"
      this.judge_Result_model.operators = this.$store.state.username
      this.judge_Result_model.time = dayjs().format('YYYY-MM-DD HH:mm:ss')

      var params1 = new URLSearchParams()
      params1.append('diagnosticMethods', this.judge_Result_model.diagnosticMethods)
      params1.append('dataSelection', this.judge_Result_model.dataSelection)
      params1.append('dataStartEnd', this.judge_Result_model.dataStartEnd)
      params1.append('numberOfSamples', this.judge_Result_model.numberOfSamples)
      params1.append('diagnosticFeatures', this.judge_Result_model.diagnosticFeatures)
      params1.append('modelChoose', this.judge_Result_model.modelChoose)
      params1.append('result', this.judge_Result_model.result)
      params1.append('operators', this.judge_Result_model.operators)
      params1.append('time', this.judge_Result_model.time)

      try {
        instance1.post("/front/om/addtroubleshootingrecords", params1).then((response3) => {
        })
      } catch (error) {
        alert("获取添加诊断信息失败！请重新尝试")
      }


    },

    //第一个页面中下拉框数据改变函数
    change_data_choose(label) {
      // console.log(this.data_choose[label-1].label)
      var params = new URLSearchParams()
      params.append('table_name', this.data_choose[label - 1].label)
      try {
        instance2.post("/state/move/get_table_length", params).then((response) => {
          this.first_data.table_length = response.data
          // console.log(this.first_data.table_length)
          this.disabled = false
        })
      } catch (error) {
        alert("获取表长失败！请重新尝试")
      }

    },

    //第二个页面中开始诊断
    begin_judge() {
      this.judge_loading = true
      var params = new URLSearchParams()
      params.append('machine_table', this.data_choose[this.current_data_choose - 1].label)
      params.append('cut_num', this.Number_of_samples)
      params.append('feature_name', this.methods)
      params.append('model_name', this.real_model)
      try {
        instance2.post("/fault/move/ml/fault_diagnosis", params).then((response) => {
          this.point_data = response.data['results_num']
          this.Drow_Scatter_plot("Chart_left", "散点图", this.point_data)
          this.judge_data = []

          if (Object.keys(response.data.result).length == 9) {
            //对雷达图进行赋值
            this.judge_data.push(response.data['result']['轴承保持架故障-等级1'])
            this.judge_data.push(response.data['result']['轴承保持架故障-等级2'])
            this.judge_data.push(response.data['result']['轴承保持架故障-等级3'])
            this.judge_data.push(response.data['result']['轴承内圈故障-等级1'])
            this.judge_data.push(response.data['result']['轴承内圈故障-等级2'])
            this.judge_data.push(response.data['result']['轴承内圈故障-等级3'])
            this.judge_data.push(response.data['result']['轴承外圈故障-等级1'])
            this.judge_data.push(response.data['result']['轴承外圈故障-等级2'])
            this.judge_data.push(response.data['result']['轴承外圈故障-等级3'])
            this.Drow_radar("Chart_right", "故障雷达", this.judge_data, this.indicator1)
            var min = 1
            var index = 0
            for (var i = 0; i < this.judge_data.length; i++) {
              if (this.judge_data[i] < min) {
                min = this.judge_data[i]
                index = i
              }
            }
            this.current_error_index = index + 7
          } else if (Object.keys(response.data.result).length == 6) {
            //对雷达图进行赋值
            this.judge_data.push(response.data['result']['轴承内圈'])
            this.judge_data.push(response.data['result']['轴承外圈'])
            this.judge_data.push(response.data['result']['轴承滚动体'])
            this.judge_data.push(response.data['result']['轴承保持架'])
            this.judge_data.push(response.data['result']['齿轮齿根故障'])
            this.judge_data.push(response.data['result']['齿轮齿面故障'])
            this.Drow_radar("Chart_right", "故障雷达", this.judge_data, this.indicator)
            var min = 1
            var index = 0
            for (var i = 0; i < this.judge_data.length; i++) {
              if (this.judge_data[i] < min) {
                min = this.judge_data[i]
                index = i
              }
            }
            this.current_error_index = index
          } else {
            console.log("error")
          }
          this.judge_loading = false

          this.judge_Result_model.diagnosticMethods = "机器学习诊断方法"
          this.judge_Result_model.dataSelection = this.data_choose[this.current_data_choose - 1].label
          this.judge_Result_model.dataStartEnd = "-"
          this.judge_Result_model.numberOfSamples = this.Number_of_samples
          this.judge_Result_model.diagnosticFeatures = this.methods
          this.judge_Result_model.modelChoose = this.real_model
          this.judge_Result_model.result = this.judge_result[this.current_error_index]
          this.judge_Result_model.operators = this.$store.state.username
          this.judge_Result_model.time = dayjs().format('YYYY-MM-DD HH:mm:ss')

          var params1 = new URLSearchParams()
          params1.append('diagnosticMethods', this.judge_Result_model.diagnosticMethods)
          params1.append('dataSelection', this.judge_Result_model.dataSelection)
          params1.append('dataStartEnd', this.judge_Result_model.dataStartEnd)
          params1.append('numberOfSamples', this.judge_Result_model.numberOfSamples)
          params1.append('diagnosticFeatures', this.judge_Result_model.diagnosticFeatures)
          params1.append('modelChoose', this.judge_Result_model.modelChoose)
          params1.append('result', this.judge_Result_model.result)
          params1.append('operators', this.judge_Result_model.operators)
          params1.append('time', this.judge_Result_model.time)

          try {
            instance1.post("/front/om/addtroubleshootingrecords", params1).then((response3) => {
            })
          } catch (error) {
            alert("获取添加诊断信息失败！请重新尝试")
          }


        })
      } catch (error) {
        alert("诊断失败！请重新尝试")
      }



    },

    //开局默认请求数据库中的machine表
    getMachineData() {
      try {
        instance2.post("/state/move/table_names").then((response) => {
          // this.current_data_choose = response.data[0]
          for (var i = 0; i < response.data.length; i++) {
            const obj = {}
            obj.label = response.data[i]
            obj.value = i + 1
            this.data_choose.push(obj)
          }
        })
      } catch (error) {
        alert("获取数据失败！请重新尝试")
      }
    },

    getMachineData_1() {
      try {
        instance2.post("/state/move/table_names").then((response) => {
          this.machine_arr = response.data
          this.selectedMachine = response.data[0]
          //console.log(this.selectedMachine)
          this.getAllData()
        })
      } catch (error) {
        alert("获取数据失败！请重新尝试")
      }

    },

    //获取算法模型类型 返回值为一个数组内的三个数组
    getMainTransInfo() {
      try {
        instance2.post("/fault/move/ml/get_models").then((response) => {
          this.model_choose = response.data
        })
      } catch (error) {
        alert("获取获取算法模型类型数据失败！请重新尝试")
      }
    },


    //切断诊断方法时的函数
    handleClick(tab) {
      if (tab.name == "first") {
        this.change_method_flag = 1
        this.change_judge_method = "first"
      } else if (tab.name == "second") {
        this.change_method_flag = 2
        this.change_judge_method = "second"
        this.$nextTick(() => {
          if (this.current_error_index != 6) {
            let myChart1 = echarts.getInstanceByDom(document.getElementById('Chart_left'));
            let myChart2 = echarts.getInstanceByDom(document.getElementById('Chart_right'));
            myChart1.dispose()
            myChart2.dispose()
            this.Drow_Scatter_plot("Chart_left", "散点图", this.point_data)
            this.Drow_radar("Chart_right", "故障雷达", this.judge_data, this.indicator)
          } else {
            let myChart1 = echarts.getInstanceByDom(document.getElementById('Chart_left'));
            let myChart2 = echarts.getInstanceByDom(document.getElementById('Chart_right'));
            myChart1.dispose()
            myChart2.dispose()
            this.Drow_Scatter_plot("Chart_left", "散点图")
            this.Drow_radar("Chart_right", "故障雷达")
          }
        })
      } else if (tab.name == "third") {
        this.change_method_flag = 3
        this.change_judge_method = "third"
        // 在生命周期中调用 getRenderer 方法
        if (this.machine_arr.length == 0) {
          this.getMachineData_1()
        }


      }
    },

    //诊断方法变换监听函数
    methodChange(hisMethod) {
      if (hisMethod == '原始数据') {
        this.current_choose = this.model_choose['原始数据模型']
      } else if (hisMethod == '傅里叶变换') {
        this.current_choose = this.model_choose['傅里叶变换模型']
      } else {
        this.current_choose = this.model_choose['小波包分解模型']
      }
      this.real_model = this.current_choose[0]
      this.model_choose_copy = []
      for (var i = 0; i < this.current_choose.length; i++) {
        var obj = {}
        obj.lable = i
        obj.value = this.current_choose[i]
        this.model_choose_copy.push(obj)
      }
    },
    //画散点图
    Drow_Scatter_plot(char_element, title_text, data) {
      echarts.dispose(document.getElementById(char_element))
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
            name: '采样点'
          },
          yAxis: {
            name: '故障类型',
            // data:[0,1,2,3,4,5,6,7,8,9]
          },
          series: [
            {
              symbolSize: 10,
              data: data,
              type: 'scatter'
            }
          ]
        })
      } catch (error) {
        console.log(error)
      }

    },
    //画雷达图
    Drow_radar(char_element, table_title, data, indicator) {
      //初始化实例
      echarts.dispose(document.getElementById(char_element))
      try {
        let Chart_1 = this.$echarts.init(document.getElementById(char_element))
        //绘制图表
        Chart_1.setOption({
          title: {
            text: table_title
          },
          legend: {
            data: []
          },
          radar: {
            //shape: 'circle',
            indicator: indicator
          },
          series: [
            {
              name: 'Budget vs spending',
              type: 'radar',
              data: [
                {
                  value: data,
                  name: '故障概率'
                },
              ]
            }
          ]
        })
      } catch (error) {
        console.log(error)
      }
    },
    getImagePath(imageName) {
      return process.env.BASE_URL + imageName;
    },

    NumFilter(value) {
      // 截取当前数据到小数点后两位
      let realVal = parseFloat(value).toFixed(2)
      return realVal
    },

    search_tran() {
      let myChart1 = echarts.getInstanceByDom(document.getElementById('Chart_top_left'));
      let myChart2 = echarts.getInstanceByDom(document.getElementById('Chart_choose_left'));
      let myChart3 = echarts.getInstanceByDom(document.getElementById('Chart_choose_right'));
      let myChart4 = echarts.getInstanceByDom(document.getElementById('time_rate'));
      // myChart1.dispose()
      // myChart2.dispose()
      // myChart3.dispose()
      // myChart4.dispose()
      this.loading_flag = true
      this.getAllData()
    },

    getAllData() {
      try {
        var params = new URLSearchParams()
        params.append('machine_table', this.selectedMachine)
        console.log(this.selectedMachine)
        params.append('window_size', this.window_size)
        params.append('stride', this.stride)
        params.append('method_names', "")
        instance2.post("/state/move/calculate", params).then((response) => {

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
      } catch (error) {
        alert("获取数据失败！请重新尝试")
      }
    },

    //排序数据
    sorterItems() {
      return this.items.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        } else {
          return 0;
        }
      })
    },

    Drow_test() {
      this.Drow_left_part('Chart_top_left', '主轴变速齿轮箱震动加速度(g)', this.id, this.channel1, this.channel2, this.channel3)
      this.Drow_left_part('Chart_choose_left', '时域分析', this.id_2, this.channel1_2, this.channel2_2, this.channel3_2)
      this.Drow_left_part('Chart_choose_right', '频域分析', this.id_5, this.channel1_5, this.channel2_5, this.channel3_5)
      this.Drow_Time_Rate('time_rate', '时频域分析', 'channel1', this.timedata[0][0], this.timedata[0][1], this.timedata[0][2])
    },

    Drow_test1() {
      this.Drow_right_part('Chart_top_left', '主轴前轴承加速度(g)', this.id, this.channel4)
      this.Drow_left_part('Chart_choose_left', '时域分析', this.id_2, this.channel4_2)
      this.Drow_right_part('Chart_choose_right', '频域分析', this.id_5, this.channel4_5)
    },

    Drow_left_part(char_element, title_text, arr_xAxis, data_channel1, data_channel2, data_channel3) {
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
          // 加个legend
          legend: {
            right: 155,
            top: 25,
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

    Drow_right_part(char_element, title_text, arr_xAxis, data_channel4) {
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

    Drow_Time_Rate(char_element, title_text, channel, x_data, y_data, data) {
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
          legend: {
            padding: [0, 50, 0, 0]
          },
        })

      } catch (error) {
        console.log(error)
      }
    },

    change_flag1() {
      this.change_flag = true
    },
    change_flag2() {
      this.change_flag = false
    },
    destory_chart() {
      let myChart1 = echarts.getInstanceByDom(document.getElementById('Chart_choose_left'));
      let myChart2 = echarts.getInstanceByDom(document.getElementById('Chart_choose_right'));
      let myChart3 = echarts.getInstanceByDom(document.getElementById('Chart_top_left'));
      let myChart4 = echarts.getInstanceByDom(document.getElementById('time_rate'));
      myChart1.dispose()
      myChart2.dispose()
      myChart3.dispose()
      myChart4.dispose()

    },
    handleClick_1(tab, event) {
      if (tab.name == 'first') {
        this.change_flag1()
      } else {
        this.change_flag2()
      }
    }



  },
}







</script>

<style>
.little_title_ping {
  margin-top: 10px;
}


.MLmainpart {
  width: 100%;
  height: 100%;

  .top_part {
    width: 100%;
  }

  .middle {
    display: flex;

    .middle_leftpart {
      width: 50%;
      margin-right: 3px;
    }

    .middle_rightpart {
      width: 50%;
    }

  }

  .judge_part {
    width: 100%;
  }

  .buttonpart {
    display: flex;

    .button_leftpart {
      width: 60%;
    }

    .button_rightpart {
      width: 40%;
    }
  }
}

.border_class {
  border: 2px dashed rgba(128, 133, 134, 0.5);
  border-radius: 15px;
  margin-bottom: 10px;
}

.el-select .el-input {
  border-color: #409EFF;
  width: 300px;
}

.select_windows {
  float: right;
  width: 40%px;
  margin-right: -310px;
}

@media screen and (max-width: 1444px) {
  .el-select .el-input {
    width: 150px;
  }
  .select_windows{
    margin-right: -250px;
  }
  .select_windows div{
    font-size: 14px;
  }
  .select_windows .el-input{
    font-size: 14px;
    margin-left: -10px;
  }
  .select_windows .el-button{
    font-size: 14px;
    margin-left: -30px;
  }
}
</style>