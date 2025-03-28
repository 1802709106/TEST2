// 注册VueRouter
import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter)

// 导入相关组件
import ConditionMonitoring from '@/components/MainViewComponents/ConditionMonitoring.vue'
import CMElctricalSystem from '@/components/MainViewComponents/CMElctricalSystem.vue'
import CMHydraulicSystem from '@/components/MainViewComponents/CMHydraulicSystem.vue'
import CMTransmissionSystem from '@/components/MainViewComponents/CMTransmissionSystem.vue'
import ElectricalSystem from '@/components/MainViewComponents/ElectricalSystem.vue'
import HydraulicSystem from '@/components/MainViewComponents/HydraulicSystem.vue'
import LifePrediction from '@/components/MainViewComponents/LifePrediction.vue'
import OMManagement from '@/components/MainViewComponents/OMManagement.vue'
import SystemSettings from '@/components/MainViewComponents/SystemSettings.vue'
import TransmissionSystem from '@/components/MainViewComponents/TransmissionSystem.vue'
import UserManagement from '@/components/MainViewComponents/UserManagement.vue'
import PersonalInfo from '@/components/MainViewComponents/PersonalInfo.vue'
import Login from '@/components/Login.vue'
import MainArea from '@/components/MainArea.vue'
// 设置组件对应关系

// 创建路由对象

const router = new VueRouter({

    // 指定hash属性与组件的对应关系
    routes:[
        // 默认重定向
        {path:'/', component:ConditionMonitoring},
        {path:'/conditionmonitoring', component:ConditionMonitoring},
        {path:'/cmelectricalsystem', component:CMElctricalSystem},
        {path:'/cmhydraulicsystem', component:CMHydraulicSystem},
        {path:'/cmtransmissionSystem', component:CMTransmissionSystem},
        {path:'/electricalsystem', component:ElectricalSystem},
        {path:'/hydraulicsystem', component:HydraulicSystem},
        {path:'/lifeprediction', component:LifePrediction},
        {path:'/ommanagement', component:OMManagement},
        {path:'/systemsettings', component:SystemSettings},
        {path:'/transmissionsystem', component:TransmissionSystem},
        {path:'/usermanagement', component:UserManagement},
        {path:'/personalInfo', component:PersonalInfo},
        {path:'/MainArea',name:"index",component:MainArea},
        {path:'/Login',name:"login",component:Login},
    ]
})

//配置路由拦截器
router.beforeEach((to, from, next) => {
    if (to.path === '/Login') {
        next()
    } else {
        const token = window.localStorage.getItem('token')
        if (!token) {
            return next('/Login')
        }
        next()
    }
})



export default router