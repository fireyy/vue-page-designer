<template>
  <header class="header">
    <div class="navbar container grid-xl">
      <section class="logo navbar-section">
        <icon name="anchor" />
      </section>
      <section class="navbar-section">
        <a
          class="btn btn-link tooltip tooltip-bottom"
          data-tooltip="复制元件 Ctrl + C"
          @click="copyWidget">
          <icon name="copy" /> 复制
        </a>
        <a
          class="btn btn-link tooltip tooltip-bottom"
          data-tooltip="删除元件 Delete"
          @click="dele">
          <icon name="trash-2" /> 删除
        </a>
        <a
          class="btn btn-link tooltip tooltip-bottom"
          data-tooltip="保存 Ctrl + S"
          @click="save"><icon name="save" /> 保存</a>
      </section>
    </div>
  </header>
</template>

<script>
export default {

  computed: {
    show () {
      return this.$store.state.type !== 'page'
    }
  },
  mounted () {
    // Ctrl + C 复制元件
    document.addEventListener(
      'keyup',
      e => {
        e.stopPropagation()
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 67) {
          this.copyWidget()
        }
      },
      true
    )

    // Delete 删除选中元件
    document.addEventListener(
      'keyup',
      e => {
        e.stopPropagation()
        if (e.keyCode === 46) {
          this.dele()
        }
      },
      true
    )

    // Ctrl + S 保存
    document.addEventListener(
      'keyup',
      e => {
        e.stopPropagation()
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 83) {
          this.save()
        }
      },
      true
    )
  },

  methods: {
    // 保存
    save () {
      this.$store.dispatch('save')
    },

    // 复制元件
    copyWidget () {
      this.$store.commit('copy')
    },

    // 删除元件
    dele () {
      this.$store.commit('delete')
    }
  }
}
</script>

<style lang="scss">
@import '../_variables.scss';
.header {
  background-color: #24292e;
  padding: 12px 0;
}
.navbar {
  .svg-icon {
    svg {
      vertical-align: middle;
    }
  }
  .btn.btn-link {
    color: $gray-color;
    margin-right: 15px;
  }
  .btn.btn-link:hover {
    color: $light-color;
  }
  .logo {
    font-size: 20px;
    .svg-icon {
      width: 30px;
      text-align: center;
      background-color: $light-color;
      border-radius: 50%;
    }
  }
}
</style>
