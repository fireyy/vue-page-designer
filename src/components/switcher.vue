<template>
  <div class="toggle" role="switcher" @keydown="toggle" @click.stop="toggle" tabindex="0" :aria-checked="toggled">
    <input class="toggle-input" type="checkbox" />
    <button :class="classes">
    </button>
    <div v-show="showLabels" class="toggle-label" v-html="label"></div>
  </div>
</template>

<script>
export default {
  computed: {
    classes: function () {
      return {
        'toggle-btn': true,
        'toggle-btn-on': this.toggled,
        'toggle-btn-off': !this.toggled,
        'toggle-btn-disabled': this.disabled
      }
    },

    label: function () {
      return this.toggled && this.showLabels
        ? this.labelChecked
        : this.labelUnchecked
    }
  },

  data () {
    return {
      toggled: this.value
    }
  },

  methods: {
    toggle: function (e) {
      if (this.disabled || e.keyCode === 9) { // if disabled or tab is pressed
        return false
      }
      this.toggled = !this.toggled
      this.$emit('input', this.toggled)
    }
  },

  props: {
    disabled: {
      type: Boolean,
      default: false
    },

    value: {
      type: Boolean,
      default: false
    },

    showLabels: {
      type: Boolean,
      default: false
    },

    labelChecked: {
      type: String,
      default: ''
    },

    labelUnchecked: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.toggle-btn {
  display: inline-block;
  outline: 0;
  width: 4em;
  height: 2em;
  position: relative;
  cursor: pointer;
  user-select: none;
  background: #fbfbfb;
  border-radius: 2em;
  padding: 2px;
  transition: all 0.4s ease;
  border: 1px solid #e8eae9;
}
.toggle-btn:focus::after,
.toggle-btn:active::after {
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1),
    0 4px 0 rgba(0, 0, 0, 0.08),
    inset 0px 0px 0px 1.5px #9c9c9c;
}
.toggle-btn::after {
  left: 0;
  position: relative;
  display: block;
  content: '';
  width: 50%;
  height: 100%;
  border-radius: 2em;
  background: #fbfbfb;
  transition: all 0.3s
      cubic-bezier(0.175, 0.885, 0.32, 1.275),
    padding 0.3s ease, margin 0.3s ease;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1),
    0 4px 0 rgba(0, 0, 0, 0.08);
}
.toggle-btn.toggle-btn-on::after {
  left: 50%;
}
.toggle-btn.toggle-btn-on {
  background: var(--main);
}
.toggle-btn.toggle-btn-on:active {
  box-shadow: none;
}
.toggle-btn.toggle-btn-on:active::after {
  margin-left: -0.8em;
}
.toggle-btn:active::after {
  padding-right: 0.8em;
}
.toggle-input {
  display: none;
}
</style>
