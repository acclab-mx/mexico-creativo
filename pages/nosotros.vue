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
          <h2>Conoce más</h2>
          <p>
            Queremos a través de esta herramienta, que nos sirve para hacer un
            ejercicio de resonancia colectiva, reunir información relevante para
            construir política cultura, ya sea pública, privada o emanada del
            sector de la sociedad civil organizada y que apunte a fortalecer el
            ecosistema cultural y a su economía cultural y creativa.
          </p>
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
            Aquí se hacen eco distintas reflexiones surgidas de diálogos entre
            personas involucradas activamente en el sector cultural y artístico.
            Y como buena caja de reverberación, siempre está dispuesta a sumar
            nuevas voces. Para alimentar el sitio, hemos abierto una serie de
            campos: estudios, propuestas, retos y acciones, para guiar sus
            aportes.
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
        padding-top: 40px;
        padding-bottom: 40px;
        h2 {
          margin-top: 60px;
          margin-bottom: 30px;
        }
        p {
          max-width: 40em;
        }
        .text-container {
          width: 100%;
        }
        .blob-container {
          height: 80px;
        }
      }
    }
  }
}
</style>
