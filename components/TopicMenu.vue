<template>
  <svg width="100%" viewBox="0 0 1000 500" class="main-menu">
    <rect
      id="borde"
      x="0"
      y="0"
      width="1000"
      height="500"
      fill="transparent"
      stroke="red"
    />
    <path
      id="ecosistema-cultural"
      :d="ecosistemaCultural"
      fill="rgba(111, 59, 196, 0.7)"
      @click="$router.push('/playground')"
    />
    <text
      x="420"
      y="120"
      font-family="Montserrat"
      font-size="24"
      font-weight="600"
      fill="white"
    >
      Ecosistema cultural
    </text>
  </svg>
</template>

<script>
import ecosistemaCulturalList from '@/assets/animations/custom/ecosistemaCultural.js'

console.log('ecosistemaCulturalList: ', ecosistemaCulturalList)

const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms))

export default {
  data() {
    return {
      ecosistemaCultural: ecosistemaCulturalList[0],
    }
  },
  async mounted() {
    while (true) {
      for (let i = 0; i < ecosistemaCulturalList.length; i++) {
        this.ecosistemaCultural = ecosistemaCulturalList[i]
        await delay(100)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.main-menu {
  display: block;
}
</style>
