<template>
  <div>
    <el-container>

      <el-header class="header_1">
        <div style="display: flex; align-items: center">
          <!-- <el-button class="el-button-style" icon="el-icon-menu" @click="toggleAside" style="margin-right: 10px;"></el-button> -->
          <span v-if="!this.$store.state.manager">
            <img src="../assets/user.png" alt=""
              style="width: 50px; height: 50px; line-height: 50px; padding-top: 20px;">
          </span>
          <span v-if="this.$store.state.manager">
            <img src="../assets/manager.png" alt=""
              style="width: 50px; height: 50px; line-height: 50px; padding-top: 20px;">
          </span>
        </div>
        <span>数控机床关键部件状态监测与故障诊断系统</span>
        <div style="display: flex; justify-content: center; align-items: center">
          <el-button class="loginOut" @click="loginOut" style="text-align: center;">登出</el-button>
        </div>
      </el-header>
    </el-container>


    <el-container style="height: 80%; border: 1px solid #eee">

      <el-aside :class="{ collapsed: isAsideCollapsed }" :width="isAsideCollapsed ? '64px' : '250px'"
        style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['2', '3', '4', '5', '6']">
          <!-- <el-submenu index="1">
                  <template slot="title"><i class="el-icon-message"></i>系统设置</template>
<router-link to="/systemsettings">
  <el-menu-item index="1-1">系统设置</el-menu-item>
</router-link>
<el-menu-item index="1-2">非结构化数据管理</el-menu-item>
</el-submenu> -->
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>状态监测</template>
            <el-menu-item-group>
              <router-link to="/conditionmonitoring">
                <el-menu-item index="2-1">状态监测</el-menu-item>
              </router-link>
              <!-- <router-link to="/cmtransmissionSystem">
                        <el-menu-item index="2-4">传动系统</el-menu-item>
                    </router-link> -->
              <!-- <router-link to="/cmelectricalsystem">
                        <el-menu-item index="2-2">电气系统</el-menu-item>
                    </router-link> -->
              <!-- <router-link to="/cmhydraulicsystem">
                        <el-menu-item index="2-3">液压系统</el-menu-item>
                    </router-link> -->
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>故障诊断</template>
            <el-menu-item-group>
              <router-link to="/transmissionsystem">
                <el-menu-item index="3-1">传动系统</el-menu-item>
              </router-link>
              <router-link to="/hydraulicsystem">
                <el-menu-item index="3-2">液压系统</el-menu-item>
              </router-link>
              <!-- <router-link to="/electricalsystem">
                        <el-menu-item index="3-3">进给系统</el-menu-item>
                    </router-link> -->
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-setting"></i>寿命预测</template>
            <el-menu-item-group>
              <router-link to="/lifeprediction">
                <el-menu-item index="4-1">寿命预测</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-setting"></i>运维管理</template>
            <el-menu-item-group>
              <router-link to="/ommanagement">
                <el-menu-item index="5-1">运维管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-setting"></i>系统管理</template>
            <el-menu-item-group>
              <span v-if="this.$store.state.manager">
                <router-link to="/usermanagement">
                  <el-menu-item index="6-1">系统管理</el-menu-item>
                </router-link>
              </span>
              <router-link to="/personalInfo">
                <el-menu-item index="6-2">个人信息管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main style="overflow:hidden">
        <MainArea></MainArea>
      </el-main>

    </el-container>

    <el-container>

      <el-footer>
        <div>
          版权所有：XXXXXXXXXXX
          内容管理：XXXXXXXXXXX
          技术支持：XXXXXXXXX
          备案号：XXXXXXXXXXX
        </div>
      </el-footer>

    </el-container>


  </div>
</template>

<script>

import MainArea from "./MainArea.vue"

export default {
  name: 'MainView',
  components: {
    MainArea,
  },
  // data() {
  //   return {
  //     isAsideCollapsed: false, // 控制侧边栏是否折叠
  //   };
  // },
  methods: {
    loginOut() {
      this.$store.state.show = true
      this.$store.state.user_id = 0
      this.$store.state.user_name = ""
      this.$store.state.manager = false
      this.$store.state.user_tel = ""
      this.$store.state.state = 0
      localStorage.clear();
    },
    // toggleAside() {
    //   this.isAsideCollapsed = !this.isAsideCollapsed; // 切换侧边栏状态
    // },
  },

}

</script>

<style>
/* 折叠侧边栏样式 */
/* .collapsed .el-menu-item {
  display: none;
}

.collapsed .el-submenu__title {
  display: none;
}

.el-header .el-button {
  font-size: 20px;
  border: none;
  background-color: transparent;
} */
/* 基础样式，适用于所有屏幕 */
.header_1 {
  font-size: 40px;
  font-family: 'Courier New', Courier, monospace;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  padding: 0;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 70px;
  height: 70px;
}



.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: calc(100vh - 70px);
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  padding: 0;
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}

/* 用于删除侧边栏滚动条 */
.el-aside::-webkit-scrollbar {
  display: none;
}

/* 为手机屏幕添加媒体查询 */
@media screen and (max-width: 768px) {
  .header_1 {
    font-size: 15px;
    /* 减小字体大小 */
    flex-direction: row;
    /* 改为垂直布局 */
    justify-content: center;
    align-items: center;
  }

  .el-header {
    line-height: 20px;
    /* 减小行高 */
    height: 150px;
    /* 减小高度 */
  }

  .el-header .el-button {
  font-size: 20px;
  border: none;
  background-color: transparent;
  padding: 0; /* 移除内边距 */
  margin-top: 20px; /* 移除外边距 */
  margin-left: 10px;
  display: flex; /* 使用 flex 布局 */
  width: 40px; /* 设置按钮的宽度 */
  height: 40px; /* 设置按钮的高度 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
  }

  .el-footer {
    line-height: 20px;
    /* 减小行高 */
  }

  .el-aside {
    line-height: 150px;
    /* 减小行高 */
    height: calc(100vh - 50px);
    /* 根据新的el-header高度调整 */
  }

  body>.el-container {
    margin-bottom: 20px;
    /* 减小外边距 */
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 200px;
    /* 减小行高 */
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 250px;
    /* 减小行高 */
  }
}


</style>