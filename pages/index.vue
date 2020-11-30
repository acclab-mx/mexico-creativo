<template>
  <div class="container">
    <MXNavbar></MXNavbar>
    <div class="container">
      <main class="content">
        <section class="brand-logos">
          <img
            class="logo-pnud"
            src="@/assets/img/logo-pnud.png"
            alt="Logo de la PNUD"
          />
          <img
            class="logo-cultura"
            src="@/assets/img/logo-cultura.png"
            alt="Logo de la secretaría de cultura"
          />
        </section>
        <section id="hero">
          <div class="content">
            <div class="title">
              <h1>México</h1>
              <h1>Creativo</h1>
            </div>
            <div class="subtitle">
              <h2>Desarrollo cultural</h2>
              <h2>sostenible</h2>
            </div>
            <p class="description-desktop">
              México Creativo, es un programa que tiene el propósito de trazar
              líneas estratégicas y generar espacios para la convergencia de
              ideas y saberes relacionados a temas estructurales de las
              economías culturales y creativas.
            </p>
          </div>
          <div class="blob-container">
            <lottie id="shape1" :animation-data="animationData" />
          </div>
        </section>
        <section id="description">
          <p>
            México Creativo, es un programa que tiene el propósito de trazar
            líneas estratégicas y generar espacios para la convergencia de ideas
            y saberes relacionados a temas estructurales de las economías
            culturales y creativas.
          </p>
        </section>
        <section id="details">
          <h2>Explorar información</h2>
          <p>
            Explora la información recopilada por México Creativo.<br />
            Puedes filtrar por cáda una de las 12 temáticas, o por las
            diferentes categorías.
          </p>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import MXNavbar from '@/components/MXNavbar'
import Lottie from '@/components/Lottie.vue'
import animationData from '@/assets/animations/blob.json'

export default {
  components: {
    MXNavbar,
    Lottie,
  },
  async fetch() {
    const { data } = await this.$axios('/api/tematicas')
    console.log('data: ', data)
    const { records } = data
    console.log('records: ', records)
    this.tematicas = records.map((r) => r.fields.TEMA)
  },
  data() {
    return {
      animationData,
      tematicas: [],
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  padding-top: 38px;
  width: 100vw;
  box-sizing: border-box;
  > .content {
    width: 100%;
    max-width: 1440px;
    padding: 24px;
    box-sizing: border-box;
  }
}

.brand-logos {
  display: flex;
  justify-content: start;
  align-items: center;
  column-gap: 16px;
  .logo-pnud {
    height: 100px;
  }
  .logo-cultura {
    max-width: 70%;
    max-height: 70px;
  }
}

#hero {
  display: flex;
  justify-content: space-between;
  .content,
  .blob-container {
    max-width: 100%;
    padding: 0;
  }
  .content {
    min-width: 60%;
    max-width: 60%;
  }
  .blob-container {
    z-index: -20;
    margin: -24px;
  }
  .title {
    margin-top: 24px;
  }
  .subtitle {
    margin-top: 0;
  }
  #shape1 {
    display: block;
    height: 100%;
  }
}

.description-desktop {
  display: none;
  margin-top: 24px;
  max-width: 32rem;
  font-size: 24px;
}

#description {
  margin-top: 24px;
  max-width: 32rem;
  p {
    font-size: 24px;
  }
}

#details {
  h2 {
    margin-top: 24px;
  }
  p {
    margin-top: 16px;
  }
}

@media (min-width: 760px) {
  .container {
    padding-top: 48px;
  }

  .brand-logos {
    column-gap: 32px;
    .logo-pnud {
      height: 120px;
    }
    .logo-cultura {
      height: 80px;
    }
  }

  #hero {
    padding: 0;

    .subtitle {
      margin-top: 8px;
    }
  }

  .description-desktop {
    display: inherit;
  }

  #description {
    display: none;
  }
}
</style>
