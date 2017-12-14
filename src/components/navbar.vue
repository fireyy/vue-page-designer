<template>
  <header class="navbar">
    <section class="navbar-section"></section>
    <section class="logo navbar-center">
      <icon name="anchor" :options="{ 'stroke-width': 1 }" />
    </section>
    <section class="navbar-section">
      <a class="btn btn-link tooltip tooltip-bottom" data-tooltip="复制元件 Ctrl + C" @click="copyWidget">
        <icon name="copy" /> 复制
      </a>
      <a class="btn btn-link tooltip tooltip-bottom" data-tooltip="删除元件 Ctrl + D" @click="dele">
        <icon name="trash-2" /> 删除
      </a>
      <a href="#" @click="preview" class="btn btn-link tooltip tooltip-bottom" data-tooltip="预览 Ctrl + P"><icon name="airplay" /> 预览</a>
      <a href="#" @click="save" class="btn btn-link tooltip tooltip-bottom" data-tooltip="预览 Ctrl + S"><icon name="save" /> 保存</a>
    </section>
  </header>
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

    // TODO: 保存
    save () {
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

<style lang="scss">
.navbar {
  background: $primary-color;
  .svg-icon {
    svg {
      vertical-align: middle;
    }
  }
  .btn.btn-link {
    color: $light-color;
    margin-right: 15px;
  }
  .logo {
    padding: 10px 0;
    font-size: 20px;
    width: 100px;
    justify-content: center;
    .svg-icon {
      width: 30px;
      text-align: center;
      background-color: $light-color;
      border-radius: 50%;
    }
  }
}
</style>
