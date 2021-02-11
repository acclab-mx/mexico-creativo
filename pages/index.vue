<template>
  <div class="container">
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
            <h1>Resonancias</h1>
          </div>
          <div class="subtitle"></div>
          <p class="description-desktop">
            Repositorio vivo dónde confluyen, visualizan, articulan y
            distribuyen ideas y propuestas sobre las economías culturales y
            creativas.<br /><br />
            Resonancias surge de diez encuentros, en tiempos de pandemia, entre
            profesionales de la cultura que forman parte de instituciones
            públicas, organismos internacionales y el sector independiente.
            <nuxt-link to="/nosotros">Saber más</nuxt-link>.
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
          Resonancias surge de diez encuentros, en tiempos de pandemia, entre
          profesionales de la cultura que forman parte de instituciones
          públicas, organismos internacionales y el sector independiente.
          <nuxt-link to="/nosotros">Saber más</nuxt-link>.
        </p>
      </section>
      <section id="details">
        <h2>Guía para usar el Almacén</h2>
        <p>
          Puedes explorar las ideas a partir de temas centrales y por medio de
          las distintas categorías. Encontrarás textos, pero también
          infografías, gráficas, imágenes, audios y videos.
        </p>
      </section>
      <section id="componentes">
        <p>Haz click en alguna de las siguientes opciones.</p>
        <div class="componente-menu">
          <ComponenteMenu />
        </div>
      </section>
      <section id="campos">
        <h3>Descargar recursos</h3>
        <div class="campos-list">
          <a
            class="campo-btn"
            href="https://mexicocreativo.cultura.gob.mx/wp-content/uploads/2020/09/1-BASE-Sondeo.xlsx"
            target="_blank"
          >
            Base de datos
          </a>
          <a
            class="campo-btn"
            href="https://mexicocreativo.cultura.gob.mx/wp-content/uploads/2020/09/Resultados-del-Sondeo.pdf"
            target="_blank"
          >
            PDF del sondeo
          </a>
        </div>
      </section>
      <section class="logos-aliados">
        <p class="text">Este proyecto se realizó con el apoyo de</p>
        <div class="logos-container">
          <img
            class="logo-pnud"
            src="@/assets/img/pnud-acclab.jpg"
            alt="Logo de la PNUD y AccLab"
          />
          <img
            class="logo-oei"
            src="@/assets/img/logo-oei.jpg"
            alt="Logo de la OEI"
          />
        </div>
        <div class="texto-pnud">
          <div>
            <p class="txt">
              La iniciativa Resonancias fue realizada con el apoyo del
              Laboratorio de Aceleración del Programa de las Naciones Unidas
              para el Desarrollo en México.<br /><br />
              El análisis y las conclusiones aquí expresadas no reflejan
              necesariamente las opiniones del Programa de las Naciones Unidas
              para el Desarrollo, de su Junta Ejecutiva, ni de sus Estados
              Miembros.
            </p>
          </div>
          <div></div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import Lottie from '@/components/Lottie.vue'
import animationData from '@/assets/animations/blob.json'
import ComponenteMenu from '@/components/ComponenteMenu.vue'

export default {
  name: 'Home',
  components: {
    Lottie,
    ComponenteMenu,
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
    max-width: 1220px;
    padding-top: 80px;
    box-sizing: border-box;
  }
}

.brand-logos {
  display: flex;
  justify-content: start;
  align-items: center;
  column-gap: 16px;
  padding: 0 24px;
  .logo-cultura {
    max-width: 70%;
    max-height: 70px;
  }
}

#hero {
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  padding-top: 40px;
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
    h1 {
      font-size: 32px;
    }
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
  font-size: 18px;
  a {
    font-size: 18px;
  }
}

#description {
  margin-top: 24px;
  max-width: 32rem;
  padding: 0 24px;
  p {
    font-size: 18px;
    a {
      font-size: 18px;
    }
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

#componentes {
  h3 {
    margin-top: 48px;
    margin-bottom: 24px;
    padding: 0 24px;
  }
  p {
    padding: 0 24px;
  }
  .componente-menu {
    display: flex;
    width: 100%;
    padding: 32px;
    justify-content: center;
    align-items: center;
  }
}

#campos {
  padding: 24px;
  h3 {
    margin-bottom: 24px;
  }
  .campos-list {
    max-width: 100%;
    box-sizing: border-box;
  }
}

.campo-btn {
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

.logos-aliados {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .text {
    text-align: center;
    margin: 16px 74px 8px 74px;
  }
  .logos-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 24px;
    .logo-pnud {
      height: 100px;
    }
    .logo-oei {
      height: 40px;
    }
  }
  .texto-pnud {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    div {
      display: flex;
      justify-content: center;
      width: 50%;
      height: 100%;
      .txt {
        max-width: 30em;
        font-size: 10px;
        padding: 0 24px;
      }
    }
  }
}

@media (min-width: 760px) {
  .container > .content {
    margin-top: 120px;
  }

  .brand-logos {
    column-gap: 32px;
    .logo-cultura {
      height: 80px;
    }
  }

  #hero {
    padding-top: 40px;
    .title {
      h1 {
        font-size: 72px;
      }
    }
    .subtitle {
      margin-top: 8px;
    }
  }

  .description-desktop {
    display: inherit;
    font-size: 24px;
    a {
      font-size: 24px;
    }
  }

  #description {
    display: none;
    p {
      font-size: 24px;
      a {
        font-size: 24px;
      }
    }
  }

  #campos {
    .campos-list {
      flex-direction: column;
    }
  }

  .logos-aliados {
    .logo-pnud {
      margin-top: 16px;
      height: 200px;
    }
    .logo-oei {
      margin-top: 16px;
      height: 60px;
    }
  }
}
</style>
