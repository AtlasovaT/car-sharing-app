import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueRouter from "vue-router";
import vuetify from './plugins/vuetify';
import { Datetime } from 'vue-datetime'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  VueRouter,
  vuetify,
  Datetime,
  render: h => h(App)
}).$mount('#app')
