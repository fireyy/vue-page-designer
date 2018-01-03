<template>
	<div v-show="elm">
		<!-- 左 -->
	  <div class="verti"
	  	@mousedown="handlemousedown($event, 'left', 'left', 'width')"
	    :style="{
	      height: elm.height + 'px',
	      top: elm.top + 'px',
	      left: elm.left + 'px'
	    }">
	    <div class="square"></div>
	  </div>

		<!-- 右 -->
	  <div class="verti"
		  @mousedown="handlemousedown($event, 'right', 'width')"
	    :style="{
	      height: elm.height + 'px',
	      top: elm.top + 'px',
	      left: elm.left + elm.width + 'px'
	    }">
	    <div class="square"></div>
	  </div>

		<!-- 上 -->
	  <div class="horiz"
		  @mousedown="handlemousedown($event, 'up', 'top', 'height')"
	    :style="{
	      width: elm.width + 'px',
	      top: elm.top + 'px',
	      left: elm.left + 'px'
	    }">
	    <div class="square"></div>
	  </div>

		<!-- 下 -->
	  <div class="horiz"
		  @mousedown="handlemousedown($event, 'down', 'height')"
	    :style="{
	      width: elm.width + 'px',
	      top: elm.top + elm.height + 'px',
	      left: elm.left + 'px'
	    }">
	    <div class="square"></div>
	  </div>
	</div>
</template>

<script>
export default {
  computed: {
    elm () {
      var target = this.$store.state.activeElement

      if (!target.resizable || target.belong !== 'page') return ''

      return target
    }
  },

  data () {
    return {
      type: '' // 调整方向 left | right | up | down
    }
  },

  methods: {
    handlemousedown (e, type, originX, originY) {
      e.stopPropagation()
      this.type = type
      this.$store.commit('initmove', {
        startX: e.pageX,
        startY: e.pageY,
        originX: this.elm[originX],
        originY: this.elm[originY]
      })

      document.addEventListener('mousemove', this.handlemousemove, true)
      document.addEventListener('mouseup', this.handlemouseup, true)
    },

    handlemousemove (e) {
      e.stopPropagation()
      e.preventDefault()

      this.$store.commit('resize', {
        x: e.pageX,
        y: e.pageY,
        type: this.type
      })
    },

    handlemouseup () {
      document.removeEventListener('mousemove', this.handlemousemove, true)
      document.removeEventListener('mouseup', this.handlemouseup, true)
      this.$store.commit('stopmove')
    }
  }
}
</script>

<style scoped>
.verti,
.horiz {
  position: absolute;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.verti {
  width: 0;
  cursor: ew-resize;
}
.horiz {
  height: 0;
  cursor: ns-resize;
}
.square {
  width: 10px;
  height: 10px;
  border: 1px solid #2196f3;
  background-color: #fff;
  flex-shrink: 0;
}
</style>
