<template>
  <div
    v-if="activeElement.page && tab === 1"
    class="panel-wrap">
    <div
      class="panel-row"
      flex>
      <icon name="type" />
      <div class="panel-label">页面标题</div>
      <div class="panel-value">
        <input
          v-model="activeElement.title"
          type="text">
      </div>
    </div>

    <div
      class="panel-row"
      flex>
      <icon name="smartphone" />
      <div class="panel-label">页面高度</div>
      <div class="panel-value">
        <input
          v-model="activeElement.height"
          type="text">
      </div>
    </div>

    <div
      class="panel-row"
      flex>
      <icon name="droplet" />
      <div class="panel-label">页面背景色</div>
      <div class="panel-value">
        <input
          v-model="activeElement.backgroundColor"
          type="color">
      </div>
    </div>

    <div
      class="panel-row"
      flex>
      <icon name="clock" />
      <div class="panel-label">截止日期</div>
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
