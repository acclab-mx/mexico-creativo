<template>
  <div id="layout-membrete">
    <header>
      <MXNavbar />
    </header>
    <div class="container">
      <Nuxt />
    </div>
    <footer>
      <MXFooter />
    </footer>
  </div>
</template>

<script>
import MXNavbar from '@/components/MXNavbar'
import MXFooter from '@/components/MXFooter'

export default {
  components: {
    MXNavbar,
    MXFooter,
  },
}
</script>

<style lang="scss" scoped>
#layout-membrete {
  min-height: 100vh;
  .container {
    width: 100%;

    /* min-height: 100vh; */
  }
}
</style>
