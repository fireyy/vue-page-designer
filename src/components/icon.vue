<template>
  <i :title="title" class="svg-icon" v-html="icon" @click="handleClick"></i>
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
  width: auto;
  height: 1em;
  display: inline-block;
}
</style>
