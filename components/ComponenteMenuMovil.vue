<template>
  <svg width="100%" viewBox="0 0 500 2000" class="main-menu">
    <!--rect
      id="borde"
      x="0"
      y="0"
      width="500"
      height="2000"
      stroke="red"
      fill="none"
    /-->
    <!--rect x="0" y="0" width="1000" height="500" fill="black" /-->
    <nuxt-link to="/playground?componente=1">
      <path
        ref="pathEcosistemaCultural"
        style="transform: translate(50px, 40px)"
        d="M 25.5629 75.8108 C 167.563 -58.1889 334.563 5.81077 386.563 110.811 421.133 180.616 408.605 239.079 365.563 284.811 301.563 352.81 254.907 350.81 189.907 284.811 114.907 199 -65.4372 188.811 25.5629 75.8108"
        fill="rgba(111, 59, 196, 0.7)"
      />
      <text
        x="100"
        y="180"
        font-family="Montserrat"
        font-size="32"
        font-weight="700"
        fill="white"
      >
        Ecosistema Cultural
      </text>
    </nuxt-link>
    <nuxt-link to="/playground?componente=2">
      <path
        ref="pathCadenaDeValor"
        style="transform: translate(60px, 390px) scale(1.25)"
        d="M 282.666 104.262 C 224.666 7.26238 123.666 -41.7376 21.6663 48.2624 -25.3337 89.733 9.66634 190.262 73.6663 182.262 153.666 172.262 176.666 199.262 208.666 208.262 240.666 217.262 340.666 201.262 282.666 104.262"
        fill="rgba(236, 172, 7, 0.7)"
      />
      <text
        x="130"
        y="540"
        font-family="Montserrat"
        font-size="32"
        font-weight="700"
        fill="white"
      >
        Cadena de valor
      </text>
    </nuxt-link>
    <nuxt-link to="/playground?estudios">
      <path
        ref="pathEstudios"
        style="transform: translate(100px, 660px) scale(2)"
        d="M 2.875 31.2336 C -0.124998 9.23362 27.875 -16.7664 67.875 17.2336 96.875 48.2336 143.875 31.2336 161.875 60.2336 179.875 89.2336 165.875 134.234 122.875 149.234 79.875 164.234 28.875 136.234 16.875 125.234 4.875 114.234 -5.125 101.234 2.875 78.2336 10.875 55.2336 5.875 53.2336 2.875 31.2336"
        fill="rgba(128, 190, 50, 1)"
      />
      <text
        ref="textEstudios"
        x="200"
        y="840"
        font-family="Montserrat"
        font-size="32"
        font-weight="700"
        fill="white"
      >
        Estudios
      </text>
    </nuxt-link>
    <nuxt-link to="/playground?propuestas">
      <path
        ref="pathPropuestas"
        style="transform: translate(100px, 990px) scale(2)"
        d="M 1.21541 42.2662 C -3.78459 29.2662 5.21541 -6.73376 55.2154 2.26624 96.5487 6.26624 176.615 28.6662 166.215 86.2662 153.215 158.266 99.2154 156.266 86.2154 158.266 73.2154 160.266 30.2154 143.266 23.2154 101.266 16.2154 59.2662 6.21541 55.2662 1.21541 42.2662"
        fill="rgba(27, 20, 100, 1)"
      />
      <text
        ref="textPropuestas"
        x="180"
        y="1150"
        font-family="Montserrat"
        font-size="32"
        font-weight="700"
        fill="white"
      >
        Propuestas
      </text>
    </nuxt-link>
    <nuxt-link to="/playground?acciones">
      <path
        ref="pathAcciones"
        style="transform: translate(80px, 1340px) scale(2)"
        d="M 0.113525 47.7883 C 0.113534 6.17799 10.7692 -7.822 58.7692 6.178 144.769 19.178 204 47.7883 151.769 96.178 137.851 109.073 135.5 115 75.1135 129.788 16.9896 144.022 0.113518 84.2849 0.113525 47.7883"
        fill="rgba(240, 108, 33, 1)"
      />
      <text
        ref="textAcciones"
        x="160"
        y="1480"
        font-family="Montserrat"
        font-size="32"
        font-weight="700"
        fill="white"
      >
        Acciones
      </text>
    </nuxt-link>
    <nuxt-link to="/playground?retos">
      <path
        ref="pathRetos"
        style="transform: translate(70px, 1640px) scale(2)"
        d="M 82.687 11.9253 C 59.8108 -8.04819 6 -3.42069 0 45.5793C0 92.5793 10.8126 122.073 34.5265 132.765 94 159.579 142.888 142.752 171.784 116.786 200.68 90.8207 160.948 46.879 142.888 31.8988 124.827 16.9187 105.563 31.8988 82.687 11.9253"
        fill="rgba(18, 203, 196, 1)"
      />
      <text
        ref="textRetos"
        x="200"
        y="1800"
        font-family="Montserrat"
        font-size="32"
        font-weight="700"
        fill="white"
      >
        Retos
      </text>
    </nuxt-link>
  </svg>
</template>

<script>
import animationEcosistemaCultural from '@/plugins/animationEcosistemaCultural.js'
import animationCadenaDeValor from '@/plugins/animationCadenaDeValor.js'
import animationEstudios from '@/plugins/animationEstudios.js'
import animationPropuestas from '@/plugins/animationPropuestas.js'
import animationAcciones from '@/plugins/animationAcciones.js'
import animationRetos from '@/plugins/animationRetos.js'

export default {
  mounted() {
    animationEcosistemaCultural(this.$refs.pathEcosistemaCultural)
    animationCadenaDeValor(this.$refs.pathCadenaDeValor)
    animationEstudios(this.$refs.pathEstudios)
    animationPropuestas(this.$refs.pathPropuestas)
    animationAcciones(this.$refs.pathAcciones)
    animationRetos(this.$refs.pathRetos)
  },
}
</script>

<style lang="scss" scoped>
.main-menu {
  display: block;
}
</style>
