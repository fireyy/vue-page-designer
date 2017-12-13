<template>
  <div id="app">
    <vue-page-designer :widgets="widgets" :widgetStyle="widgetStyle" />
  </div>
</template>

<script>
import { widgets, widgetStyle } from 'vue-page-designer-widgets'
import vuePageDesigner from '../src'

export default {
  data () {
    return {
      widgets,
      widgetStyle
    }
  },

  components: {
    vuePageDesigner
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
