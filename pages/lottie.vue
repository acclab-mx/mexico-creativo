<template>
  <div id="app">
    <lottie id="shape1" :animation-data="animationData" />
  </div>
</template>

<script>
import Lottie from '@/components/Lottie.vue'
import animationData from '@/assets/animations/blob-blue.json'

export default {
  name: 'App',
  components: {
    lottie: Lottie,
  },
  data() {
    return {
      animationData,
    }
  },
}
</script>

<style lang="scss" scoped>
#shape1 {
  display: block;
  width: 100%;
}
</style>
