<template>
  <nuxt-link :to="path">
    <div class="campo-card" :class="[color]">
      <div class="counter-container">
        <h3>{{ counter }}</h3>
      </div>
      <div class="card-content">
        <h3>{{ title }}</h3>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'card-default-bg',
    },
    counter: {
      type: Number,
      default: 0,
      required: true,
    },
    title: {
      type: String,
      default: 'Campo title',
      required: true,
    },
    path: {
      type: String,
      default: '#',
    },
  },
}
</script>

<style lang="scss" scoped>
.campo-card {
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 380px;
  border-radius: 16px;
  padding: 24px;
  color: var(--color-light);
  .counter-container {
    text-align: right;
    padding: 0;
  }
  .card-content {
    display: inline;
    margin-top: 8px;
  }
}
</style>
