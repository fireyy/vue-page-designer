import defaultTemplate from './template'
import getProp from './get-prop'

let Vue

export default class Inter {
  static install (_Vue) {
    Vue = _Vue
    Vue.mixin({
      beforeCreate () {
        this.$inter =
          this.$options.inter || (this.$parent && this.$parent.$inter)
      }
    })
    Vue.prototype.$t = function (key) {
      const inter = this.$inter
      return inter.formatMessage(
        {
          path: key
        }
      )
    }
  }

  constructor ({ locale, messages = {}, template = defaultTemplate }) {
    if (process.env.NODE_ENV === 'development' && !Vue) {
      throw new Error('You have to install `vue-inter` first: Vue.use(Inter)')
    }

    this.template = template
    this.messages = messages

    Vue.util.defineReactive(this, '__locale', locale)
  }

  formatMessage (messageDescriptor, ...data) {
    if (typeof messageDescriptor !== 'object') {
      throw new TypeError(
        'messageDescriptor in .formatMessage must be an object.'
      )
    }

    const { path, defaultMessage } = messageDescriptor
    const localeData = this.messages[this.currentLocale]
    // Get message from path
    let message = path && getProp(localeData, path)
    if (typeof message === 'function') {
      return message(...data)
    }
    if (typeof message === 'undefined') {
      // Fallback to defaultMessage
      // Fallback to path literal
      message = typeof defaultMessage === 'undefined' ? path : defaultMessage
    }
    return this.template(message, ...data)
  }

  get currentLocale () {
    return this.__locale
  }

  setCurrentLocale (locale) {
    this.__locale = locale
    return this
  }

  setLocaleData (locale, localData) {
    this.messages[locale] = localData
    return this
  }

  get availableLocales () {
    return Object.keys(this.messages)
  }
}
