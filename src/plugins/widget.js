// 注册 内置 widgets
import * as inner from '@/widgets'

var widgets, widgetStyle

const install = (Vue, config = {}) => {
  console.log('config', config)
  if (install.installed) return

  widgets = { ...inner.widgets, ...config.widgets }
  widgetStyle = { ...inner.widgetStyle, ...config.widgetStyle }

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
