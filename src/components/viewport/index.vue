<template>
  <div
    id="viewport"
    class="holder">
    <div
      :style="{
        backgroundColor: backgroundColor,
        height: height + 'px',
        transform: 'scale(' + zoom / 100 + ')'
      }"
      class="screen"
      @dblclick="replaceImage">

      <!-- 组件 -->
      <component
        v-for="val in widgetStore"
        :is="val.type"
        :data-title="val.type"
        :class="{'g-active': id === val.uuid}"
        :key="val.uuid"
        :val="val"
        :h="height"
        :w="750"
        :data-type="val.type"
        :data-uuid="val.uuid"
        :play-state="playState"
        class="layer">
        <component
          v-for="child in getChilds(val.name)"
          :is="child.type"
          :data-title="child.type"
          :class="{'g-active': id === child.uuid}"
          :key="child.uuid"
          :val="child"
          :h="height"
          :w="750"
          :data-type="child.type"
          :data-uuid="child.uuid"
          :play-state="playState"
          class="layer layer-child" />
      </component>

      <!-- 参考线 -->
      <ref/>

      <!-- 尺寸控制器 -->
      <control/>
    </div>
  </div>
</template>

<script>
import ref from './ref-lines.vue'
import control from './size-control.vue'
import { move } from '../../mixins'
import vpd from '../../mixins/vpd'

export default {
  name: 'Viewport',
  components: {
    ref: ref, // 参考线
    control: control // 尺寸控制
  },

  mixins: [move, vpd],

  props: ['zoom'],

  data () {
    return {}
  },

  computed: {
    // 已添加的组件
    widgetStore () {
      return this.$vpd.state.widgets.filter(item => item.belong === 'page')
    },

    // 画布高度
    height () {
      return this.$vpd.state.page.height
    },

    // 页面背景色
    backgroundColor () {
      return this.$vpd.state.page.backgroundColor
    },

    // 选中项id
    id () {
      // var type = this.$vpd.state.type
      // var index = this.$vpd.state.index
      // index = index >= 0 ? index : ''
      // return type + index
      return this.$vpd.state.uuid
    },

    // 动画播放状态
    playState () {
      return this.$vpd.state.playState
    }
  },

  mounted () {
    // 采用事件代理的方式监听元件的选中操作
    document
      .getElementById('viewport')
      .addEventListener('mousedown', this.handleSelection, false)

    // 绑定键盘上下左右键用于元件的移动
    document.addEventListener(
      'keydown',
      e => {
        e.stopPropagation()
        var target = this.$vpd.state.activeElement

        // 左
        if (e.keyCode === 37 && target.left) {
          target.left -= 1
          return
        }
        // 上
        if (e.keyCode === 38 && target.top) {
          e.preventDefault()
          target.top -= 1
          return
        }
        // 右
        if (e.keyCode === 39 && target.left) {
          target.left += 1
          return
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
      var type = target.getAttribute('data-type')

      if (type) {
        var uuid = target.getAttribute('data-uuid')

        // 设置选中元素
        this.$vpd.commit('select', {
          uuid: uuid || -1
        })

        // 绑定移动事件：只有从属于 page 的，除背景图以外的元件才能移动
        target = this.$vpd.state.activeElement
        if (target.belong === 'page' && target.dragable) {
          this.initmovement(e) // 参见 mixins
        }
      } else {
        // 取消选中元素
        this.$vpd.commit('select', {
          uuid: -1
        })
      }
    },

    // 替换图片
    replaceImage (e) {
      if (this.$vpd.state.activeElement.isUpload) {
        this.$vpd.$emit('upload', payload => {
          this.$vpd.commit('replaceImage', payload)
        })
      }
    },

    // 获取子组件
    getChilds (name) {
      return this.$vpd.state.widgets.filter(
        item => item.belong === name
      )
    }
  }
}
</script>

<style scoped>
.holder {
  display: flex;
  justify-content: center;
  height: 100%;
  overflow: auto;
  font-size: 0;
  border: 1px solid #f5f5f5;
  border-width: 0 1px;
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
