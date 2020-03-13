<template>
  <div
    v-if="activeElement.page && tab === 1"
    class="panel-wrap">
    <div
      class="panel-row"
      flex>
      <vpd-icon name="type" />
      <div class="panel-label">{{ $t('messages.page.name') }}</div>
      <div class="panel-value">
        <input
          v-model="activeElement.title"
          type="text">
      </div>
    </div>

    <div
      class="panel-row"
      flex>
      <vpd-icon name="smartphone" />
      <div class="panel-label">{{ $t('messages.page.height') }}</div>
      <div class="panel-value">
        <input
          v-model="activeElement.height"
          type="text">
      </div>
    </div>

    <div
      class="panel-row"
      flex>
      <vpd-icon name="droplet" />
      <div class="panel-label">{{ $t('messages.page.background') }}</div>
      <div class="panel-value">
        <input
          v-model="activeElement.backgroundColor"
          type="color">
      </div>
    </div>

    <div
      class="panel-row"
      flex>
      <vpd-icon name="clock" />
      <div class="panel-label">{{ $t('messages.page.endTime') }}</div>
      <div class="panel-value">
        <input
          v-model="activeElement.endTime"
          type="date">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['activeElement', 'tab']
}
</script>
