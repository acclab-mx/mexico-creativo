<template>
  <svg width="100%" viewBox="0 0 1000 500" class="main-menu">
    <!--rect
      id="borde"
      x="0"
      y="0"
      width="1000"
      height="500"
      fill="black"
      stroke="red"
    /-->
    <nuxt-link to="/playground?componente=8">
      <path
        id="ecosistema-cultural"
        :d="ecosistemaCultural"
        fill="rgba(111, 59, 196, 0.7)"
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
    </nuxt-link>
    <nuxt-link to="/playground?componente=9">
      <path
        id="cadena-de-valor"
        :d="cadenaDeValor"
        fill="rgba(236, 172, 7, 1.0)"
      />
      <text
        x="150"
        y="380"
        font-family="Montserrat"
        font-size="24"
        font-weight="600"
        fill="white"
      >
        Cadena de valor
      </text>
    </nuxt-link>
    <nuxt-link to="/playground?estudios">
      <path id="estudios" :d="estudios" fill="rgba(128, 190, 50, 1.0)" />
      <text
        x="320"
        y="220"
        font-family="Montserrat"
        font-size="24"
        font-weight="600"
        fill="white"
      >
        Estudios
      </text>
    </nuxt-link>
    <nuxt-link to="/playground?propuestas">
      <path id="propuestas" :d="propuestas" fill="rgba(27, 20, 100, 1.0)" />
      <text
        x="380"
        y="420"
        font-family="Montserrat"
        font-size="24"
        font-weight="600"
        fill="white"
      >
        Propuestas
      </text>
    </nuxt-link>
    <nuxt-link to="/playground?acciones">
      <path id="acciones" :d="acciones" fill="rgba(240, 108, 33, 1.0)" />
      <text
        x="620"
        y="320"
        font-family="Montserrat"
        font-size="24"
        font-weight="600"
        fill="white"
      >
        Acciones
      </text>
    </nuxt-link>
    <nuxt-link to="/playground?retos">
      <path id="retos" :d="retos" fill="rgba(18, 203, 196, 1.0)" />
      <text
        x="520"
        y="220"
        font-family="Montserrat"
        font-size="24"
        font-weight="600"
        fill="white"
      >
        Retos
      </text>
    </nuxt-link>
  </svg>
</template>

<script>
import ecosistemaCulturalList from '@/assets/animations/custom/ecosistemaCultural.js'
import cadenaDeValor from '@/assets/animations/custom/cadenaDeValor.js'
import estudios from '@/assets/animations/custom/estudios.js'
import propuestas from '@/assets/animations/custom/propuestas.js'
import acciones from '@/assets/animations/custom/acciones.js'
import retos from '@/assets/animations/custom/retos.js'

// console.log('ecosistemaCulturalList: ', ecosistemaCulturalList)

const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms))

export default {
  data() {
    return {
      ecosistemaCultural: ecosistemaCulturalList[0],
      cadenaDeValor: cadenaDeValor[0],
      estudios: estudios[0],
      propuestas: propuestas[0],
      acciones: acciones[0],
      retos: retos[0],
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
