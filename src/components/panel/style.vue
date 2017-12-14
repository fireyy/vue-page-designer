<template>
  <div class="panel-wrap" v-if="!activeElement.page && tab === 1">
    <!-- 公共属性 -->
    <div class="panel-row">
      <icon name="layers" />
      <div class="panel-label">层级</div>
      <div class="panel-value">{{ activeElement.z }}</div>
      <div class="panel-slider-wrap">
        <slider v-model="activeElement.z" :step="1" :max="20" />
      </div>
    </div>

    <div class="panel-row">
      <icon name="more-horizontal" />
      <div class="panel-label">宽度</div>
      <div class="panel-value">{{ activeElement.width }}</div>
      <div class="panel-slider-wrap">
        <slider v-model="activeElement.width" :step="1" :max="750" />
      </div>
    </div>

    <div class="panel-row">
      <icon name="more-vertical" />
      <div class="panel-label">高度</div>
      <div class="panel-value">{{ activeElement.height }}</div>
      <div class="panel-slider-wrap">
        <slider v-model="activeElement.height" :step="1" :max="height" />
      </div>
    </div>

    <div class="panel-row">
      <icon name="arrow-right" />
      <div class="panel-label">横坐标</div>
      <div class="panel-value">{{ activeElement.left }}</div>
      <div class="panel-slider-wrap">
        <slider v-model="activeElement.left" :step="1" :max="750" />
      </div>
    </div>

    <div class="panel-row">
      <icon name="arrow-down" />
      <div class="panel-label">纵坐标</div>
      <div class="panel-value">{{ activeElement.top }}</div>
      <div class="panel-slider-wrap">
        <slider v-model="activeElement.top" :step="1" :max="height" />
      </div>
    </div>

    <!-- 组件样式 -->
    <component :is="widgetStyle[i]" v-for="(item, i) in widgetStyle" :key="i" :activeElement="activeElement" />

    <!-- 添加到容器 -->
    <div v-if="activeElement.type === 'braid-pic' || activeElement.type === 'braid-txt'">
      <hr>
      <div class="panel-row">
        <icon name="layout" />
        <div class="panel-label">所属容器</div>
        <div class="panel-value">
          <select v-model="activeElement.belong">
            <option>page</option>
            <option v-for="(val, index) in containerName" :key="index">{{ val }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import widget from "@/plugins/widget"

export default {
  name: "panel-style",

  props: ["activeElement", "tab"],

  data () {
    return {}
  },

  computed: {
    widgetStyle () {
      return widget.getWidgetStyle()
    },
    // 页面高度
    height () {
      return this.$store.state.page.height
    },

    // 容器名称
    containerName () {
      var arr = []
      this.$store.state.widgets.map(
        val => val.type === "braid-container" && val.name && arr.push(val.name)
      )

      return arr
    }
  }
}
</script>
