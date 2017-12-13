<template>
  <div class="mask" v-if="show">
    <div class="box">
      <div class="top">
        <span>{{ title }}</span>
        <icon class="close" name="x" @click="close" />
      </div>
      <div class="body">
        <slot>{{ content }}</slot>
      </div>
      <div class='footer'>
        <button class="btn" @click="confirm">确定</button>
        <button class="btn" @click="close">取消</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['title', 'id', 'content'],
  data () {
    return {
      show: false
    }
  },
  methods: {
    close () {
      this.show = false
    },
    confirm () {
      this.$emit('confirm', this.id)
    }
  }
}
</script>
<style scoped>
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .box {
    width: 520px;
    background-color: #fff;
    border-radius: 4px;
  }
  .top {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #f2f2f2;
    padding: 0 20px;
  }
  .body {
    padding: 20px;
    font-size: 14px;
    color: #999;
  }
  .footer {
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #f2f2f2;
    padding-top: 9px;
    padding-right: 20px;
  }
  i.close {
    color: #ccc;
    cursor: pointer;
    transition: all .3s;
    float: right;
    font-size: 24px;
  }
  i.close:hover {
    color: #a5a5a5;
  }
  .btn {
    display: inline-block;
    border: none;
    outline: none;
    text-align: center;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
    border-radius: 3px;
    font-size: 14px;
    transition: all .2s;
    padding: 0 20px;
    background-color: #fff;
    color: #666;
    font-size: 12px;
    float: right;
  }
  .btn:hover {
    background-color: #f2f2f2;
  }
</style>
