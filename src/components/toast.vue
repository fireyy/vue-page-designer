<template>
  <transition name="drop">
    <div class="toast" v-show="show">{{ info }}</div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      info: '',
      type: true,
      show: false
    }
  },
  mounted () {
    $communicator.$on('notify', (option) => {
      this.notify(option.info, option.type)
    })
  },
  methods: {
    notify (info, type) {
      if (this.show) return
      this.info = info || 'Success!'
      // FIXME: type = "success" or "warning"
      this.type = type || true
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
