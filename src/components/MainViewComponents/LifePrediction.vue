<template>
    <div class="life_predict">
        <div class="top_part">
            <div class="info_part">
                <div class="show">
                    <img src="../../assets/右右.png" alt="展示" width="70px" height="70px">
                    <h3>基本信息</h3>
                </div>
                <p>设备名称：{{ deviceName }}</p>
                <p>监测部件：{{ monitorPart }}</p>
                <p>部件型号: {{ partModel }}</p>
                <span class="modelimg"><img src="../../assets/modelimg.png" alt="模型图" width="200px"
                        height="100px"></span>
            </div>
            <div class="status_part">
                <div class="show">
                    <img src="../../assets/右右.png" alt="展示" width="70px" height="70px">
                    <h3>当前状态</h3>
                </div>
                <p>退化状态：{{ degradationStatus }}</p>
                <p>服役时长: {{ serviceLife }}</p>
                <p>剩余寿命: {{ remainingLife }}</p>
                <p>维护建议:</p>
                <ol>
                    <li v-for="(suggestion, index) in maintenanceSuggestions" :key="index">
                        {{ index + 1 }}. {{ suggestion }}
                    </li>
                </ol>
            </div>
        </div>
        <div class="parent-container">
            <div class="show"><img src="../../assets/右右.png" alt="展示" width="70px" height="70px">
                <h3>剩余使用寿命计算</h3>
            </div>
            <div class="graph_part">
                <div class="divData">
                    <label for="dataSelect">数据选择：</label>
                    <select id="dataSelect">
                        <option value="CMAPS">CMAPS</option>
                        <option value="LSTM">CMAT</option>
                        <!-- 其他选项可以在这里添加 -->
                    </select>
                </div>
                <div class="divAlgorithm">
                    <label for="algorithmSelect">算法选择：</label>
                    <select id="algorithmSelect" v-model="modelValue" @change="changeModel">
                        <option value="0">MDAN</option>
                        <option value="1">LSTM</option>
                        <!-- 其他选项可以在这里添加 -->
                    </select>
                </div>
                <button @click="selectData">开始预测</button>
                <div v-if="this.chartvalue === 1" class="remaining_life_graph">
                    <div id="chart" class="class-chart"></div>
                </div>
                <div v-else-if="this.chartvalue === 0" class="remaining_life_graph">
                    <div class="loading-text">加载中...</div>
                    <div class="circle-loader">
                        <div class="circle" v-for="n in 8" :key="n"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import { instance1 } from '../axiosInstances';

export default {
    name: 'LineChart',
    data() {
        return {
            chart: null,
            xData: null,
            yData: null,
            chartvalue: 0,
            modelValue: '0',

            deviceName: '重型机床',
            monitorPart: '滚动轴承',
            partModel: 'FFZD4010-3',
            degradationStatus: null,
            serviceLife: null,
            remainingLife: null,
            maintenanceSuggestions: null,
        };
    },
    methods: {
        changeModel(event) {
            this.modelValue = event.target.value;
            console.log(this.modelValue);
        },
        selectData() {
            if (this.modelValue === '0') {
                this.getData_1();
            } else if (this.modelValue === '1') {
                this.getData_2();
            }
        },
        getData_1() {
            this.chartvalue = 1;
            console.log("getData_1");
            instance1.get('/front/state/life/life_predict_1').then(response => {
                this.xData = response.data[0];
                this.yData = response.data[1];
                this.serviceLife = response.data[0][99] + 1;
                this.remainingLife = response.data[1][99];
                this.remainingLife = this.remainingLife.toFixed(2);
                this.degradationStatus = '性能退化阶段';
                this.maintenanceSuggestions = [
                    '请持续关注并做检修准备',
                    '请及时采购更换部件'
                ],
                    this.initChart();
            });
        },
        getData_2() {
            this.chartvalue = 1;
            console.log("getData_2");
            instance1.get('/front/state/life/life_predict_2').then(response => {
                this.xData = response.data[0];
                this.yData = response.data[1];
                this.serviceLife = response.data[0][199] + 1;
                this.remainingLife = response.data[1][199];
                this.remainingLife = this.remainingLife.toFixed(2);
                this.degradationStatus = '性能退化阶段';
                this.maintenanceSuggestions = [
                    '请持续关注并做检修准备',
                    '请及时采购更换部件'
                ],
                    this.initChart();
            });
        },
        initChart() {
            const chartDom = document.getElementById('chart');
            this.chart = echarts.init(chartDom);
            const option = {
                title: {
                    text: '剩余寿命预测图'
                },
                tooltip: {},
                legend: {
                    data: ['剩余寿命']
                },
                xAxis: {
                    data: this.xData
                },
                yAxis: {},
                series: [{
                    name: '剩余寿命',
                    type: 'line',
                    data: this.yData
                }]
            };
            this.chart.setOption(option);
            document.getElementById('chart').style.display = 'block'; // 显示图表
        },

    }
}
</script>

<style>
.life_predict {
    display: flex;
    /* 使用flex布局 */
    flex-direction: row;
    /* 设置垂直排列 */
}

.top_part {
    display: flex;
    /* 使用flex布局 */
    flex-direction: column;
    /* 设置垂直排列 */
    width: 50%;
}

.info_part,
.status_part {
    margin-right: 20px;
    /* 设置元素之间的间距 */
    margin-bottom: 100px;
}

.info_part p,
.status_part p {
    margin: 20px;
    /* 设置段落之间的间距 */
    padding: 20px;
    color: #333;
    /* 设置字体颜色更深，这里使用了深灰色 */
    font-weight: bold;
    /* 设置字体为粗体 */
    display: flex;
    /* 使用flex布局 */
    align-items: center;
    /* 垂直居中对齐 */
    justify-content: flex-start;
    /* 水平靠左对齐 */
    margin-left: 150px;
}

/* this */
.status_part ol {
    list-style-type: none;
    padding-left: 0;
    margin: -62px 0 0 50px;
}

.class-chart {
    width: 600px;
    height: 400px;
    display: none;
}

.show {
    display: flex;
    /* 使用flex布局 */
    align-items: center;
    /* 垂直居中对齐 */
    justify-content: flex-start;
    /* 水平靠左对齐 */
    margin-right: -20px;
}

.show img {
    margin-right: 10px;
    /* 图片和文字之间的间距 */
}

.show h3 {
    margin: 20px -20px;
    /* 移除外边距 */
    line-height: normal;
    /* 重置行高 */
    font-size: 1em;
    /* 如果需要，可以调整字体大小 */
}

/* 为包含 .show 和 .graph_part 的父容器设置flex布局 */
.parent-container {
    display: flex;
    /* 使用flex布局 */
    flex-direction: column;
    /* 设置为垂直排列 */

}

.show {
    margin-bottom: 20px;
    /* 为.show和.graph_part之间增加间距 */
    align-items: flex-start;
    /* 子元素靠左对齐 */
}

.graph_part {
    /* 如果需要，可以在这里添加更多样式 */
    align-items: center;
    /* 子元素靠左对齐 */
}

.graph_part select {
    width: 250px;
    height: 50px;
    margin-bottom: 10px;
    padding: 5px;
    font-size: 18px;
}

.graph_part label {
    margin-right: 50px;
    /* 增加标签与选择框之间的间距 */
}

.graph_part {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* 垂直居中对齐 */
    padding: 20px;
    /* 增加容器的内边距 */
}

.divData {
    margin: 50px;
}

.graph_part button {
    margin-top: 20px;
    /* 增加按钮与上方元素的间距 */
    padding: 10px 20px;
    /* 增加按钮内部的间距 */
    font-size: 16px;
    /* 调整按钮字体大小 */
}

.remaining_life_graph {
    margin-top: 180px;
}

.modelimg {
    margin-left: -260px;
}

.info_part span {
    margin-right: -100px;
}


#loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.9);
    /* 背景半透明 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    /* 确保在最上层 */
}

.loader {
    text-align: center;
}

.loading-text {
    margin-bottom: 20px;
    font-size: 20px;
    color: #333;
}

.circle-loader {
    width: 50px;
    height: 50px;
    position: relative;
    margin: 0 auto;
    border-radius: 50%;
    animation: spin 2s linear infinite;
}

.circle {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #333;
    position: absolute;
    animation: circle-animation 2s infinite linear;
}

/* 根据搜索结果[^11^]，设置每个点的位置和动画延迟 */
.circle:nth-child(1) {
    top: 0;
    left: 50%;
    animation-delay: 0s;
}

.circle:nth-child(2) {
    top: 14.1421%;
    left: 85.8579%;
    animation-delay: -0.125s;
}

.circle:nth-child(3) {
    top: 50%;
    left: 100%;
    animation-delay: -0.25s;
}

.circle:nth-child(4) {
    top: 85.8579%;
    left: 85.8579%;
    animation-delay: -0.375s;
}

.circle:nth-child(5) {
    top: 100%;
    left: 50%;
    animation-delay: -0.5s;
}

.circle:nth-child(6) {
    top: 85.8579%;
    left: 14.1421%;
    animation-delay: -0.625s;
}

.circle:nth-child(7) {
    top: 50%;
    left: 0;
    animation-delay: -0.75s;
}

.circle:nth-child(8) {
    top: 14.1421%;
    left: 14.1421%;
    animation-delay: -0.875s;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes circle-animation {

    0%,
    100% {
        opacity: 1;
        transform: scale(1);
    }

    50% {
        opacity: 0.5;
        transform: scale(0.5);
    }
}

@media screen and (max-width: 1444px) {
    .life_predict {
        font-size: 15px;
    }

    .info_part span {
        margin-right: -180px;
    }

    .info_part p,
    .status_part p {
        justify-content: flex-start;
        /* 水平靠左对齐 */
        margin-left: 50px;
    }

    .status_part ol {
        margin-left: 150px;
        width: 230px;
    }

    .parent-container {
        width: 500px;

    }

    .divAlgorithm select {
        width: 180px;
    }

    .divData select {
        width: 180px;
    }
}
</style>