<template>
  <div
    v-if="tab === 2"
    class="panel-wrap">
    <div class="panel-row">
      <vpd-icon name="link" />
      <div class="panel-label">{{ $t('data.events.onclick') }}</div>
    </div>

    <div
      v-if="activeElement.href !== undefined"
      class="panel-row">
      <div class="panel-label">{{ $t('data.events.linkTo') }}</div>
      <div class="panel-value">
        <input
          v-model="activeElement.href"
          type="text"
          placeholder="绝对路径，以https://开头">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['activeElement', 'tab']
}
</script>
