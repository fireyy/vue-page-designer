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
        if (this.show) return;
        this.info = info || 'Success!';
        this.type = type || true;
        this.show = true;
        setTimeout(() => {
          this.show = false;
        }, 2000)
      }
    }
  }
</script>

<style scoped>
  .toast {
    height: 30px;
    line-height: 30px;
    text-align: center;
    padding: 0 20px;
    border-radius: 4px;
    background-color: var(--main-light);
    color: #fff;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 70px;
    transition: all .3s;
  }
  .drop-enter, .drop-leave-active {
    opacity: 0;
    top: 60px;
  }
</style>
