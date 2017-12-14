<!-- based on muse-ui -->
<!-- http://www.muse-ui.org/#/slider -->
<!-- TODO: use input range -->
<template>
  <div :class="{'mu-lisder-wrapper': tuning}">
    <div class="mu-slider" :class="sliderClass"
      @focus="handleFocus"
      @blur="handleBlur"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp">
      <input type="hidden" :value="inputValue">
      <div class="mu-slider-track"></div>
      <div class="mu-slider-fill" :style="fillStyle"></div>
      <div class="mu-slider-thumb" :style="thumbStyle"></div>
    </div>
    <div v-if="tuning" class="mu-increment" @mousedown.stop="increase">+</div>
    <div v-if="tuning" class="mu-decrement" @mousedown.stop="decrease">-</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 100
    },
    min: {
      type: [Number, String],
      default: 0
    },
    step: {
      type: Number,
      default: 0.1
    },
    tuning: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      inputValue: this.value,
      active: false,
      focused: false,
      dragging: false
    }
  },

  computed: {
    percent () {
      let percentNum = (this.inputValue - this.min) / (this.max - this.min) * 100
      return percentNum > 100 ? 100 : percentNum < 0 ? 0 : percentNum
    },
    fillStyle () {
      return {
        width: this.percent + '%'
      }
    },
    thumbStyle () {
      return {
        left: this.percent + '%'
      }
    },
    sliderClass () {
      return {
        zero: this.inputValue <= this.min,
        active: this.active
      }
    }
  },

  created () {
    this.handleDragMouseMove = this.handleDragMouseMove.bind(this)
    this.handleMouseEnd = this.handleMouseEnd.bind(this)
  },

  methods: {
    handleMouseDown (e) {
      this.setValue(e)
      e.preventDefault()
      document.addEventListener('mousemove', this.handleDragMouseMove)
      document.addEventListener('mouseup', this.handleMouseEnd)
      this.$el.focus()
      this.onDragStart(e)
    },

    handleMouseUp () {
      this.active = false
    },

    handleFocus () {
      this.focused = true
    },

    handleBlur () {
      this.focused = false
    },

    // 从点击位置更新 value
    setValue (e) {
      const { $el, max, min, step } = this
      let value = (e.clientX - $el.firstElementChild.getBoundingClientRect().left) / $el.firstElementChild.offsetWidth * (max - min)
      value = Math.round(value / step) * step + min
      value = parseFloat(value.toFixed(5))

      if (value > max) {
        value = max
      } else if (value < min) {
        value = min
      }
      this.inputValue = value
    },

    // 拖拽控制
    onDragStart (e) {
      this.dragging = true
      this.active = true
    },

    onDragUpdate (e) {
      if (this.dragRunning) return
      this.dragRunning = true
      window.requestAnimationFrame(() => {
        this.dragRunning = false
        if (!this.disabled) this.setValue(e)
      })
    },

    onDragStop (e) {
      this.dragging = false
      this.active = false
    },

    handleDragMouseMove (e) {
      this.onDragUpdate(e)
    },

    handleMouseEnd (e) {
      document.removeEventListener('mousemove', this.handleDragMouseMove)
      document.removeEventListener('mouseup', this.handleMouseEnd)
      this.onDragStop(e)
    },

    increase () {
      if (this.inputValue >= this.max) return
      this.inputValue += this.step
    },

    decrease () {
      if (this.inputValue <= this.min) return
      this.inputValue -= this.step
    }
  },

  watch: {
    value (val) {
      this.inputValue = val
    },
    inputValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss">
.mu-lisder-wrapper {
  width: 100%;
  height: 24px;
  position: relative;
  padding-left: 20px;
  padding-right: 30px;
}
.mu-slider {
  width: 100%;
  position: relative;
  height: 24px;
}
.mu-slider-track {
  position: absolute;
  height: 2px;
  left: 0;
  right: 0;
  top: 50%;
  margin-top: -1px;
  background-color: #e5e5e5;
}
.mu-slider-fill {
  position: absolute;
  height: 2px;
  width: 100%;
  background-color: $primary-color;
  left: 0;
  top: 50%;
  margin-top: -1px;
}
.mu-slider-thumb {
  position: absolute;
  top: 50%;
  width: 12px;
  height: 12px;
  background-color: $primary-color;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width .3s, height .3s;
  cursor: pointer;
}
.mu-slider.active .mu-slider-thumb {
  width: 18px;
  height: 18px;
}
.mu-increment,
.mu-decrement {
  width: 18px;
  height: 18px;
  position: absolute;
  top: -7px;
  cursor: pointer;
}
.mu-increment {
  right: 0;
}
.mu-decrement {
  left: 0;
}
</style>
