<template>
  <div
    class="txt"
    v-html="val.text"
    data-type="braid-txt"
    :data-index="i"
    :class="[{'g-active': isCurrent}, playState ? 'anm-' + val.animationName : '']"
    :style="{
      position: val.belong === 'page' ? 'absolute' : 'relative',
      left: val.belong === 'page' ? val.left / w * 100 + '%' : '0',
      top: val.belong === 'page' ? val.top / h * 100 + '%' : '0',
      width: val.width / w * 100 + '%',
      height: val.height / h * 100 + '%',
      zIndex: val.z,
      lineHeight: val.lineHeight,
      fontSize: val.fontSize + 'rem',
      color: val.color,
      textAlign: val.textAlign,
      fontWeight: val.fontWeight ? 'bold': 'normal'
    }">
  </div>
</template>

<script>
  export default {
    name: 'braid-txt',
    icon: 'type',
    title: '文本',
    setting: {
      type: 'braid-txt',
      hasGuide: true,
      isChild: true,
      width: 650,
      height: 100,
      left: 50,
      top: 0,
      z: 0,
      lineHeight: 1.6,
      fontSize: .85,
      fontWeight: false,
      color: '#000000',
      textAlign: 'left',
      text: '文本',
      href: '',
      belong: 'page',
      animationName: ''
    },
    // 属性含义参照 widgets/pic/index.vue
    props: ['val', 'h', 'w', 'i', 'id', 'playState'],

    data () {
      return {
      }
    },

    methods: {
    },

    computed: {
      isCurrent () {
        return 'braid-txt' + this.i === this.id
      }
    }
  }
</script>

<style scoped>
  .txt {
    outline: none;
    font-size: 28px;
  }
</style>
