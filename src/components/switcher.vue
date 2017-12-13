<template>
  <div class="switcher-toggle" role="switcher" @keydown="toggle" @click.stop="toggle" tabindex="0" :aria-checked="toggled">
    <div class="switcher-slide" :class="classes">
      <div class="switcher-switch" :class="classes"></div>
    </div>
    <div v-show="showLabels" class="switcher-label" v-html="label"></div>
  </div>
</template>

<script>
export default {
  computed: {
    classes: function() {
      return {
        checked: this.toggled,
        unchecked: !this.toggled,
        disabled: this.disabled
      };
    },

    label: function() {
      return this.toggled && this.showLabels
        ? this.labelChecked
        : this.labelUnchecked;
    }
  },

  data() {
    return {
      toggled: this.value
    };
  },

  methods: {
    toggle: function(e) {
      if (this.disabled || e.keyCode === 9) { // if disabled or tab is pressed
        return false;
      }
      this.toggled = !this.toggled;
      this.$emit("input", this.toggled);
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
    },
  },
}
</script>

<style>
.switcher-toggle {
  /* var */
  --slide-width: 24px;
  --border-radius: 24px;
  --switch-color: var(--main);
  --switch-off-color: var(--main-light);
  --transition-time: 350ms;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  outline: none;
}

.switcher-slide {
  width: calc(var(--slide-width) * 1.5);
  padding: 2px;
  margin: 0;
  border-radius: var(--border-radius);
  border: 1px solid var(--switch-off-color);
  cursor: pointer;
}

.switcher-slide.checked {
  border: 1px solid var(--switch-color);
}

.switcher-switch {
  padding: 0;
  margin: 0;
  width: calc(var(--slide-width) / 2);
  height: calc(var(--slide-width) / 2);
  border-radius: var(--border-radius);
  background: var(--switch-off-color);
  cursor: pointer;
  transition: all var(--transition-time);
}

.switcher-label {
  margin-left: 5px;
}

.switcher-switch.checked {
  transform: translateX(calc(var(--slide-width) * 1.5 / 2));
  background: var(--switch-color);
}

.switcher-switch.disabled {
  cursor: not-allowed;
  opacity: .1;
}

.switcher-slide.disabled {
  cursor: not-allowd;
}
</style>
