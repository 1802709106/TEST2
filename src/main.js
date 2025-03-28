import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index.js';
import axios from 'axios';
import VueKonva from 'vue-konva';

// 配置根请求路径
axios.defaults.baseURL = 'http://192.168.31.117:5000'

// 定义axios全局属性
Vue.prototype.$axios = axios

import store from './store/index.js'

// 配置echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 配置json-excel
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)


Vue.config.productionTip = false
Vue.use(ElementUI)

//引入画故障树的组件
Vue.use(VueKonva)

new Vue({
  render: h => h(App),
  router:router,
  store:store
}).$mount('#app')

//将token添加到axios请求头部
axios.interceptors.request.use(
  config => {
      if (localStorage.getItem('token')) {
          config.headers.token = localStorage.getItem('token')
      }
      return config
  },
  error => {
      return Promise.reject(error)
  }
)
