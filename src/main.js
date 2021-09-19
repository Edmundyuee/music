import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elementUI from 'element-ui'
import axios from 'axios'
import store from './store/store'
import 'element-ui/lib/theme-chalk/index.css'
import VueTouch from 'vue-touch'
import VueLazyload from 'vue-lazyload'
Vue.use(elementUI)
Vue.use(VueTouch,{name:'v-touch'})
Vue.use(VueLazyload,{
  loading: require('./assets/img/5.gif')
})
Vue.prototype.$axios = axios;
axios.defaults.baseURL = '/api'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  elementUI,
  render: h => h(App)
}).$mount('#app')



