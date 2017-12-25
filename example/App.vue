<template>
  <div id="app">
    <vue-page-designer :value="value" :widgets="widgets" @save="handleSave" :upload="handleUpload" :uploadOption="uploadOption" />
  </div>
</template>

<script>
import widgets from 'vue-page-designer-widgets'
import vuePageDesigner from '../src'

export default {
  data () {
    return {
      value: null,
      widgets,
      uploadOption: {
        url: 'https://jsonplaceholder.typicode.com/photos'
      }
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
    },
    handleUpload (files) {
      console.log('uploading:', files)
      return new Promise(resolve => {
        resolve({
          files: files,
          status: 200
        })
      })
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
