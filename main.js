import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
// import Router from 'vue-router'
import routes from './router'

Vue.use(ElementUI)
Vue.use(VueRouter)

const router = new VueRouter({
	routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

