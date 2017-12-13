// 注册 widgets
import {widgets, widgetStyle} from '@/widgets'

const install = (Vue, config = {}) => {
  if (install.installed) return

  Object.keys(widgets).forEach(key => {
    Vue.component(key, widgets[key])
  })
  Object.keys(widgetStyle).forEach(key => {
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
