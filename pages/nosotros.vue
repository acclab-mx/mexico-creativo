<template>
  <div class="nosotros">
    <div class="contenedor">
      <div class="logo-cultura">
        <img
          src="@/assets/img/logo-cultura.png"
          alt="logo de la secretaría de cultura"
        />
      </div>
      <div class="contenido">
        <div class="text-container">
          <nuxt-link class="back" to="/">Volver al inicio</nuxt-link>
          <h2>Conoce más</h2>
          <p>
            Resonar es dejar que las frecuencias de otros cuerpos alcancen el
            nuestro, vibrar en nuestra condición compartida de seres vivientes.
            Es permitirnos entrar en frecuencia en conjunto, amplificar la
            fuerza en un espacio-tiempo en el cual actuamos para crear,
            experimentar y habitar lo común. Queremos activar una herramienta
            que nos permita generar múltiples redes entre cuerpos y sus saberes,
            con experiencias y lenguajes singulares, pero que responden a la
            urgencia de materializar otras formas de hacer frente a la realidad
            del sector cultural y artístico.
          </p>
          <p>
            Esta herramienta no propone un camino único de exploración, está
            pensada para que las ideas se propaguen y nos lleven a vínculos
            nuevos para la construcción de política cultural.
          </p>
        </div>
        <div class="blob-container">
          <lottie id="shape1" :animation-data="animationData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lottie from '@/components/Lottie.vue'
import animationData from '@/assets/animations/blob.json'

export default {
  name: 'Nosotros',
  components: {
    Lottie,
  },
  data() {
    return {
      animationData,
    }
  },
}
</script>

<style lang="scss" scoped>
.nosotros {
  .contenedor {
    margin: 0;
    .logo-cultura {
      img {
        height: 40px;
      }
    }
    .contenido {
      display: flex;
      justify-content: space-between;
      flex-direction: column-reverse;
      padding: 24px;
    }
  }
}

@media screen and (min-width: 740px) {
  .nosotros {
    .contenedor {
      margin: 0 auto;
      max-width: 1220px;
      .contenido {
        flex-direction: row;
        width: 100%;
        padding-top: 80px;
        padding-bottom: 40px;
        h2 {
          margin-bottom: 30px;
        }
        p {
          max-width: 40em;
        }
        .text-container {
          width: 100%;
          .back {
            display: inline-block;
            padding-bottom: 24px;
          }
        }
        .blob-container {
          height: 80px;
        }
      }
    }
  }
}
</style>
