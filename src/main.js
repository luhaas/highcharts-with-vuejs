import Vue from 'vue'
import App from './App.vue'
import HighchartsVue from 'highcharts-vue'
import store from './store'

Vue.use(HighchartsVue)
new Vue({
  store,
  el: '#app',
  render: h => h(App)
})
