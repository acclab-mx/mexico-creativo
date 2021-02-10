<template>
  <svg width="100%" viewBox="0 0 1000 500" class="main-menu">
    <!--rect
      id="borde"
      x="0"
      y="0"
      width="1000"
      height="500"
      stroke="red"
      fill="none"
    /-->
    <!--rect x="0" y="0" width="1000" height="500" fill="black" /-->
    <nuxt-link to="/playground?componente=8">
      <path
        ref="pathEcosistemaCultural"
        d="M 440, 100 C 560, 10 760, 10 860, 100 960, 200 960, 300 860, 400 810, 450 760, 500 660, 400 510, 250 290, 250 440, 100"
        fill="rgba(111, 59, 196, 0.7)"
      />
      <text
        x="520"
        y="100"
        font-family="Montserrat"
        font-size="18"
        font-weight="700"
        fill="white"
      >
        Ecosistema Cultural
      </text>
    </nuxt-link>
    <nuxt-link to="/playground?componente=9">
      <path
        ref="pathCadenaDeValor"
        d="M 120, 400 C 160, 300 260, 300 320, 350 380, 420 350, 460 300, 480 240, 490 260, 460 160, 480 140, 480 100, 450 120, 400"
        fill="rgba(236, 172, 7, 0.7)"
      />
      <text
        x="160"
        y="420"
        font-family="Montserrat"
        font-size="18"
        font-weight="700"
        fill="white"
      >
        Cadena de valor
      </text>
    </nuxt-link>
    <nuxt-link to="/playground?estudios">
      <path
        ref="pathEstudios"
        d="M 165, 190 C 170, 200 200, 230 290, 200 310, 190 310, 180 290, 150 270, 120 260, 150 230, 130 190, 100 150, 150 165, 190"
        fill="rgba(128, 190, 50, 1)"
      />
      <text
        ref="textEstudios"
        x="190"
        y="180"
        font-family="Montserrat"
        font-size="18"
        font-weight="700"
        fill="white"
      >
        Estudios
      </text>
    </nuxt-link>
    <nuxt-link to="/playground?propuestas">
      <path
        ref="pathPropuestas"
        d="M 310, 340 C 350, 320 400, 280 420, 350 430, 365 470, 380 430, 410 390, 440 340, 460 320, 400 300, 380 280, 380 310, 340"
        fill="rgba(27, 20, 100, 1)"
      />
      <text
        ref="textPropuestas"
        x="325"
        y="380"
        font-family="Montserrat"
        font-size="18"
        font-weight="700"
        fill="white"
      >
        Propuestas
      </text>
    </nuxt-link>
    <nuxt-link to="/playground?acciones">
      <path
        ref="pathAcciones"
        d="M 480, 400 C 480, 330 580, 350 600, 370 740, 420 600, 500 580, 480 550, 460 520, 500 500, 460 474, 430 480, 380 480, 400"
        fill="rgba(240, 108, 33, 1)"
      />
      <text
        ref="textAcciones"
        x="520"
        y="430"
        font-family="Montserrat"
        font-size="18"
        font-weight="700"
        fill="white"
      >
        Acciones
      </text>
    </nuxt-link>
    <nuxt-link to="/playground?retos">
      <path
        ref="pathRetos"
        d="M 620, 160 C 640, 120 640, 160 660, 140 700, 100 720, 170 724, 160 720, 160 740, 190 680, 210 620, 220 600, 200 620, 160"
        fill="rgba(18, 203, 196, 1)"
      />
      <text
        ref="textRetos"
        x="640"
        y="180"
        font-family="Montserrat"
        font-size="18"
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
import animationEstudiosText from '@/plugins/animationEstudiosText.js'
import animationPropuestas from '@/plugins/animationPropuestas.js'
import animationPropuestasText from '@/plugins/animationPropuestasText.js'
import animationAcciones from '@/plugins/animationAcciones.js'
import animationAccionesText from '@/plugins/animationAccionesText.js'
import animationRetos from '@/plugins/animationRetos.js'
import animationRetosText from '@/plugins/animationRetosText.js'

export default {
  mounted() {
    animationEcosistemaCultural(this.$refs.pathEcosistemaCultural)
    animationCadenaDeValor(this.$refs.pathCadenaDeValor)
    animationEstudios(this.$refs.pathEstudios)
    animationEstudiosText(this.$refs.textEstudios)
    animationPropuestas(this.$refs.pathPropuestas)
    animationPropuestasText(this.$refs.textPropuestas)
    animationAcciones(this.$refs.pathAcciones)
    animationAccionesText(this.$refs.textAcciones)
    animationRetos(this.$refs.pathRetos)
    animationRetosText(this.$refs.textRetos)
  },
}
</script>

<style lang="scss" scoped>
.main-menu {
  display: block;
}
</style>
