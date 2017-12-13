<template>
  <img
    width="100%"
    data-type="braid-bg"
    :data-index="i"
    :src="val.url">
</template>

<script>
  export default {
    name: 'braid-bg',
    icon: 'file-text',
    title: '背景图',
    isUpload: true,
    setting: {
      type: 'braid-bg',
      href: '',
      belong: 'page'
    },
    props: [
      'i',
      'val'       // 图片对象
    ]
  }
</script>
