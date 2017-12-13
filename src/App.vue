<template>
  <div class="app">
    <!-- 顶栏 -->
    <navbar></navbar>

    <!-- 主体 -->
    <div flex class="body">
      <!-- 左侧元件菜单 -->
      <toolbar :zoom="zoom"></toolbar>

      <!-- 中部编辑区 -->
      <div class="viewport">
        <!-- 画布 -->
        <viewport :zoom="zoom"></viewport>

        <!-- 页面缩放 -->
        <div class="zoom-wrap">
          <slider @input="dozoom" :value="zoom" :step="1" :tuning="false" />
          <div class="zoom-value">{{ zoom }}%</div>
        </div>
      </div>

      <!-- 右侧参数面板 -->
      <panel></panel>
    </div>

    <!-- 全局组件 | 上传图片 -->
    <uploader></uploader>

    <!-- 全局组件 | 提示信息 -->
    <toast></toast>
  </div>
</template>

<script>
import navbar from "./components/navbar"
import toolbar from "./components/toolbar"
import panel from "./components/panel"
import viewport from "./components/viewport"

export default {
  components: {
    navbar: navbar, // 顶部导航栏
    toolbar: toolbar, // 左侧菜单栏
    panel: panel, // 右侧参数面板
    viewport: viewport // 页面画布
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

<style scoped>
.body {
  width: 100%;
  height: calc(100% - 50px);
  overflow: hidden;
  flex-direction: row;
}
.viewport {
  flex-grow: 1;
  position: relative;
  overflow: hidden;
  height: 100%;
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

/* basic reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body,
.app {
  height: 100%;
}
html {
  font-size: 28px;
}
body {
  -webkit-font-smoothing: antialiased;
  text-size-adjust: 100%;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Droid Sans",
    "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Droid Sans Fallback",
    "Microsoft YaHei", sans-serif;
}
a {
  color: inherit;
  text-decoration: none;
}
a:active,
a:focus,
a:hover {
  outline-width: 0;
  background-color: transparent;
}
ul,
ol {
  list-style-type: none;
}
img {
  border: none;
}
input {
  border: none;
  outline: none;
  background-color: transparent;
  font-family: inherit;
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
  border-radius: 0;
  outline: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>')
    no-repeat 100% 50%;
}
textarea {
  outline: none;
  font-family: inherit;
}
</style>
