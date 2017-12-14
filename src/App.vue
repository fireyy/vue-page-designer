<template>
  <div class="app">
    <!-- 顶栏 -->
    <navbar></navbar>

    <!-- 主体 -->
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

    <!-- 全局组件 | 上传图片 -->
    <uploader></uploader>

    <!-- 全局组件 | 提示信息 -->
    <toast></toast>
  </div>
</template>

<script>
import navbar from "./components/navbar.vue"
import toolbar from "./components/toolbar.vue"
import panel from "./components/panel"
import viewport from "./components/viewport"

export default {
  components: {
    navbar, // 顶部导航栏
    toolbar, // 左侧菜单栏
    panel, // 右侧参数面板
    viewport // 页面画布
  },

  mounted () {
    // 初始化选中元件（将页面作为初始选中元件）
    this.$store.commit("initActive")
  },

  methods: {
    dozoom (val) {
      this.$store.commit("zoom", val)
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
  height: calc(100% - 40px);
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
</style>

<style>
/* global variables */
:root {
  --main: #222;
  --main-light: rgba(34, 34, 34, 0.3);
  --sub: #2196f3;
  --sub-light: rgba(30, 150, 243, 0.3);
  --light: #fff;
}

[flex] {
  display: flex;
}

[rel] {
  position: relative;
}

[abs] {
  position: absolute;
}

.g-active {
  outline: 1px solid var(--sub) !important;
}

html,
body,
.app {
  height: 100%;
}
html {
  font-size: 12px;
}
body {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", sans-serif;
}
input[type="color"] {
  cursor: pointer;
  width: 24px;
  vertical-align: middle;
}
::-webkit-color-swatch {
  border: none;
  border-radius: 4px;
}
::-webkit-color-swatch-wrapper {
  padding: 1px;
  border-radius: 4px;
  border: 1px solid var(--main);
}
input[type="checkbox"] {
  appearance: none;
  cursor: pointer;
  vertical-align: middle;
  border: 1px solid var(--main);
  padding: 6px;
  border-radius: 3px;
  position: relative;
}
input[type="checkbox"]:checked:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 12px;
  height: 12px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>')
    no-repeat 0 0;
  background-size: 100%;
  color: #fff;
}
input[type="radio"] {
  appearance: none;
  cursor: pointer;
  vertical-align: middle;
  border: 1px solid var(--main);
  padding: 6px;
  border-radius: 12px;
  position: relative;
}
input[type="radio"]:checked:after {
  content: "";
  font-size: 12px;
  position: absolute;
  top: 2px;
  left: 2px;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background: var(--main);
}
label {
  cursor: pointer;
}
select {
  appearance: none;
  border-radius: 4px;
  outline: none;
  border: 1px solid var(--main-light);
  padding: 5px 15px 5px 3px;
  height: 28px;
  cursor: pointer;
  font-family: inherit;
  background: #fff url("data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%204%205'%3E%3Cpath%20fill='%23000000'%20d='M2%200L0%202h4zm0%205L0%203h4z'/%3E%3C/svg%3E") no-repeat right 5px center;
  background-size: 8px;
}
select:focus {
  border-color: var(--main);
  box-shadow: 0 0 0 .1rem rgba(0,0,0, .1);
}
textarea {
  outline: none;
  font-family: inherit;
}
.tooltip {
  position: relative;
}
.tooltip::after {
  background: rgba(0, 0, 0, .6);
  border-radius: 4px;
  bottom: 100%;
  color: var(--light);
  content: attr(data-tooltip);
  display: block;
  font-size: 12px;
  line-height: 20px;
  left: 50%;
  max-width: 320px;
  opacity: 0;
  overflow: hidden;
  padding: 2px 4px;
  pointer-events: none;
  position: absolute;
  text-overflow: ellipsis;
  transform: translate(-50%, 4px);
  transition: all .2s ease;
  white-space: pre;
  z-index: 300;
}
.tooltip:hover::after {
  opacity: 1;
  transform: translate(-50%, -2px);
}
.tooltip.tooltip-bottom::after {
  bottom: auto;
  top: 100%;
  transform: translate(-50%, -4px);
}
.tooltip.tooltip-bottom:hover::after {
  transform: translate(-50%, 2px);
}
</style>
