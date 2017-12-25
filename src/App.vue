<template>
  <div class="app">
    <navbar></navbar>
    <div class="body container">
      <div class="columns col-gapless">
        <toolbar class="toolbar column" :zoom="zoom"></toolbar>
        <div class="viewport column">
          <viewport :zoom="zoom"></viewport>
          <div class="zoom-wrap">
            <slider @input="dozoom" :value="zoom" :step="1" :tuning="false" />
            <div class="zoom-value">{{ zoom }}%</div>
          </div>
        </div>
        <panel class="control-panel column"></panel>
      </div>
    </div>
    <uploader :upload="upload" :uploadOption="uploadOption"></uploader>
    <toast></toast>
  </div>
</template>

<script>
import Vue from 'vue'
import store from './store'
import widget from './plugins/widget'
import navbar from './components/navbar.vue'
import toolbar from './components/toolbar.vue'
import panel from './components/panel/index.vue'
import viewport from './components/viewport/index.vue'
import loadSprite from './utils/load-sprite'

export default {
  name: 'vue-page-designer',
  store,
  components: {
    navbar, // 顶部导航栏
    toolbar, // 左侧菜单栏
    panel, // 右侧参数面板
    viewport // 页面画布
  },
  props: {
    value: Object,
    widgets: Object,
    upload: Function,
    uploadOption: Object
  },
  beforeCreate () {
    loadSprite('http://p1cu7wuzw.bkt.clouddn.com/icons.svg', 'svgspriteit')
  },
  created () {
    // 注册 widgets
    Vue.use(widget, {
      widgets: this.widgets
    })
    // 初始化已有数据
    if (this.value) {
      store.replaceState(this.value)
    }
    window.$communicator.$on('save', () => {
      this.$emit('save', store.state)
    })
  },
  mounted () {
    // 初始化选中元件（将页面作为初始选中元件）
    this.$store.commit('initActive')
  },

  methods: {
    dozoom (val) {
      this.$store.commit('zoom', val)
    }
  },

  computed: {
    zoom () {
      return this.$store.state.zoom
    }
  }
}
</script>

<style lang="scss">
.body {
  width: 100%;
  height: calc(100% - 50px);
  overflow: hidden;
  flex-direction: row;
  &.container {
    padding: 0;
  }
}
.columns {
  height: 100%;
}
.toolbar,
.viewport,
.control-panel {
  height: 100%;
}
.toolbar {
  background: #fff;
  user-select: none;
  box-sizing: content-box;
  &.column {
    flex: none;
    width: 150px;
  }
}
.viewport {
  position: relative;
  overflow: hidden;
}
.control-panel {
  background: #fff;
  user-select: none;
  &.column {
    flex: none;
    width: 400px;
  }
}
.zoom-wrap {
  width: 200px;
  height: 30px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  opacity: 0;
  transition: opacity 0.3s;
}
.viewport:hover .zoom-wrap {
  opacity: 1;
}
.zoom-value {
  position: absolute;
  top: 4px;
  left: -36px;
}
#svgspriteit {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
</style>
