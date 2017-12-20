import Vue from 'vue'
import App from './App.vue'
import store from './store'

import slider from './components/slider.vue'
import toast from './components/toast.vue'
import uploader from './components/uploader.vue'
import popbox from './components/popbox.vue'
import switcher from './components/switcher.vue'
import icon from './components/icon.vue'
import widget from './plugins/widget'

import './app.scss'

// 全局注册组件
Vue.component('slider', slider)
Vue.component('toast', toast)
Vue.component('uploader', uploader)
Vue.component('popbox', popbox)
Vue.component('switcher', switcher)
Vue.component('icon', icon)

/**
 * 设置一个全局的通讯代理
 * ! 约定只有全局组件才能使用该全局通信代理，减少命名冲突的可能
 */
window.$communicator = new Vue()

const vuePageDesigner = {
  name: 'vue-page-designer',
  store,
  props: {
    widgets: Object,
    widgetStyle: Object
  },
  components: { App },
  created () {
    // 注册 widgets
    Vue.use(widget, {
      widgets: this.widgets,
      widgetStyle: this.widgetStyle
    })
    window.$communicator.$on('save', () => {
      this.$emit('save', store.state)
    })
  },
  render (h) {
    return h('App')
  }
}

export default vuePageDesigner
