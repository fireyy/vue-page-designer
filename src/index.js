import Vue from 'vue'
import App from './App'
import store from './store'

import slider from './components/slider'
import toast from './components/toast'
import uploader from './components/uploader'
import popbox from './components/popbox'
import switcher from './components/switcher'
import icon from './components/icon'
import widget from './plugins/widget'

// 全局注册组件
Vue.component('slider', slider)
Vue.component('toast', toast)
Vue.component('uploader', uploader)
Vue.component('popbox', popbox)
Vue.component('switcher', switcher)
Vue.component('icon', icon)

// 注册 widgets
Vue.use(widget)

/**
 * 设置一个全局的通讯代理
 * ! 约定只有全局组件才能使用该全局通信代理，减少命名冲突的可能
 */
window.$communicator = new Vue()

const vuePageDesigner = {
  name: 'vue-page-designer',
  store,
  components: { App },
  render (h) {
    return h('App')
  }
}

export default vuePageDesigner
