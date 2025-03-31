<!-- 本组件用于在main.vue中显示个人信息相关内容 -->

<template>
    <div class="all_area">
        <div class="left_part">
            <div class="info">
                <div class="title_1" style="font-size: larger; margin-top: 2%;">用户个人信息</div>
                <div class="account" style="font-size: larger; margin-top: 2%;">用户编号：{{ this.$store.state.user_id }}
                </div>
                <div class="account" style="font-size: larger; margin-top: 2%;">账号：{{ this.$store.state.username }}
                </div>
                <div class="tel" style="font-size: larger; margin-top: 2%;">电话：{{ this.$store.state.user_tel }}</div>
                <div class="tel" style="font-size: larger; margin-top: 2%;">是否为管理员：
                    <template>
                        {{ this.$store.state.manager ? "是" : "否" }}
                    </template>
                </div>
                <div class="state" style="font-size: larger; margin-top: 2%;">用户状态：
                    <template>
                        {{ this.$store.state.state ? "正常" : "异常" }}
                    </template>
                </div>
                <el-button style="text-align: center; margin-top: 2.5%;" @click="show_changeInfo">修改个人信息</el-button>
            </div>


            <!-- 此模块用于动态修改用户信息 -->
            <div class="change_userInfo" v-if="change_info_flag">
                <div class="top_part">
                    <div class="item">
                        <div class="title">用户名：</div>
                        <el-input v-model="current_username" placeholder="请输入内容" :disabled="true"></el-input>
                    </div>
                    <div class="item">
                        <div class="title">用户原始密码：</div>
                        <el-input v-model="current_oldpass" placeholder="请输入原始密码"></el-input>
                    </div>
                    <div class="item">
                        <div class="title">用户新密码：</div>
                        <el-input v-model="current_newuserpass1" placeholder="请输入新密码"></el-input>
                    </div>
                    <div class="item">
                        <div class="title">确认新密码：</div>
                        <el-input v-model="current_newuserpass2" placeholder="请输入新密码"></el-input>
                    </div>
                    <div class="item">
                        <div class="title">用户电话：</div>
                        <el-input v-model="current_usertel" placeholder="请输入内容"></el-input>
                    </div>
                </div>

                <div class="button_part">
                    <el-button style="text-align: center;" @click="changeInfo()">确认修改</el-button>
                    <el-button style="text-align: center;" @click="show_changeInfo()">关闭窗口</el-button>
                </div>

            </div>
        </div>

        <div class="right_part">
            <div class="table-container">
                <el-table :data="table_data_notice" class="el-table" border row-class-name="row-style"
                    header-row-class-name="header-row-style" cell-class-name="cell-style"
                    header-cell-class-name="header-cell-style">
                    <el-table-column prop="notice_info" label="公告">
                    </el-table-column>
                    <el-table-column prop="time" label="发布时间" width="350">
                    </el-table-column>
                </el-table>
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
    name: 'PersonalInfo',
    mounted: function () {

    },
    data: function () {
        return {
            //用于动态显示修改信息界面
            change_info_flag: false,

            //用于修改用户信息时暂存信息
            current_userid: this.$store.state.user_id,
            current_username: this.$store.state.username,
            current_oldpass: "",
            current_newuserpass1: "",
            current_newuserpass2: "",
            current_usertel: this.$store.state.user_tel,

            table_data_notice: [],

        }
    },


    mounted: function () {
        this.get_all_notice()
    },


    methods: {

        changeInfo() {
            if (this.current_newuserpass1 != this.current_newuserpass2) {
                alert("两次输入的密码不同，请重新输入！")
            } else if (this.current_newuserpass1 == this.current_oldpass) {
                alert("新密码不能与旧密码相同，请重新输入！")
            } else {
                var params = new URLSearchParams()
                params.append('user_id', this.$store.state.user_id)
                params.append('user_name', this.current_username)
                params.append('user_old_pwd', this.current_oldpass)
                params.append('user_new_pwd', this.current_newuserpass1)
                params.append('user_tel', this.current_usertel)
                instance1.post('/login/user/changeuserinfo', params).then((response) => {
                    // console.log(response.data.message)
                    if (response.data.message == "wrong old code") {
                        alert("原始密码输入错误，请重新尝试！")
                    } else if (response.data.message == "repeat code") {
                        alert("新密码不能与旧密码相同，请重新输入！")
                    } else if (response.data.message == "change sucess") {
                        alert("修改个人信息成功！")
                        this.change_info_flag = false
                    } else {
                        alert("修改个人信息失败，请重新尝试！")
                    }
                })
            }

        },
        show_changeInfo() {
            this.change_info_flag = !this.change_info_flag
        },
        get_tel() {
            var params = new URLSearchParams()
            params.append('user_name', localStorage.getItem(this.$store.state.username))
            instance1.post('/user/tel', params).then((response) => {
                if (response.status == 200) {
                    this.user_tel = response.data
                    console.log(this.user_tel)
                } else {
                    alert("系统错误！")
                }
            })

        },

        get_state() {
            var params = new URLSearchParams()
            params.append('user_name', localStorage.getItem(this.$store.state.username))
            instance1.post('/user/state', params).then((response) => {
                if (response.status == 200) {
                    this.user_state = response.data
                    console.log(this.user_state)
                } else {
                    alert("系统错误！")
                }
            })
        },

        get_all_notice() {
            instance1.get('/front/notice/getallnotice').then((response) => {
                if (response.status == 200) {
                    this.table_data_notice = []
                    this.table_data_notice = response.data
                } else {
                    alert("系统错误！")
                }
            })
        },

    },
}

</script>

<style>
.all_area {
    widows: 500px;
    height: 500px;
    border: 2px dashed rgba(128, 133, 134, 0.5);
    border-radius: 15px;

    .left_part {
        float: left;
        text-align: left;
        width: 50%;
        height: 100%;

        .info {
            margin-left: 5%;
            margin-top: 2%;
            margin-bottom: 5%;
        }
    }

    .right_part {
        float: left;
        text-align: left;
        width: 50%;

        .title {
            font-size: larger;
            margin-top: 3%;
        }
    }


    .right_part .table-container {
        margin-top: 3%;
    }

    .right_part .el-table {
        width: 100%;
        border-collapse: collapse;
        /* 如果需要保持边框的连续性 */
    }

    .right_part .el-table .row-style {
        height: 20px;
    }

    .right_part .el-table .header-row-style {
        height: 30px;
    }

    .right_part .el-table .cell-style {
        padding: 0px;
        background: #e9eef3;
        color: #606266;
    }

    .right_part .el-table .header-cell-style {
        background: #e9eef3;
        color: #606266;
    }
}

/* 媒体查询：当屏幕宽度小于或等于600px时 */
@media (max-width: 1444px) {
    .all_area {
        width: 100%; /* 让容器宽度充满整个屏幕 */
        height: auto; /* 让容器高度自适应内容 */
    }

    .all_area .left_part, .all_area .right_part {
        float: none; /* 取消浮动，让元素垂直排列 */
        width: 100%; /* 让左右部分宽度充满整个容器 */
    }

    .all_area .right_part .el-table {
        width: 100%;
    }

    .all_area .right_part .el-table .row-style,
    .all_area .right_part .el-table .header-row-style {
        height: auto; /* 让行高自适应内容 */
    }

    .all_area .right_part .el-table .cell-style,
    .all_area .right_part .el-table .header-cell-style {
        padding: 5px; /* 调整单元格内边距以适应小屏幕 */

    }

}
</style>