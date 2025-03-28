<template>
  <div id="app">
    <div>
      <Login v-if="this.$store.state.show"></Login>
      <MainView v-else></MainView>
    </div>
    
  </div>
</template>

<script>

import MainView from './components/MainView.vue'
import Login from './components/Login.vue';
import { RouterView } from 'vue-router';

export default {
  name: 'App',
  components: {
    MainView,
    Login,
    RouterView
  },
  computed: {
    
  },
  data:function(){
    return{

    }
  },
  watch: {
    
  },
  methods:{
    
    

  },
  // 在组件中使用 watch 监听 localStorage 中的 token 变化，并更新 Vuex 中的 show 变量
  watch: {
      '$store.state.show': {
        handler(value) {
          if (localStorage.getItem('token')) {
            this.$store.commit('updateShow', false); // 更新 Vuex 中的 show 变量为 false
          } else {
            this.$store.commit('updateShow', true); // 更新 Vuex 中的 show 变量为 true
          }
        },
        deep: true
      }
    }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* 用于消除周围空白 */
html, body {
margin-left: 0px;
margin-top: 0px;
margin-right: 0px;
margin-bottom: 0px; }

</style>
