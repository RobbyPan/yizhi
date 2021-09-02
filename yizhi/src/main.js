import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import './assets/css/global.css'

// 配置后端服务器url
axios.defaults.baseURL = "http://localhost:8888"
Vue.config.devtools = true
// 将echarts注册到Vue组件的原型对象中去
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
