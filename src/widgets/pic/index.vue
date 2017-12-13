<template>
  <div class="lz-image"
    :class="[{'g-active': 'braid-pic' + i === id}, playState ? 'anm-' + val.animationName : '']"
    :style="{
      position: val.belong === 'page' ? 'absolute' : 'relative',
      width: val.width / w * 100 + '%',
      height: val.height / h * 100 + '%',
      left: val.belong === 'page' ? val.left / w * 100 + '%' : '0',
      top: val.belong === 'page' ? val.top / h * 100 + '%' : '0',
      zIndex: val.z
    }">
    <!-- hover 图 -->
    <img v-if="val.hoverPic" :src="val.hoverPic">
    <img data-type="braid-pic"
      :data-index="i"
      :data-hover="!!val.hoverPic"
      :src="val.url">
  </div>
</template>

<script>
	export default {
    name: 'braid-pic',
    icon: 'image',
    title: '图片',
    isUpload: true,
    setting: {
      type: 'braid-pic',
      hasGuide: true,
      isChild: true,
      left: 0,
      z: 0,
      href: '',                         // 超链接
      hoverPic: '',                     // hover 图片预览的 url（base64 或 线上路径）
      hoverSrc: '',                     // hover 图片实际的 url
      expirePic: '',                    // 结束状态 图片预览的 url（base64 或 线上路径）
      expireSrc: '',                    // 结束状态 图片实际的 url
      belong: 'page',                   // 属于哪个容器
      animationName: ''
    },
		props: [
			'val', 				// 图片对象
			'w', 			    // 包含块的宽
			'h',  	     	// 包含块的高
      'id',         // 选中项 id
      'i',          // 选中项 index
      'playState'   // 动画播放状态
		]
	}
</script>

<style scoped>
  .lz-image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
</style>
