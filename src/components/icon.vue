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
      // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-smartphone"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12" y2="18"></line></svg>
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
