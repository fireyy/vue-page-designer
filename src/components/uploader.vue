<template>
  <input type="file" accept="image/png, image/jpeg, image/gif"
    :multiple="multiple ? 'multiple' : false"
    id="uploader"
    style="display: none"
    @change="handleUpload">
</template>

<script>
export default {
  props: {
    upload: Function,
    uploadOption: Object
  },
  data () {
    return {
      multiple: false, // 是否允许上传多张
      uploader: null, // input file
      cb: null // 回调函数
    }
  },

  computed: {
    // 图片初始位置纵坐标
    top () {
      return this.$store.state.top
    }
  },

  mounted () {
    this.uploader = document.getElementById('uploader')

    /**
     * 在全局通信中介上注册上传图片自定义事件
     * 所有需要上传图片的地方均可调用
     *
     * 调用方法：
     * $communicator.$emit('upload', function (payload) {/.../})
     * @param payload { Array } 图片上传、下载完成后的一个包含所有图片对象的数组
     * @param multiple { Boolean } 是否上传多张，默认为 false
     */
    window.$communicator.$on('upload', (cb, multiple) => {
      this.multiple = !!multiple
      this.cb = cb
      setTimeout(() => {
        this.uploader.click()
      }, 0)
    })
  },

  methods: {
    // 处理添加图片操作，触发事件：change
    handleUpload () {
      var files = this.uploader.files

      if (!files || files.length === 0) return

      files = Array.prototype.slice.call(this.uploader.files)

      let uploadFn = this.upload || this.defaultUpload

      uploadFn(files).then(res => {
        console.log('status: ', res.status)
        // 图片下载队列完成后执行回调
        new Promise(resolve => {
          this.handleLoadQueue(resolve, res.files)()
        }).then(payload => {
          this.cb(payload)
        })
      })
    },

    defaultUpload (files) {
      if (this.uploadOption.url) {
        var data = new FormData()
        files.forEach(file => data.append('file[]', file))

        return fetch(this.uploadOption.url, {
          method: 'POST',
          body: data
        })
      } else {
        alert('请配置图片上传api地址')
      }
    },

    /**
     * 处理下载队列
     * 图片按顺序下载完一张再下载下一张，以确保图片数组按上传的顺序排列
     */
    handleLoadQueue (resolve, files) {
      var i = 0
      var len = files.length
      var payload = []

      var download = () => {
        // 接入后端后，files 应改为回调参数
        // url = files[i]
        var url = window.URL.createObjectURL(files[i])

        new Promise(resolve => {
          this.getImageWidth(url, resolve)
        }).then(size => {
          payload.push({
            width: size.w,
            height: size.h,
            top: this.top,
            url: url, // 图片预览地址
            src: 'images/' + files[i].name // 图片实际地址
          })

          // 所有图片下载完毕，跳到下一步，否则继续下载
          if (++i === len) {
            resolve(payload)
          } else {
            download()
          }
        })
      }

      return download
    },

    /**
     * 使用 new Image 预加载的方式获取图片宽高
     * 这是一个异步操作，须采用 promise
     *
     * @param url { URL | base64 } 图片 url
     * @param res { Promise resolve }
     *
     * @return { Object } 包含图片宽高的对象
     */
    getImageWidth (url, res) {
      var img = new Image()
      img.src = url
      img.onload = function () {
        res({
          w: Math.round(img.width),
          h: Math.round(img.height)
        })
      }
    }
  }
}
</script>
