// import Vue from 'vue'
import Store from '../plugins/store'

import state from './state'
import actions from './actions'
import mutations from './mutation'

// Vue.use(Store)

export default new Store({
  state,
  actions,
  mutations
})
