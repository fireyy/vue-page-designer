import messages from './messages'
import VueI18N from 'vue-i18n'
import Vue from 'vue'

Vue.use(VueI18N)

export default new VueI18N({
  locale: 'cn', // setup locale
  messages: messages
})
