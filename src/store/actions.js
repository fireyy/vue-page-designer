export default {
  addWidget ({ state, commit }, item) {
    if (item.setting.isUpload) {
      window.$communicator.$emit('upload', (payload) => {
        commit('addWidget', { data: payload, item })
      }, true)
    } else {
      commit('addWidget', { item })
      // 设置选中
      commit('select', {
        uuid: state.widgets[state.widgets.length - 1].uuid
      })
    }
  },
  save ({ state }) {
    window.$communicator.$emit('save', state)
  }
}
