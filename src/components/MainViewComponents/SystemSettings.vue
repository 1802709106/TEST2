<!-- 本组件用于在main.vue中显示系统设置相关内容 -->

<template>
    <div>
        <div class="systemsetting">
            系统设置
        </div>
        <div class="systemsetting_area">
            <div class="systemsetting_1">
                <div class="head_1">传动系统设置</div>
                <div class="setting_1_1">
                    <div class="head_1_1">采集信息设置</div>
                    <div class="setting_1_1_1">
                        <div class="input-box">
                            <div class="text">采样率：</div>
                            <div>
                                <el-input placeholder="请输入采样率" class="input_1"></el-input>
                            </div>
                        </div>
                        <div class="input-box">
                            <div class="text">每通道采样数：</div>
                            <div>
                                <el-input placeholder="请输入每通道采样数" class="input_1">请输入每通道采样数</el-input>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="setting_1_2">
                    <div class="head_1_2">采集标签信息</div>
                    <div class="setting_1_2_1">
                        <div class="input-box">
                            <div class="text">工况负载：</div>
                            <div>
                                <el-input placeholder="请输入工况负载" class="input_1"></el-input>
                            </div>
                        </div>
                        <div class="input-box">
                            <div class="text">机床名称：</div>
                            <div>
                                <el-input placeholder="请输入机床名称" class="input_1"></el-input>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="setting_1_3">
                    <div class="head_1_3">采集元素设置</div>
                    <div style="display: flex;" class="setting_1_3_11">
                        <div class="setting_1_3_1">

                            <div class="button_container1">
                                <span>
                                    <el-button>实物采集卡</el-button>
                                </span>
                                <span>
                                    <el-button>虚拟采集卡</el-button>
                                </span>
                                <span>
                                    <el-button>设置灵敏度</el-button>
                                </span>
                            </div>

                        </div>
                        <div class="setting_1_3_2">
                            <div>采样通道</div>
                            <el-checkbox v-model="checked">cDAQ1Mod4/ai0</el-checkbox>
                            <el-checkbox v-model="checked">cDAQ1Mod4/ai1</el-checkbox>
                            <el-checkbox v-model="checked">cDAQ1Mod4/ai2</el-checkbox>
                            <el-checkbox v-model="checked">cDAQ1Mod4/ai3</el-checkbox>
                        </div>
                        <div class="setting_1_3_3">
                            <div>灵敏度</div>
                            <div class="setting_1_3_3_1">
                                <div>98.94</div>
                                <div>98.94</div>
                                <div>98.94</div>
                                <div>98.94</div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="setting_1_4">
                    <div class="head_1_4">主轴轴承温度阈值设置</div>
                    <div class="setting_1_4_11">
                        <div style="display: flex;">
                            <div class="setting_1_4_1">
                                <div>主轴前轴承温度阈值</div>
                                <div class="block_1">
                                    <el-slider v-model="value" show-input>
                                    </el-slider>
                                </div>
                            </div>
                            <div class="setting_1_4_2">
                                <div>主轴后轴承温度阈值</div>
                                <div class="block_2">
                                    <el-slider v-model="value" show-input>
                                    </el-slider>
                                </div>
                            </div>
                            <div class="setting_1_4_3">
                                <div>主轴尾轴承温度阈值</div>
                                <div class="block_3">
                                    <el-slider v-model="value" show-input>
                                    </el-slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="systemsetting_2">
                <div>
                    <div class="head_1">液压系统、电气系统阈值设置</div>
                    <div>
                        <div class="button_container">
                            <span class="button_2_1"><el-button>电气系统阈值设置</el-button></span>
                            <span class="button_2_2"><el-button>液压系统阈值设置</el-button></span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="systemsetting_3">
                <div>
                    <div class="head_1">数据库设置</div>
                    <div style="display: flex;" class="setting_3_1">
                        <div style="display: flex;" class="setting_3_1_1">
                            <div>表空间路径：</div>
                            <span class="input_5">
                                <el-input placeholder="请输入工况负载"></el-input>
                            </span>

                        </div>
                        <div style="display: flex;" class="setting_3_1_2">
                            <div>数据库名：</div>
                            <span class="input_6">
                                <el-input placeholder="请输入数据库名"></el-input>
                            </span>
                        </div>
                        <div style="display: flex;" class="setting_3_1_3">
                            <div>数据库表名：</div>
                            <span class="input_7">
                                <el-input placeholder="请输入数据库表名"></el-input>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SystemSettings',
    data() {
        return {
            checked: '',
            value:0
        }
    }
}
</script>

<style>
.systemsetting {
    border: 2px dashed rgba(128, 133, 134, 0.5);
    border-radius: 15px;
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
}

.systemsetting_area {
    width: 100%;
    height: 100%;
}

.systemsetting_1 {
    border: 2px dashed rgba(128, 133, 134, 0.5);
    border-radius: 15px;
    float: left;
    width: 68%;
    height: 650px;
    margin-right: 1%;
    margin-top: 3px;
}

.systemsetting_2 {
    border: 2px dashed rgba(128, 133, 134, 0.5);
    border-radius: 15px;
    float: left;
    width: 30%;
    height: 650px;
    margin-top: 3px;
}

.systemsetting_3 {
    border: 2px dashed rgba(128, 133, 134, 0.5);
    border-radius: 15px;
    float: left;
    width: 100%;
    height: 100px;
    margin-top: 10px;
}

.head_1 {
    line-height: 40px;
}

.setting_1_1 {
    border: 2px dashed rgba(128, 133, 134, 0.5);
    border-radius: 15px;
    width: 49%;
    height: 30%;
    float: left;
    margin-left: 2px;
}

.setting_1_2 {
    border: 2px dashed rgba(128, 133, 134, 0.5);
    border-radius: 15px;
    width: 49%;
    height: 30%;
    float: right;
    margin-right: 2px;
}

.setting_1_3 {
    /* border: 2px dashed rgb(207, 53, 169); */
    width: 100%;
    height: 30%;
    float: left;
    margin-top: 5px;
}

.setting_1_4 {
    /* border: 2px dashed rgb(207, 53, 169); */
    width: 100%;
    height: 30%;
    float: left;
    margin-top: 5px;
}

.setting_1_1_1 {
    /* border: 2px solid rgb(14, 11, 170); */
    float: left;
    width: 100%;
    padding-left: 20px;
    height: 80px;
    line-height: 80px;
}

.setting_1_2_1 {
    /* border: 2px solid rgb(14, 11, 170); */
    float: left;
    width: 100%;
    padding-left: 20px;
    height: 80px;
    line-height: 80px;
}

.setting_1_3_11 {
    margin-top: 15px;
    float: left;
    margin-left: 6%;
}

.setting_1_3_1 {
    border: 2px dashed rgba(128, 133, 134, 0.5);
    border-radius: 15px;
    width: 300px;
    padding-top: 5px;
    padding-bottom: 5px;
}

.setting_1_3_2 {
    border: 2px dashed rgba(128, 133, 134, 0.5);
    border-radius: 15px;
    width: 300px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-left: 20px;
    margin-right: 20px;
}

.setting_1_3_3 {
    border: 2px dashed rgba(128, 133, 134, 0.5);
    border-radius: 15px;
    width: 300px;
    padding-top: 5px;
    padding-bottom: 5px;
}

.el-checkbox {
    margin-top: 7px;
    margin-left: 80px;
    margin-right: 25px;
    width: 240px;
    padding-left: 0px;
    text-align: left;
}

.el-input {
    margin-left: 10px;
    margin-right: 25px;
    width: 240px;
    padding-left: 0px;
    text-align: left;
}

.el-button {
    margin-left: 0px;
    margin-right: 25px;
    width: 150px;
    padding-left: 0px;
    text-align: left;
}

.setting_1_4_11 {
    margin-top: 35px;
}

.setting_1_4_1 {
    /* border: 2px solid rgb(14, 11, 170); */
    margin-left: 15px;
    margin-right: 10px;
    height: 80px;
    width: 33%;
}

.setting_1_4_2 {
    /* border: 2px solid rgb(14, 11, 170); */
    margin-left: 10px;
    margin-right: 10px;
    height: 80px;
    width: 33%;
}

.setting_1_4_3 {
    /* border: 2px solid rgb(14, 11, 170); */
    margin-left: 10px;
    margin-right: 10px;
    height: 80px;
    width: 33%;
    padding: 0px;
}

.block_1 {
    margin-top: 20px;
    width: 330px;
}

.block_2 {
    margin-top: 20px;
    width: 330px;
}

.block_3 {
    margin-top: 20px;
    width: 330px;
}

.head_1_1 {
    margin-top: 5px;
}

.head_1_2 {
    margin-top: 5px;
}

.head_1_3 {
    margin-top: 5px;
}

.head_1_4 {
    margin-top: 5px;
}

.input-box {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
}

.text {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 150px;
    margin-right: 10px;
}

.input_1 {
    width: 240px;
}

.setting_3_1 {
    /* border: 2px dashed rgba(128, 133, 134, 0.5); */
    widows: 100%;
}

.setting_3_1_1 {
    width: 33%;
    height: 50px;
    line-height: 50px;
}

.setting_3_1_2 {
    width: 33%;
    height: 50px;
    line-height: 50px;
}

.setting_3_1_3 {
    width: 33%;
    height: 50px;
    line-height: 50px;
}

.input_5 {
    width: 250px;
}

.input_6 {
    width: 250px;
}

.input_7 {
    width: 250px;
}

.button_container {
    display: flex;
    flex-direction: column;
    margin-top: 45%;
}

.button_2_1 {
    height: 80px;
}

.button_2_2 {
    height: 50px;
}

.button_container1 {
    display: flex;
    flex-direction: column;
}

.setting_1_3_3_1 {
    margin-top: 5px;
}</style>