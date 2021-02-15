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
        </div>
      </section>
      <section id="componentes">
        <p>
          Resonancias es una herramienta de construcción colectiva, pensada para
          reunir información relevante para construir política cultura, ya sea
          pública, privada o emanada del sector de la sociedad civil organizada
          y que apunte a fortalecer el ecosistema cultural y sus cadenas de
          valor. Y como buena caja de reverberación, siempre está dispuesta a
          sumar nuevas voces. <nuxt-link to="/nosotros">Saber más</nuxt-link>.
        </p>
        <p>Te invitamos a que explores este repositorio vivo.</p>
        <p>
          Para consultar y alimentar el sitio, hemos abierto una serie de
          conjuntos: estudios, propuestas, retos, acciones, ecosistema cultural
          y cadena de valor. A partir de ellos, podrás guiar tu búsqueda.
          <br />Aquí se hacen eco y cruzan distintas reflexiones surgidas de
          diálogos entre personas involucradas activamente en el sector cultural
          y artístico.
        </p>
        <p>Haz click en alguna de las siguientes opciones:</p>
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
          <p class="txt">
            La iniciativa Resonancias fue realizada con el apoyo del Laboratorio
            de Aceleración del Programa de las Naciones Unidas para el
            Desarrollo en México.<br /><br />
            El análisis y las conclusiones aquí expresadas no reflejan
            necesariamente las opiniones del Programa de las Naciones Unidas
            para el Desarrollo, de su Junta Ejecutiva, ni de sus Estados
            Miembros.
          </p>
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
      </section>
    </main>
  </div>
</template>

<script>
import ComponenteMenu from '@/components/ComponenteMenu.vue'

export default {
  name: 'Home',
  components: {
    ComponenteMenu,
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
  .content {
    min-width: 50%;
    max-width: 60%;
  }
  .title {
    h1 {
      font-size: 32px;
    }
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
    margin: 16px 24px 8px 24px;
  }
  .logos-container {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    grid-row-gap: 24px;
    align-items: center;
    width: 100%;
    padding: 24px;
    .logo-pnud {
      height: 120px;
    }
    .logo-oei {
      height: 60px;
    }
    .txt {
      width: 100%;
      font-size: 14px;
    }
  }
}

@media (min-width: 760px) {
  .container > .content {
    margin-top: 20px;
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
  }

  #campos {
    .campos-list {
      flex-direction: column;
    }
  }

  .logos-aliados {
    .logos-container {
      flex-direction: row;
      .txt {
        max-width: 30%;
      }
      .logo-pnud {
        height: 200px;
      }
      .logo-oei {
        height: 60px;
      }
    }
  }
}
</style>
