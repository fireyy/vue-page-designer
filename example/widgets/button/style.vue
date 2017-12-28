<template>
	<div v-if="activeElement.type === 'braid-button'">
    <hr>
    <div class="panel-row">
      <icon name="target" />
      <div class="panel-label">背景色</div>
      <div class="panel-value">{{ activeElement.bgColor }}</div>
      <div class="panel-value">
        <input type="color" v-model="activeElement.bgColor">
      </div>
    </div>

    <div class="panel-row">
      <icon name="image" />
      <div class="panel-label">背景图</div>
      <div class="panel-value">
        <div class="panel-preview"
          @click="addPic"
          :style="{ backgroundImage: 'url(' + activeElement.backPic + ')' }">
          <icon name="plus" v-show="!activeElement.backPic" />
        </div>
      </div>
    </div>

    <div class="panel-row">
      <icon name="edit-3" />
      <div class="panel-label">文字颜色</div>
      <div class="panel-value">{{ activeElement.color }}</div>
      <div>
        <input type="color" v-model="activeElement.color">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'braid-button-style',
  props: ['activeElement'],
  methods: {
    addPic () {
      window.$communicator.$emit('upload', (payload) => {
        this.$store.commit('addBackPic', payload)
      })
    }
  }
}
</script>
