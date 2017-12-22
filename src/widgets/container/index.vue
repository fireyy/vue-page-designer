<template>
  <div
    class="lz-container"
    data-type="braid-container"
    :data-uuid="val.uuid"
    :class="[playState ? 'anm-' + val.animationName : '']"
    :style="{
      display: val.display,
      position: 'absolute',
      width: val.width / 7.5 + '%',
      height: val.height / h * 100 + '%',
      left: val.left / 7.5 + '%',
      top: val.top / h * 100 + '%',
      zIndex: val.z,
      backgroundColor: val.bgColor,
      backgroundImage: 'url(' + val.backPic + ')',
      borderStyle: 'solid',
      borderRadius: val.radius + 'px',
      borderColor: val.borderColor,
      borderWidth: val.borderWidth + 'px',
      flexDirection: val.dir,
      justifyContent: val.justify,
      alignItems: val.align
    }">

    <!-- 子组件 -->
    <component
      :is="val.type"
      class="layer layer-child"
      :class="{'g-active': current === val.uuid}"
      v-for="val in childs"
      :key="val.uuid"
      :val="val"
      :h="val.height"
      :w="val.width"
      :playState="playState">
    </component>
  </div>
</template>

<script>
import stylec from './style.vue'

export default {
  name: 'braid-container',
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layout"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>',
  title: '容器',
  panel: stylec,
  setting: {
    type: 'braid-container',
    hasGuide: true,
    name: '',
    width: 650,
    height: 300,
    left: 50,
    top: 0,
    z: 0,
    display: 'flex',
    bgColor: '',
    backPic: '',
    backPicUrl: '',
    radius: 0,
    borderColor: '',
    borderWidth: 0,
    dir: 'row',
    justify: 'flex-start',
    align: 'flex-start',
    belong: 'page',
    animationName: ''
  },
  props: ['h', 'val', 'playState'],

  computed: {
    // 子组件
    childs () {
      return this.$store.state.widgets.filter(
        item => item.belong === this.val.name
      )
    },

    current () {
      return this.$store.state.uuid
    }
  }
}
</script>

<style scoped>
.lz-container {
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
</style>
