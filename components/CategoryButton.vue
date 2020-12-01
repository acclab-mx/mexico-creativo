<template>
  <button class="category-button" :class="[activeState]" @click="onClick">
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
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
.category-button {
  display: inline-block;
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
