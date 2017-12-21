<template>
  <div id="app">
    <vue-page-designer :value="value" :widgets="widgets" @save="handleSave" />
  </div>
</template>

<script>
import widgets from 'vue-page-designer-widgets'
import vuePageDesigner from '../src'

export default {
  data () {
    return {
      value: null,
      widgets
    }
  },

  created () {
    let data = window.localStorage.getItem('vpd-data')
    if (data) {
      this.value = JSON.parse(data)
    }
  },

  methods: {
    handleSave (data) {
      console.log('saving:', data)
      window.localStorage.setItem('vpd-data', JSON.stringify(data))
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
