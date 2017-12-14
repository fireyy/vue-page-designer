<template>
  <div class="panel-wrap" v-if="tab === 2">
    <div class="panel-row" flex>
      <icon name="link" />
      <div class="panel-label">点击时</div>
    </div>

    <div class="panel-row" flex v-if="activeElement.href !== undefined">
      <div class="panel-label">链接至</div>
      <div class="panel-value">
        <input type="text" v-model="activeElement.href" placeholder="绝对路径，以https://开头">
      </div>
    </div>

    <div class="panel-row" flex v-if="activeElement.href !== undefined">
      <div class="panel-label">跳转至</div>
      <div class="panel-value">
        <select>
          <option>无</option>
          <option>TODO: href</option>
        </select>
      </div>
    </div>

    <div class="panel-row" flex v-if="activeElement.hoverPic !== undefined">
      <div class="panel-label">hover 图片</div>
      <div class="panel-value">
        <div class="panel-preview"
          @click="addPic('addHoverPic')"
          :style="{ backgroundImage: 'url(' + activeElement.hoverPic + ')' }">
          <icon name="plus" v-show="!activeElement.hoverPic" />
        </div>
      </div>
    </div>

    <hr>

    <div class="panel-row" flex>
      <icon name="clock" />
      <div class="panel-label">活动结束时</div>
    </div>

    <div class="panel-row" flex v-if="activeElement.expirePic !== undefined">
      <div class="panel-label">结束图片</div>
      <div class="panel-value">
        <div class="panel-preview"
          @click="addPic('addExpirePic')"
          :style="{ backgroundImage: 'url(' + activeElement.expirePic + ')' }">
          <icon name="plus" v-show="!activeElement.expirePic" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["activeElement", "tab"],
  methods: {
    /**
     * 添加/替换图片
     *
     * @param type { String } 添加图片类型
     */
    addPic (type) {
      $communicator.$emit("upload", payload => {
        this.$store.commit(type, payload)
      })
    }
  }
}
</script>
