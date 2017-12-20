<template>
  <div id="app">
    <vue-page-designer :widgets="widgets" :widgetStyle="widgetStyle" @save="handleSave" />
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

  methods: {
    handleSave (data) {
      console.log('saving:', data)
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
