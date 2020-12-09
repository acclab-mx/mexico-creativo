<template>
  <div class="container">
    <MXNavbar></MXNavbar>
    <main class="content">
      <section class="brand-logos">
        <img
          class="logo-cultura"
          src="@/assets/img/logo-cultura.png"
          alt="Logo de la Secretaría de Cultura"
        />
      </section>
      <section id="hero">
        <div class="content">
          <div class="title">
            <h1>Almacén de ideas</h1>
          </div>
          <div class="subtitle"></div>
          <p class="description-desktop">
            Repositorio vivo dónde confluyen, visualizan, articulan y
            distribuyen ideas y propuestas sobre las economías culturales y
            creativas.<br /><br />
            Los primeros diez temas de este Almacén, junto con sus propuestas,
            conceptos y estudios, surgen de diez encuentros, en tiempos de
            pandemia, entre profesionales de la cultura que forman parte de
            instituciones públicas, organismos internacionales y el sector
            independiente.
          </p>
        </div>
        <div class="blob-container">
          <lottie id="shape1" :animation-data="animationData" />
        </div>
      </section>
      <section id="description">
        <p>
          Repositorio vivo dónde confluyen, visualizan, articulan y distribuyen
          ideas y propuestas sobre las economías culturales y creativas.<br /><br />
          Los primeros diez temas de este Almacén, junto con sus propuestas,
          conceptos y estudios, surgen de diez encuentros, en tiempos de
          pandemia, entre profesionales de la cultura que forman parte de
          instituciones públicas, organismos internacionales y el sector
          independiente.
        </p>
      </section>
      <section id="details">
        <h2>Guía para usar el Almacén</h2>
        <p>
          Este <b><i>Almacén</i></b> está conformado por muchas tarjetas que
          reúnen distintos saberes surgidos de los Diálogos Públicos, y como
          todo buen Almacén siempre está dispuesto a recibir nuevas
          propuestas.<br /><br />
          Puedes explorar las ideas a partir de temas centrales y por medio de
          las distintas categorías. Encontrarás textos, pero también
          infografías, gráficas, imágenes, audios y videos.<br /><br />
          Cada tarjeta guarda relación con otras tarjetas porque comparten el
          mismo tema, la misma categoría o una serie de conceptos
          relacionados.<br /><br />
          Al ser un repositorio vivo, nos interesa que crezca y enriquezca de
          enfoques diversos, así que siempre estará abierta la posibilidad de
          que nos propongas una
          <b
            ><i><a href="#" target="_blank">nueva tarjeta</a></i></b
          >.<br /><br />
        </p>
      </section>
      <section id="topics">
        <h3>Por temática</h3>
        <div class="topic-list">
          <CategoryCard
            v-for="card in $store.state.topics"
            :key="card.id"
            :color="card.class"
            :counter="card.orden"
            :title="card.tema"
            :path="card.path"
          />
          <div class="end-space"></div>
        </div>
      </section>
      <section id="categories">
        <h3>Por categoría</h3>
        <div class="category-list">
          <nuxt-link class="category-btn" to="/playground?propuestas"
            >Propuestas</nuxt-link
          >
          <nuxt-link class="category-btn" to="/playground?citas"
            >Citas</nuxt-link
          >
          <nuxt-link class="category-btn" to="/playground?conceptos"
            >Conceptos</nuxt-link
          >
          <nuxt-link class="category-btn" to="/playground?estudios"
            >Estudios</nuxt-link
          >
        </div>
      </section>
      <section class="pnud-logo">
        <p class="text">Este proyecto se realizó con el apoyo de</p>
        <img
          class="logo-pnud"
          src="@/assets/img/pnud-acclab.jpg"
          alt="Logo de la PNUD y AccLab"
        />
      </section>
    </main>
    <MXFooter />
  </div>
</template>

<script>
import MXNavbar from '@/components/MXNavbar'
import Lottie from '@/components/Lottie.vue'
import animationData from '@/assets/animations/blob.json'
import CategoryCard from '@/components/CategoryCard'
import MXFooter from '@/components/MXFooter'

export default {
  components: {
    MXNavbar,
    Lottie,
    CategoryCard,
    MXFooter,
  },
  data() {
    return {
      animationData,
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  box-sizing: border-box;
  > .content {
    width: 100%;
    margin-top: 100px;
    margin-bottom: 48px;
    max-width: 1220px;
    box-sizing: border-box;
  }
}

.brand-logos {
  display: flex;
  justify-content: start;
  align-items: center;
  column-gap: 16px;
  padding: 0 24px;
  margin-top: 24px;
  .logo-cultura {
    max-width: 70%;
    max-height: 70px;
  }
}

#hero {
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  .content,
  .blob-container {
    max-width: 100%;
    padding: 0;
  }
  .content {
    min-width: 50%;
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
  padding: 0 24px;
  p {
    font-size: 24px;
  }
}

#details {
  padding: 0 24px;
  h2 {
    margin-top: 24px;
  }
  p {
    margin-top: 16px;
    max-width: 40em;
  }
}

#topics {
  h3 {
    margin-top: 48px;
    margin-bottom: 24px;
    padding: 0 24px;
  }
  .topic-list {
    z-index: 20;
    width: 100%;
    max-width: inherit;
    padding: 0 24px;
    padding-right: 24px;
    display: flex;
    column-gap: 16px;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-color: transparent;
    scrollbar-width: none;
    .end-space {
      display: block;
      width: 1px;
      height: 1px;
      border: 1px solid transparent;
    }
  }
}

#categories {
  padding: 24px;
  h3 {
    margin-bottom: 24px;
  }
  .category-list {
    max-width: 100%;
    box-sizing: border-box;
  }
  a.category-btn {
    display: inline-block;
    font-size: 24px;
    padding: 8px 16px;
    margin-bottom: 6px;
    text-decoration: none;
    color: var(--color-light);
    background-color: var(--color-dark);
    border-radius: 8px;
    border: none;
  }
}

.pnud-logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .text {
    text-align: center;
    margin: 16px 74px 8px 74px;
  }
  .logo-pnud {
    height: 80px;
  }
}

@media (min-width: 760px) {
  .container > .content {
    margin-top: 122px;
  }

  .brand-logos {
    column-gap: 32px;
    .logo-cultura {
      height: 80px;
    }
  }

  #hero {
    padding: 24px;

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

  #topics {
    .topic-list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      max-width: calc(4 * 280px + 24px * 4);
      column-gap: 24px;
      grid-row-gap: 24px;
    }
  }

  #categories {
    .category-list {
      flex-direction: column;
    }
  }

  .pnud-logo {
    .logo-pnud {
      margin-top: 16px;
      height: 120px;
    }
  }
}
</style>
