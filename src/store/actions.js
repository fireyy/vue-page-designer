export default {
  addWidget ({ state, commit }, item) {
    if (item.isUpload) {
      window.$communicator.$emit('upload', (payload) => {
        commit('addWidget', { data: payload, item })
      }, true)
    } else {
      commit('addWidget', { item })
      // 设置选中
      commit('select', {
        type: item.setting.type,
        index: state.widgets.length - 1
      })
    }
  }
}
