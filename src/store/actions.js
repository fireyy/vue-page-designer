export default {
  addWidget ({ state, commit, store }, item) {
    if (item.setting.isUpload) {
      store.$emit('upload', (payload) => {
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
  save ({ state, store }) {
    store.$emit('save', state)
  }
}
