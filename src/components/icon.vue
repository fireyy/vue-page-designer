<template>
  <i :title="title" class="icon svg-icon" v-html="icon" @click="handleClick"></i>
</template>
<script>
export default {
  name: 'icon',
  props: {
    svg: String,
    title: String,
    name: String,
    options: Object
  },
  computed: {
    icon () {
      return this.svg || `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><use xlink:href="#${this.name}"></svg>`
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>
<style>
.svg-icon svg {
  box-sizing: border-box;
  display: inline-block;
  font-size: inherit;
  font-style: normal;
  height: 1em;
  position: relative;
  vertical-align: middle;
  width: auto;
}
</style>
