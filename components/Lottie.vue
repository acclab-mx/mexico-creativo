<template>
  <div ref="animationContainer"></div>
</template>

<script>
import lottie from 'lottie-web'
export default {
  props: {
    animationData: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.anim = lottie.loadAnimation({
      container: this.$refs.animationContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: this.animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMinYMin slice',
      },
    })
  },
}
</script>
