<template>
	<div>
    <div class="layer-selector">
      <icon name="list" title="Layer" />
      <ul class="layer-list">
        <li :class="{'layer-active': layer === activeElement}" v-for="(layer, i) in layers" :key="i" @click="(e) => {activeLayer(e, i, layer)}">{{layer.type}}</li>
      </ul>
    </div>
    <ul class="menu-bar" @mousedown="updateSrollTop">
      <li class="menu-item" @click="(e) => {addWidget(e, item)}" v-for="item in widgets" :key="item.name">
        <icon :name="item.icon" :title="item.title" />
        <p class="menu-caption">{{item.title}}</p>
      </li>
    </ul>
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
      let container = this.$store.state.widgets.map(a => a.type === "braid-container")
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
      console.log('top', top)
      this.$store.commit("updateSrollTop", document.getElementById("viewport").scrollTop)
    },

    activeLayer (e, index, item) {
      this.$store.commit("select", {
        type: item.type,
        index: index
      })
    }
  }
}
</script>

<style scoped>
.layer-selector {
  padding-top: 10px;
  text-align: center;
  position: relative;
}
.layer-selector .svg-icon {
  font-size: 24px;
}
.layer-list {
  position: absolute;
  width: 200px;
  left: 50px;
  top: 0;
  background: #fff;
  padding: 5px;
  z-index: 8;
}
.layer-list li {
  text-align: left;
  cursor: pointer;
  white-space: nowrap;
  line-height: 24px;
}
.layer-list li.layer-active {
  background: var(--main);
}
.menu-bar {
  width: 50px;
  height: 100%;
  border-right: 1px solid #eee;
  color: var(--main);
  padding-top: 10px;
  user-select: none;
}
.menu-item {
  display: inline-block;
  text-align: center;
  width: 50px;
  height: 50px;
  cursor: pointer;
  padding-top: 13px;
  transition: all 0.2s;
  position: relative;
}
.menu-item .svg-icon {
  font-size: 24px;
}
.menu-caption {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  width: 100%;
  opacity: 0;
  transition: all 0.2s;
}
.menu-item:hover {
  padding-top: 5px;
}
.menu-item:hover .svg-icon {
  font-size: 20px;
}
.menu-item:hover p {
  opacity: 1;
}
</style>
