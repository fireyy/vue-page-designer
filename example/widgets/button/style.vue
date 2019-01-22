<template>
  <div>
    <hr>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">背景色</div>
      <div class="panel-value">{{ activeElement.bgColor }}</div>
      <div class="panel-value">
        <input
          v-model="activeElement.bgColor"
          type="color">
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="image" />
      <div class="panel-label">背景图</div>
      <div class="panel-value">
        <div
          :style="{ backgroundImage: 'url(' + activeElement.backPic + ')' }"
          class="panel-preview"
          @click="addPic">
          <vpd-icon
            v-show="!activeElement.backPic"
            name="plus" />
        </div>
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="edit-3" />
      <div class="panel-label">文字颜色</div>
      <div class="panel-value">{{ activeElement.color }}</div>
      <div>
        <input
          v-model="activeElement.color"
          type="color">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BraidButtonStyle',
  props: ['activeElement'],
  methods: {
    addPic () {
      this.$vpd.$emit('upload', (payload) => {
        this.$vpd.commit('addBackPic', payload)
      })
    }
  }
}
</script>
