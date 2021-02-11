<template>
  <button
    class="campo-button"
    :style="activeColorStyle"
    :class="[activeState]"
    @click="onClick"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    activeColor: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    activeState() {
      return this.value ? 'enabled' : 'disabled'
    },
    activeColorStyle() {
      return this.activeState === 'enabled'
        ? `background-color: var(${this.activeColor})`
        : ''
    },
  },
  methods: {
    onClick(e) {
      console.log('toggle button: ', this.label)
      this.$emit('click', e)
    },
  },
}
</script>

<style lang="scss" scoped>
.campo-button {
  display: inline-block;
  margin-top: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  color: var(--color-light);
  font-size: 18px;
  &.enabled {
    background-color: var(--color-dark);
  }
  &.disabled {
    background-color: gray;
  }
}
</style>
