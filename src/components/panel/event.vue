<template>
  <div class="panel-wrap" v-if="tab === 2">
    <div class="panel-row">
      <icon name="link" />
      <div class="panel-label">点击时</div>
    </div>

    <div class="panel-row" v-if="activeElement.href !== undefined">
      <div class="panel-label">链接至</div>
      <div class="panel-value">
        <input type="text" v-model="activeElement.href" placeholder="绝对路径，以https://开头">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['activeElement', 'tab']
}
</script>
