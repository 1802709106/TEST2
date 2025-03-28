import Vue from "vue";
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        user: localStorage.getItem('user') ? localStorage.getItem('user') : null,
        //若localSorage存在token，将值赋给Vuex.state.token
        token: localStorage.getItem('token') ? localStorage.getItem('token') : null,

        baseUrl1:'http://localhost:8088',
        baseUrl2:'10.8.7.201:5000',

        //登录状态标记
        show:true,
        //登录用户信息记录
        user_id:0,
        username:"非法用户",
        manager:false,
        usertel:"",
        state:false,

    },
    mutations: {
        setUser(state, user) {
            state.user = user
            localStorage.setItem('user', JSON.stringify(user))
        },
        setToken(state, token) {
            localStorage.setItem('token', token)
            state.token = token
        },
        setUsername(state, username) {
            localStorage.setItem('username', username)
            state.username = username
        },
        setUsertel(state, usertel) {
            state.usertel = usertel
        },
        setUserstate(state, userstate) {
            state.state = userstate
        },
        setShow(state, showFlag) {
            state.show = showFlag
        },
        setUserInfo(state, user_id, user_name, manager, user_tel, user_state){
            state.user_id = user_id
            state.username = user_name
            state.manager = manager
            state.usertel = user_tel
            state.state = user_state
            alert(state.username)
        },
        logout(state) {
            localStorage.removeItem('token')
            state.token = null
            localStorage.removeItem('user')
            state.user = null
        },
        changeShow(){
            this.show = false
        },
        
        updateShow(state, value) {
            state.show = value;
        },

    },
    plugins:[createPersistedState]
})

export default store