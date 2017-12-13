<template>
	<div v-if="activeElement.type === 'braid-txt'">
    <hr>

    <div class="panel-row" flex>
      <icon name="sliders" />
      <div class="panel-label">行高</div>
      <div class="panel-value">{{ activeElement.lineHeight }}</div>
      <div class="panel-slider-wrap">
        <slider :max="5" :min="1" v-model="activeElement.lineHeight" />
      </div>
    </div>

    <div class="panel-row" flex>
      <icon name="type" />
      <div class="panel-label">字号</div>
      <div class="panel-value">{{ activeElement.fontSize }}rem</div>
      <div class="panel-slider-wrap">
        <slider :step="0.01" :max="2" :min=".85" v-model="activeElement.fontSize" />
      </div>
    </div>

    <div class="panel-row" flex>
      <icon name="edit-3" />
      <div class="panel-label">颜色</div>
      <div class="panel-value">{{ activeElement.color }}</div>
      <div>
        <input type="color" v-model="activeElement.color">
      </div>
    </div>

    <div class="panel-row" flex>
      <icon name="bold" />
      <div class="panel-label">加粗</div>
      <div flex>
        <switcher v-model="activeElement.fontWeight"></switcher>
      </div>
    </div>

    <div class="panel-row" flex>
      <icon name="align-justify" />
      <div class="panel-label">对齐</div>
      <div>
        <input type="radio" name="align" value="left" id="txleft"
          v-model="activeElement.textAlign">
        <label for="txleft" title="左对齐"
          @mousedown="activeElement.textAlign = 'left'">
          <icon name="align-left" />
        </label>

        <input type="radio" name="align" value="center" id="txcenter"
          v-model="activeElement.textAlign">
        <label for="txcenter" title="居中"
          @mousedown="activeElement.textAlign = 'center'">
          <icon name="align-center" />
        </label>

        <input type="radio" name="align" value="right" id="txright"
          v-model="activeElement.textAlign">
        <label for="txright" title="右对齐"
          @mousedown="activeElement.textAlign = 'right'">
          <icon name="align-right" />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
    name: 'braid-txt-style',
		props: ['activeElement'],

    mounted () {
    },

    methods: {
    },

    data () {
      return {
      }
    }
	}
</script>
