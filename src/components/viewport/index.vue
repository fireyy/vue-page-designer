<template>
  <div class="holder" id="viewport">
    <div class="screen"
      @dblclick="replaceImage"
      :style="{
        backgroundColor: backgroundColor,
        height: height + 'px',
        transform: 'scale(' + zoom / 100 + ')'
      }">

      <!-- 组件 -->
      <component
        :is="val.type"
        v-for="(val, i) in widgetStore"
        :key="i"
        :i="i"
        :id="id"
        :val="val"
        :h="height"
        :w="750"
        :playState="playState">
      </component>

      <!-- 参考线 -->
      <ref></ref>

      <!-- 尺寸控制器 -->
      <control></control>
    </div>
  </div>
</template>

<script>
import ref from "./ref-lines"
import control from "./size-control"
import { move } from "@/mixins"

export default {
  name: "viewport",
  components: {
    ref: ref, // 参考线
    control: control // 尺寸控制
  },

  mixins: [move],

  props: ["zoom"],

  data () {
    return {}
  },

  mounted () {
    // 采用事件代理的方式监听元件的选中操作
    document
      .getElementById("viewport")
      .addEventListener("mousedown", this.handleSelection, false)

    // 绑定键盘上下左右键用于元件的移动
    document.addEventListener(
      "keydown",
      e => {
        e.stopPropagation()
        var target = this.$store.state.activeElement

        // 左
        if (e.keyCode === 37 && target.left) {
          target.left -= 1
          return;
        }
        // 上
        if (e.keyCode === 38 && target.top) {
          e.preventDefault()
          target.top -= 1
          return;
        }
        // 右
        if (e.keyCode === 39 && target.left) {
          target.left += 1
          return;
        }

        // 下
        if (e.keyCode === 40 && target.top) {
          e.preventDefault()
          target.top += 1
        }
      },
      true
    )
  },

  methods: {
    handleSelection (e) {
      var target = e.target
      var type = target.getAttribute("data-type")

      if (type) {
        var index = target.getAttribute("data-index")

        // 设置选中元素
        this.$store.commit("select", {
          type: type,
          index: index ? parseInt(index) : -1
        })

        // 绑定移动事件：只有从属于 page 的，除背景图以外的元件才能移动
        var target = this.$store.state.activeElement
        if (target.belong === "page" && type !== "bgImage") {
          this.initmovement(e) // 参见 mixins
        }
      } else {
        // 取消选中元素
        this.$store.commit("select", {
          type: "page",
          index: -1
        })
      }
    },

    // FIXME: indexOf('image') 替换图片
    replaceImage (e) {
      if (this.id.toLowerCase().indexOf("image") > -1) {
        $communicator.$emit("upload", payload => {
          this.$store.commit("replaceImage", payload)
        })
      }
    }
  },

  computed: {
    // 已添加的组件
    widgetStore () {
      return this.$store.state.widgets.filter(item => item.belong === "page")
    },

    // 画布高度
    height () {
      return this.$store.state.page.height
    },

    // 页面背景色
    backgroundColor () {
      return this.$store.state.page.backgroundColor
    },

    // 选中项id
    id () {
      var type = this.$store.state.type
      var index = this.$store.state.index
      index = index >= 0 ? index : ""
      return type + index
    },

    // 动画播放状态
    playState () {
      return this.$store.state.playState
    }
  }
}
</script>

<style scoped>
.holder {
  height: 100%;
  overflow: auto;
  font-size: 0;
  background-image: linear-gradient(
      45deg,
      #f5f5f5 25%,
      transparent 0,
      transparent 75%,
      #f5f5f5 0
    ),
    linear-gradient(
      45deg,
      #f5f5f5 25%,
      transparent 0,
      transparent 75%,
      #f5f5f5 0
    );
  background-position: 0 0, 13px 13px;
  background-size: 26px 26px;
}
.screen {
  width: 750px;
  margin: 25px auto;
  transform-origin: center top;
  position: relative;
}
</style>
