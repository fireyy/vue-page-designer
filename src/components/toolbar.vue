<template>
  <div class="menu-bar">
    <details open>
      <summary><icon name="list" />可用组件</summary>
      <ul @mousedown="updateSrollTop">
        <li class="menu-item" @click="(e) => {addWidget(e, item)}" v-for="item in widgets" :key="item.name">
          <icon :name="item.icon" :title="item.title" />
          <p class="menu-caption">{{item.title}}</p>
        </li>
      </ul>
    </details>
    <details>
      <summary><icon name="layers" />已加组件</summary>
      <ul class="layer-list">
        <li :class="{'layer-active': layer === activeElement}" v-for="(layer, i) in layers" :key="i" @click="(e) => {activeLayer(e, i, layer)}">{{layer.type}}</li>
      </ul>
    </details>
  </div>
</template>

<script>
import widget from "@/plugins/widget"
import { move } from "@/mixins"

export default {
  mixins: [move],
  props: ["zoom"],
  data () {
    return {}
  },
  computed: {
    widgets () {
      return widget.getWidgets()
    },
    layers () {
      return this.$store.state.widgets
    },
    activeElement () {
      return this.$store.state.activeElement
    }
  },
  methods: {
    // 添加组件
    addWidget (e, item) {
      this.$store.dispatch("addWidget", item)
    },

    // 为确保添加的元件出现在可视区内，用画布向上滚动距离作为元件初始 top 值
    updateSrollTop () {
      var top = document.getElementById("viewport").scrollTop / this.zoom * 100
      this.$store.commit("updateSrollTop", top)
    },

    activeLayer (e, index, item) {
      // FIXME: scroll to layer
      this.$store.commit("select", {
        type: item.type,
        index: index
      })
    }
  }
}
</script>

<style scoped>
.menu-bar {
  width: 100px;
  height: 100%;
  border-right: 1px solid #eee;
  color: var(--main);
  padding: 10px 10px 0;
  user-select: none;
  box-sizing: content-box;
}
.menu-bar details {
  margin-bottom: 10px;
}
.menu-bar summary .svg-icon {
  margin-right: 5px;
  vertical-align: middle;
}
.menu-item {
  display: inline-block;
  text-align: center;
  width: 50px;
  cursor: pointer;
  padding: 15px 0 8px;
  transition: all 0.2s;
  position: relative;
}
.menu-item .svg-icon {
  font-size: 24px;
}
.menu-caption {
  font-size: 12px;
  width: 100%;
}
.menu-item:hover {
  transform: scale(1.2);
}
.layer-list {
  padding: 10px;
}
.layer-list li {
  text-align: left;
  cursor: pointer;
  white-space: nowrap;
  line-height: 24px;
  padding-left: 5px;
}
.layer-list li::before {
  content: '› ';
}
.layer-list li:hover {
  background: #f5f5f5;
}
.layer-list li.layer-active {
  color: var(--light);
  background: var(--main);
}
</style>
