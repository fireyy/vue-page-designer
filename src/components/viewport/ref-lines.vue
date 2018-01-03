<template>
  <div class="guides" v-show="moving">
    <!-- 横线 -->
    <div class="horiz" :key="val + i" v-for="(val, i) in horiz"
      :style="{top: val + 'px'}"
      v-show="attachHoriz(val)"></div>

    <!-- 竖线 -->
    <div class="verti" :key="val + i" v-for="(val, i) in verti"
      :style="{left: val + 'px'}"
      v-show="attachVerti(val)"></div>
  </div>
</template>

<script>
export default {
  name: 'ref-lines',
  methods: {
    attachHoriz (value) {
      return this.horizontal.some(val => Math.abs(val - value) <= 1)
    },
    attachVerti (value) {
      return this.vertical.some(val => Math.abs(val - value) <= 1)
    }
  },

  computed: {
    moving () {
      return this.$store.state.moving
    },
    guides () {
      var state = this.$store.state
      var guides = []
      var uuid = state.uuid

      state.widgets.forEach(item => {
        // 排除选中元素
        if (item.hasGuide && item.uuid === uuid) return
        // 排除容器中的元件
        if (item.hasGuide && item.belong !== 'page') return

        guides.push({
          width: item.width,
          height: item.height,
          top: item.top,
          left: item.left
        })
      })

      return guides
    },
    /**
     * 获取参考线
     *
     * 取画布中线以及每个元件上下边的坐标
     * 排除正在移动的元件
     * 排除画布边缘坐标
     * 排除重复坐标
     */
    horiz () {
      var guides = this.guides
      var cor = []

      guides.forEach(val => {
        var top = val.top
        var bottom = top + val.height

        if (cor.indexOf(top) < 0 && top !== 0) {
          cor.push(top)
        }
        if (cor.indexOf(bottom) < 0) {
          cor.push(bottom)
        }
      })

      return cor
    },

    verti () {
      var guides = this.guides
      var cor = [375]

      guides.forEach(val => {
        var left = val.left
        var right = left + val.width

        if (cor.indexOf(left) < 0 && left !== 0) {
          cor.push(left)
        }
        if (cor.indexOf(right) < 0 && right < 750) {
          cor.push(right)
        }
      })

      return cor
    },

    // 移动元素上下边坐标
    horizontal () {
      var a = this.$store.state.activeElement
      if (a) {
        var h = Math.round(a.height)
        return [a.top, a.top + h]
      } else {
        return []
      }
    },

    // 移动元素左中右坐标
    vertical () {
      var a = this.$store.state.activeElement
      if (a) {
        var w = Math.round(a.width / 2)
        return [a.left, a.left + w, a.left + w * 2]
      } else {
        return []
      }
    }
  }
}
</script>

<style scoped>
.guides {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
}
.verti {
  position: absolute;
  width: 1px;
  height: 1000%;
  top: -50px;
  background: #18ffff;
}
.horiz {
  position: absolute;
  height: 0.5px;
  width: 1000%;
  left: -500%;
  background: #18ffff;
}
</style>
