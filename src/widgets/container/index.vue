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
  icon: 'layout',
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
