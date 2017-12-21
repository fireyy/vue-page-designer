// 注册 内置 widgets
import inner from '../widgets'

var widgets
var widgetStyle = {}

const install = (Vue, config = {}) => {
  if (install.installed) return

  widgets = Object.assign({}, inner, config.widgets)

  Object.keys(widgets).forEach(key => {
    Vue.component(key, widgets[key])
    // style panel
    let panel = Object.assign({}, widgets[key]['panel'])
    Vue.component(panel.name, panel)
    widgetStyle[panel.name] = panel
    // remove panel from object
    delete widgets[key]['panel']
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
