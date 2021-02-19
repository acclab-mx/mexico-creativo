<template>
  <div>
    <footer>
      <div class="content">
        <section id="enlaces-de-interes">
          <div class="grupo">
            <img
              class="logo-mexico"
              src="@/assets/img/logo-mexico.png"
              alt="logo de México"
            />
          </div>
          <div class="grupo">
            <h3 class="title">Enlaces de interés</h3>
            <ul>
              <li>
                <a href="https://participa.gob.mx/" target="_blank"
                  >Participa</a
                >
              </li>
              <li>
                <a href="https://www.gob.mx/publicaciones" target="_blank"
                  >Publicaciones oficiales</a
                >
              </li>
              <li>
                <a href="http://www.ordenjuridico.gob.mx/" target="_blank"
                  >Marco jurídico</a
                >
              </li>
              <li>
                <a
                  style="display: block; width: 240px"
                  href="https://consultapublicamx.inai.org.mx/vut-web/"
                  target="_blank"
                  >Plataforma Nacional de Transparencia</a
                >
              </li>
            </ul>
          </div>
          <div class="grupo">
            <h3 class="title">¿Qué es gob.mx?</h3>
            <ul>
              <li class="only-text">
                Es el portal único de trámites, información y participación
                ciudadana. <a href="#" target="_blank">Leer más</a>
              </li>
              <li>
                <a href="https://datos.gob.mx/" target="_blank"
                  >Portal de datos abiertos</a
                >
              </li>
              <li>
                <a href="https://www.gob.mx/accesibilidad" target="_blank"
                  >Declaración de accesibilidad</a
                >
              </li>
              <li>
                <a href="https://www.gob.mx/privacidadintegral" target="_blank"
                  >Aviso de privacidad integral</a
                >
              </li>
              <li>
                <a
                  href="https://www.gob.mx/privacidadsimplificado"
                  target="_blank"
                  >Aviso de privacidad simplificado</a
                >
              </li>
              <li>
                <a href="https://www.gob.mx/terminos" target="_blank"
                  >Términos y condiciones</a
                >
              </li>
              <li>
                <a
                  href="https://www.gob.mx/terminos#medidas-seguridad-informacion"
                  target="_blank"
                  >Política de seguridad</a
                >
              </li>
              <li>
                <a href="https://www.gob.mx/sitemap" target="_blank"
                  >Mapa de sitio</a
                >
              </li>
            </ul>
          </div>
          <div class="grupo">
            <a
              class="title-link"
              href="https://www.gob.mx/tramites/ficha/presentacion-de-quejas-y-denuncias-en-la-sfp/SFP54"
              target="_blank"
              >Denuncia contra servidores públicos</a
            >
            <h3 class="title">Síguenos en</h3>
            <ul class="social-media">
              <li>
                <a
                  class="social-media-icon"
                  href="https://www.facebook.com/gobmexico"
                  target="_blank"
                  ><img src="@/assets/icons/facebook.svg"
                /></a>
                <a
                  class="social-media-icon"
                  href="https://twitter.com/GobiernoMX"
                  target="_blank"
                  ><img src="@/assets/icons/twitter.svg"
                /></a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </footer>
    <div class="pleca"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 40px;
  color: var(--color-light);
  background-color: var(--color-brand-green);
  .content {
    width: 100%;
    max-width: 1220px;
    padding: 32px;
    #enlaces-de-interes {
      display: inline-flex;
      flex-direction: column;
      justify-content: space-between;
      column-gap: 32px;
      .title {
        font-weight: 500;
        font-family: 'asapregular', 'HelveticaNeue-Light',
          'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial,
          'Lucida Grande', sans-serif;
        font-size: 18px;
        margin-bottom: 18px;
      }
      .title-link {
        display: block;
        width: 100%;
        min-width: 300px;
        font-size: 14px;
        color: white;
        margin-bottom: 18px;
      }
      .grupo {
        /* margin: 0 32px 32px 0; */

        margin-bottom: 32px;
        .logo-mexico {
          width: 100%;
          max-width: 300px;
        }
        .only-text {
          font-size: 14px;
          margin-bottom: 8px;
        }
        .social-media {
          display: flex;
          justify-content: space-between;
          .social-media-icon {
            img {
              display: inline-block;
              height: 20px;
            }
          }
        }
      }
    }
  }

  ul {
    margin-top: 8px;
    li {
      a {
        padding-top: 4px;
        color: var(--color-light);
        font-family: 'asapregular', 'HelveticaNeue-Light',
          'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial,
          'Lucida Grande', sans-serif;
        font-size: 14px;
      }
    }
  }

  p {
    display: block;
    margin: 24px 0 48px 0;
    text-align: center;
    box-sizing: border-box;
  }
  .pleca {
    display: block;
    width: 100%;
    height: 40px;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url('https://framework-gb.cdn.gob.mx/landing/img/pleca.svg');
  }
}

@media (min-width: 1020px) {
  footer {
    .content {
      #enlaces-de-interes {
        flex-direction: row;
        column-gap: 16px;
      }
    }
  }
}

@media (min-width: 1220px) {
  footer {
    .content {
      #enlaces-de-interes {
        flex-direction: row;
        column-gap: 32px;
      }
    }
  }
}

@media (min-width: 1320px) {
  footer {
    .content {
      #enlaces-de-interes {
        flex-direction: row;
        column-gap: 32px;
      }
    }
  }
}
</style>
