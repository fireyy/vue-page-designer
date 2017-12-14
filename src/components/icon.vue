<template>
  <i :title="title" class="icon svg-icon" v-html="icon" @click="handleClick"></i>
</template>
<script>
import feather from "feather-icons"

export default {
  name: "icon",
  props: {
    title: String,
    name: String,
    options: Object
  },
  computed: {
    icon () {
      return feather.icons[this.name].toSvg(this.options)
    }
  },
  methods: {
    handleClick () {
      this.$emit("click")
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
