import Vue from 'vue'
import App from './App.vue'

import slider from './components/slider.vue'
import toast from './components/toast.vue'
import uploader from './components/uploader.vue'
import popbox from './components/popbox.vue'
import icon from './components/icon.vue'

import './app.scss'

// 全局注册组件
Vue.component('slider', slider)
Vue.component('toast', toast)
Vue.component('uploader', uploader)
Vue.component('popbox', popbox)
Vue.component('icon', icon)

/**
 * 设置一个全局的通讯代理
 * ! 约定只有全局组件才能使用该全局通信代理，减少命名冲突的可能
 */
window.$communicator = new Vue()

export default App
