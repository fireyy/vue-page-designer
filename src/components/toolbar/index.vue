<template>
	<ul class="menu-bar" @mousedown="updateSrollTop">
    <li class="menu-item" @click="(e) => {addWidget(e, item)}" v-for="item in widgets" :key="item.name">
      <icon :name="item.icon" :title="item.title" />
      <p class="menu-caption">{{item.title}}</p>
    </li>
  </ul>
</template>

<script>
  import widget from '@/plugins/widget'
	export default {
    props: ['zoom'],
    data () {
      return {
      }
    },
    computed: {
      widgets () {
        return widget.getWidgets()
      }
    },
		methods: {
      // 添加组件
      addWidget (e, item) {
        this.$store.dispatch('addWidget', item);
      },

      // 为确保添加的元件出现在可视区内，用画布向上滚动距离作为元件初始 top 值
      updateSrollTop () {
        var top = document.getElementById('viewport').scrollTop / this.zoom * 100;
        this.$store.commit('updateSrollTop', top)
      }
		}
	}
</script>

<style scoped>
	.menu-bar {
    width: 50px;
    height: 100%;
    border-right: 1px solid #eee;
    color: var(--main);
    padding-top: 10px;
    user-select: none;
  }
  .menu-item {
    display: inline-block;
    text-align: center;
    width: 50px;
    height: 50px;
    cursor: pointer;
    padding-top: 13px;
    transition: all .2s;
    position: relative;
  }
  .menu-item .svg-icon {
    font-size: 24px;
  }
  .menu-caption {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    width: 100%;
    opacity: 0;
    transition: all .2s;
  }
  .menu-item:hover {
    padding-top: 5px;
  }
  .menu-item:hover .svg-icon {
    font-size: 20px;
  }
  .menu-item:hover p {
    opacity: 1;
  }
</style>
