// 注册 widgets
import { widgets, widgetStyle } from 'vue-page-designer-widgets'

const install = (Vue, config = {}) => {
  if (install.installed) return

  Object.keys(config.widgets).forEach(key => {
    Vue.component(key, widgets[key])
  })
  Object.keys(config.widgetStyle).forEach(key => {
    Vue.component(key, widgetStyle[key])
  })
}

export default {
  install,
  getWidgets () {
    return widgets
  },
  getWidgetStyle () {
    return widgetStyle
  }
}
