<template>
  <div class="nav" flex>
    <!-- logo -->
    <div class="logo">
      <icon name="anchor" :options="{ 'stroke-width': 1 }" />
    </div>

    <!-- 菜单栏 -->
    <ul flex class="middle">
      <li @click="preview">
        <icon name="airplay" /> 预览
      </li>
    </ul>

    <!-- 工具栏 -->
    <div class="side">
      <ul v-show="show">
        <li title="复制元件 Ctrl + C" @click="copyWidget">
          <icon name="copy" /> 复制
        </li>
        <li title="删除元件 Delete" @click="dele">
          <icon name="trash-2" /> 删除
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    // Ctrl + C 复制元件
    document.addEventListener(
      "keyup",
      e => {
        e.stopPropagation()
        if (e.ctrlKey && e.keyCode === 67) {
          this.$store.commit("copy")
        }
      },
      true
    )

    // Delete 删除选中元件
    document.addEventListener(
      "keyup",
      e => {
        e.stopPropagation()
        if (e.keyCode === 46) {
          this.$store.commit("delete")
        }
      },
      true
    )
  },

  methods: {
    // TODO: 预览
    preview () {
      //
    },

    // 复制元件
    copyWidget () {
      this.$store.commit("copy")
    },

    // 删除元件
    dele () {
      this.$store.commit("delete")
    }
  },

  computed: {
    show () {
      return this.$store.state.type !== "page"
    }
  }
}
</script>

<style scoped>
.logo {
  width: 50px;
  height: 50px;
  line-height: 50px;
  font-size: 35px;
  color: #fff;
  text-align: center;
}
.nav {
  width: 100%;
  height: 50px;
  flex-shrink: 0;
  background-color: var(--main);
}
.middle {
  flex-grow: 1;
  justify-content: center;
}
.side {
  width: 400px;
  height: 50px;
}
li {
  display: inline-block;
  min-width: 50px;
  height: 50px;
  cursor: pointer;
  line-height: 50px;
  color: var(--light);
  margin-right: 20px;
}
.middle .svg-icon,
.side .svg-icon {
  font-size: 18px;
  margin-right: 5px;
  vertical-align: middle;
}
i {
  color: #eee;
  line-height: inherit;
  vertical-align: middle;
}
.pt12 {
  padding-top: 12px;
}
.pt14 {
  padding-top: 14px;
}
.f16 {
  font-size: 16px;
}
</style>
