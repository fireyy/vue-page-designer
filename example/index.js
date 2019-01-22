import Vue from 'vue'
import App from './App.vue'
import vuePageDesigner from '../src'

Vue.use(vuePageDesigner)

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: h => h(App)
})
