<template>
  <footer>
    <div class="content">
      <section id="enlaces-de-interes">
        <div class="grupo">
          <h3>Enlaces de interés</h3>
          <ul>
            <li><a href="#">Participa</a></li>
            <li><a href="#">Publicaciones oficiales</a></li>
            <li><a href="#">Marco jurídico</a></li>
            <li><a href="#">Plataforma nacional de transparencia</a></li>
          </ul>
        </div>
        <div class="grupo">
          <h3>Recursos</h3>
          <ul>
            <li><a href="#">Descargar reporte</a></li>
            <li><a href="#">Descargar base de datos</a></li>
          </ul>
        </div>
        <div class="grupo">
          <h3>Legal</h3>
          <ul>
            <li><a href="#">Portal de datos abiertos</a></li>
            <li><a href="#">Declaración de accesibilidad</a></li>
            <li><a href="#">Aviso de privacidad integral</a></li>
            <li><a href="#">Aviso de privacidad simplificado</a></li>
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Política de seguridad</a></li>
            <li><a href="#">Nosotros</a></li>
          </ul>
        </div>
      </section>
      <p>© 2020. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  justify-content: center;
  width: 100%;
  color: var(--color-light);
  background-color: var(--color-brand-green);
  .content {
    width: 100%;
    max-width: 1220px;
    padding: 24px;
    #enlaces-de-interes {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      column-gap: 16px;
      grid-row-gap: 16px;
    }
  }

  ul {
    margin-top: 8px;
    li {
      a {
        padding-top: 8px;
        color: var(--color-light);
      }
    }
  }

  p {
    display: block;
    margin: 24px 0 48px 0;
    text-align: center;
    box-sizing: border-box;
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
