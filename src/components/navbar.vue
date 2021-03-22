<template>
  <header class="header">
    <div class="navbar container grid-xl">
      <section class="logo navbar-section">
        <vpd-icon name="anchor" />
      </section>
      <section class="navbar-section">
        <a
          class="btn btn-link tooltip tooltip-bottom"
          data-tooltip="复制元件 Ctrl + C"
          @click="copyWidget">
          <vpd-icon name="copy" /> {{ $t('data.actions.copy') }}
        </a>
        <a
          class="btn btn-link tooltip tooltip-bottom"
          data-tooltip="删除元件 Delete"
          @click="dele">
          <vpd-icon name="trash-2" /> {{ $t('data.actions.delete') }}
        </a>
        <a
          class="btn btn-link tooltip tooltip-bottom"
          data-tooltip="保存 Ctrl + S"
          @click="save"><vpd-icon name="save" /> {{ $t('data.actions.save') }}</a>
        <select
          class="lang-change"
          @change="changeLang">
          <option
            v-for="(lang, i) in langs"
            :selected="lang === $inter.currentLocale ? 'selected' : ''"
            :key="`Lang${i}`"
            :value="lang">{{ lang }}</option>
        </select>
      </section>
    </div>
  </header>
</template>

<script>
import vpd from '../mixins/vpd'
export default {
  mixins: [vpd],
  data () {
    return {
      langs: this.$inter.availableLocales
    }
  },
  computed: {
    show () {
      return this.$vpd.state.type !== 'page'
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
      this.$vpd.dispatch('save')
    },

    // 复制元件
    copyWidget () {
      this.$vpd.commit('copy')
    },

    // 删除元件
    dele () {
      this.$vpd.commit('delete')
    },

    // 切换语言
    changeLang (e) {
      this.$inter.setCurrentLocale(e.target.value)
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
  .lang-change {
    width: 80px;
  }
}
</style>
