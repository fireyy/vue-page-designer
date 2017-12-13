<template>
  <ul class="layer-list">
    <li>
      <span>Page</span>
      <ul>
        <li :class="{'layer-active': layer === activeElement}" v-for="(layer, i) in layers" :key="i" @click="(e) => {activeLayer(e, i, layer)}">{{layer.type}}</li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    layers () {
      return this.$store.state.widgets
    },
    activeElement () {
      return this.$store.state.activeElement
    }
  },
  methods: {
    activeLayer (e, index, item) {
      // FIXME: scroll to layer
      this.$store.commit("select", {
        type: item.type,
        index: index
      })
    }
  }
}
</script>

<style scoped>
.layer-list {
  width: 200px;
  background: #fff;
  padding: 10px;
  border-right: 1px solid #eee;
}
.layer-list li {
  text-align: left;
  cursor: pointer;
  white-space: nowrap;
  line-height: 24px;
  padding-left: 5px;
}
.layer-list li::before {
  content: '› ';
}
.layer-list li:hover {
  background: #f5f5f5;
}
.layer-list li.layer-active {
  color: var(--light);
  background: var(--main);
}
</style>
