<template>
  <div
    v-if="tab === 3"
    class="panel-wrap">
    <button class="btn btn-action float-right mx-1">
      <vpd-icon
        name="plus"
        @click="addAnimation" />
    </button>

    <button class="btn btn-action float-right">
      <vpd-icon
        name="play"
        @click="play" />
    </button>

    <div class="panel-row">
      <vpd-icon name="film" />
      <div class="panel-label">{{ $t('panel.animation.select') }}</div>
      <div class="panel-value">
        <select v-model="currentName">
          <option value="">{{ $t('data.no') }}</option>
          <option
            v-for="(val, index) in animationNames"
            :key="index"
            :value="val">{{ val }}</option>
        </select>
      </div>
    </div>

    <div v-if="currentAnimation">
      <hr>
      <div class="panel-row">
        <vpd-icon name="type" />
        <div class="panel-label">{{ $t('data.name') }}</div>
        <div class="panel-value">
          <input
            v-model.trim="currentAnimation.name"
            type="text"
            placeholder="动画名称，仅限英文"
            @input="validateName">
        </div>
      </div>

      <div class="panel-row">
        <vpd-icon name="clock" />
        <div class="panel-label">{{ $t('data.duration') }}</div>
        <div class="panel-value">
          <input
            v-model.number="currentAnimation.duration"
            type="text"
            placeholder="请输入大于0的数字">
        </div>
      </div>

      <div class="panel-row">
        <vpd-icon name="watch" />
        <div class="panel-label">{{ $t('data.delay') }}</div>
        <div class="panel-value">
          <input
            v-model.number="currentAnimation.delay"
            type="text"
            placeholder="请输入不小于0的数字">
        </div>
      </div>

      <div class="panel-row">
        <vpd-icon name="repeat" />
        <div class="panel-label">{{ $t('data.iteration') }}</div>
        <div class="panel-value">
          <input
            v-model.number="currentAnimation.iteration"
            type="text"
            placeholder="输入0表示无限循环">
        </div>
      </div>

      <div class="panel-row">
        <vpd-icon name="activity" />
        <div class="panel-label">{{ $t('data.timing') }}</div>
        <div class="panel-value">
          <select v-model="currentAnimation.timing">
            <option>linear</option>
            <option>ease</option>
            <option>ease-in</option>
            <option>ease-out</option>
            <option>ease-in-out</option>
          </select>
        </div>
      </div>

      <div class="panel-row">
        <vpd-icon name="rotate-cw" />
        <div class="panel-label">{{ $t('data.direction') }}</div>
        <div class="panel-value">
          <select v-model="currentAnimation.direction">
            <option>normal</option>
            <option>reverse</option>
            <option>alternate</option>
            <option>alternate-reverse</option>
          </select>
        </div>
      </div>

      <div class="panel-row">
        <vpd-icon name="chevrons-down" />
        <div class="panel-label">fill-mode</div>
        <div class="panel-value">
          <select v-model="currentAnimation.fill">
            <option>none</option>
            <option>forwards</option>
            <option>backwards</option>
            <option>both</option>
          </select>
        </div>
      </div>

      <hr>

      <div
        v-for="(val, i) in currentAnimation.keyframes"
        :key="i">
        <div class="panel-row">
          <vpd-icon name="stop-circle" />
          <div class="panel-label">stop - {{ i }}</div>
          <div class="panel-value">{{ val.stop }}%</div>
          <div class="panel-slider-wrap">
            <vpd-slider
              :step="1"
              v-model="val.stop" />
          </div>
        </div>
        <textarea
          v-model="val.css"
          placeholder="IMPORTANT: use rem, not px"/>
        <div style="margin: 10px 0 0 20px;">
          <button
            v-if="i + 1 === currentAnimation.keyframes.length"
            class="btn btn-primary"
            @click="addkeyframe">
            <vpd-icon name="plus" /> {{ $t('data.actions.add') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAnimateCss } from '../../utils/css-generate.js'
import vpd from '../../mixins/vpd'
export default {
  name: 'PanelAnimation',
  mixins: [vpd],
  props: ['activeElement', 'tab'],
  data () {
    return {
      currentName: '',
      currentAnimation: null
    }
  },

  computed: {
    animationNames () {
      var arr = []
      this.$vpd.state.animation.map(val => arr.push(val.name))

      return arr
    }
  },

  watch: {
    currentName: function (val) {
      // 设置选中元件的动画名称
      if (this.activeElement.animationName !== undefined) {
        this.activeElement.animationName = val
      }
      this.getCurrentAnimation(val)
    },

    activeElement: function (val) {
      if (val.animationName !== undefined) {
        this.currentName = val.animationName
      } else {
        this.currentName = ''
      }
    }
  },

  methods: {
    addAnimation () {
      // 检查是否存在未命名动画，避免重复添加
      if (this.$vpd.state.animation.some(val => val.name === '')) {
        this.$vpd.$emit('notify', {
          info: this.$t('messages.alerts.unnamedanimations')
        })
        return
      }
      this.$vpd.commit('addAnimation')
      this.currentName = ''
      this.getCurrentAnimation('')
    },

    getCurrentAnimation (name) {
      var result = this.$vpd.state.animation.filter(val => val.name === name)
      this.currentAnimation = result[0]
    },

    addkeyframe () {
      var name = this.currentAnimation.name
      if (name === '') {
        this.$vpd.$emit('notify', {
          info: this.$t('messages.alerts.animation_name_required')
        })
        return
      }
      this.$vpd.commit('addkeyframe', name)
    },

    validateName (e) {
      var value = e.target.value
      if (value === '') return
      if (!/^[a-zA-Z]/.test(value)) {
        this.$nextTick(() => {
          this.currentAnimation.name = ''
        })
        this.$vpd.$emit('notify', {
          info: this.$t('messages.alerts.animation_name_validate')
        })
      }

      if (/\W/g.test(value)) {
        this.$nextTick(() => {
          this.currentAnimation.name = value.replace(/\W/g, '')
        })
        this.$vpd.$emit('notify', {
          info: this.$t('messages.alerts.animation_name_validate')
        })
      }
    },

    play () {
      // stop animation if any
      this.$vpd.commit('setAnimation', false)

      setTimeout(() => {
        var animations = this.$vpd.state.animation
        if (animations.length === 0) return

        animations.map(val => {
          // build style code and insert into document
          var id = 'anm-' + val.name
          var styleNode = document.getElementById(id)

          if (styleNode) {
            styleNode.innerHTML = getAnimateCss(
              val.name,
              val,
              val.keyframes,
              false
            )
          } else {
            var style = document.createElement('style')
            style.id = id
            style.innerHTML = getAnimateCss(
              val.name,
              val,
              val.keyframes,
              false
            )
            document.head.append(style)
          }
        })

        this.$vpd.commit('setAnimation', true)
      }, 200)
    }
  }
}
</script>

<style scoped>
textarea {
  width: 290px;
  height: 100px;
  resize: none;
  border-radius: 4px;
  padding: 4px 6px;
  margin-left: 20px;
  border-color: #ccc;
}
</style>
