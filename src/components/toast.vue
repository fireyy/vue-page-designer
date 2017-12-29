<template>
  <transition name="drop">
    <div class="toast" :class="klass" v-show="show">{{ info }}</div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      info: '',
      type: 'warning',
      show: false
    }
  },
  computed: {
    klass () {
      return {
        'toast-success': this.type === 'success',
        'toast-warning': this.type === 'warning',
        'toast-error': this.type === 'error'
      }
    }
  },
  mounted () {
    this.$store.$on('notify', (option) => {
      this.notify(option.info, option.type)
    })
  },
  methods: {
    notify (info, type) {
      if (this.show) return
      this.info = info || 'Success!'
      if (type) this.type = type
      this.show = true
      setTimeout(() => {
        this.show = false
      }, 2000)
    }
  }
}
</script>

<style lang="scss">
.toast {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 70px;
  width: auto;
  transition: all .3s;
}
.drop-enter, .drop-leave-active {
  opacity: 0;
  top: 60px;
}
</style>
