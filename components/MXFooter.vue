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
                  href="https://consultapublicamx.inai.org.mx/vut-web/"
                  target="_blank"
                  >Plataforma nacional de transparencia</a
                >
              </li>
            </ul>
          </div>
          <div class="grupo">
            <h3 class="title">Recursos</h3>
            <ul>
              <li><a href="#" target="_blank">Descargar reporte</a></li>
              <li><a href="#" target="_blank">Descargar base de datos</a></li>
            </ul>
          </div>
          <div class="grupo">
            <h3 class="title">Legal</h3>
            <ul>
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
                  >Nosotros</a
                >
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
    padding: 24px;
    #enlaces-de-interes {
      display: flex;
      flex-direction: column;
      justify-content: center;
      column-gap: 80px;
      grid-row-gap: 32px;
      .title {
        font-weight: 500;
        font-family: 'asapregular', 'HelveticaNeue-Light',
          'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial,
          'Lucida Grande', sans-serif;
        font-size: 18px;
        margin-bottom: 18px;
      }
      .grupo {
        .logo-mexico {
          height: 60px;
        }
      }
    }
  }

  ul {
    margin-top: 8px;
    li {
      a {
        padding-top: 8px;
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
    background-image: url('https://framework-gb.cdn.gob.mx/landing/img/pleca.svg');
  }
}

@media (min-width: 760px) {
  footer {
    .content {
      #enlaces-de-interes {
        flex-direction: row;
      }
    }
  }
}
</style>
