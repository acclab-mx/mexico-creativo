<template>
  <div class="playground-navbar-menu">
    <div class="container">
      <div class="content">
        <div class="close">
          <img class="burger" src="@/assets/icons/cross.svg" @click="close" />
        </div>
        <div class="filters">
          <h3>Explorar información</h3>
          <div class="componente-selector">
            <ComponenteSelector
              v-model="componenteSelected"
              :componentes="$store.state.componentes"
            />
          </div>
          <div class="campo-selector">
            <popper trigger="hover">
              <div class="popper">
                <p>
                  Los estudios reunidos y en vías de sumarse, tienen diferentes
                  sonoridades.<br />Desde las investigaciones académicas, y los
                  datos estadísticos, hasta los manifiestos artísticos, hacen
                  eco de diversas reflexiones en torno a la contrucción de
                  políticas culturales.<br />
                  <b
                    >¿Conoces investigaciones, manifiestos, peticiones, entre
                    otros documentos, que abonen al conocimiento del ecosistema
                    cultural?<br />
                    Te invitamos a subirlos en este conjunto de estudios.</b
                  >
                </p>
              </div>
              <CampoButton
                id="tooltip-target-estudios"
                slot="reference"
                v-model="showEstudios"
                active-color="--color-campo-1"
                label="Estudios"
                @click="showEstudios = !showEstudios"
              />
            </popper>
            <popper trigger="hover">
              <div class="popper">
                <p>
                  Frente a las necesidades despiertan voces tenues que conforman
                  rumores y en la medida que crecen se convierten en propuestas
                  que retumban e invitan a pensar en el cambio.<br />
                  <b
                    >Escibe y comparte tus ideas, futuros imaginados,
                    inciativas, etc. sobre el diseño, ejecución, evaluación de
                    las políticas culturales (de gobierno, del sector privado y
                    de la sociedad civil organizada) dirigidas al
                    fortalecimiento del ecosistema cultural?</b
                  >
                </p>
              </div>
              <CampoButton
                slot="reference"
                v-model="showPropuestas"
                active-color="--color-campo-2"
                label="Propuestas"
                @click="showPropuestas = !showPropuestas"
              />
            </popper>
            <popper trigger="hover">
              <div class="popper">
                <p>
                  Las propuestas llevadas a la práctica pueden volverse cargas
                  eléctricas, propagarse y alcanzar a dar un poco de luz capaz
                  de volverse grandes fuegos.<br />
                  <b
                    >Queremos ampliar el conocimiento sobre programas y
                    proyectos de gobierno, del sector privado, la sociedad civil
                    organizada u organismos internacionales que se estén
                    llevando actualmente para el fortalecimiento del ecosistema
                    cultural</b
                  >
                </p>
              </div>
              <CampoButton
                slot="reference"
                v-model="showAcciones"
                active-color="--color-campo-3"
                label="Acciones"
                @click="showAcciones = !showAcciones"
              />
            </popper>
            <popper trigger="hover">
              <div class="popper">
                <p>
                  ¿Nuestras acciones llegaron, alcanzaron, resonaron hasta los
                  rincones esperados, su propagación generó algún cambio, otras
                  formas de hacer?, ¿logramos crear, expe'rimentar y habitar lo
                  común?<br />
                  <b
                    >¿Cuáles son los desafìos a afrontar para el fortalecimiento
                    del ecosistema cultural?
                  </b>
                </p>
              </div>
              <CampoButton
                slot="reference"
                v-model="showRetos"
                active-color="--color-campo-4"
                label="Retos"
                @click="showRetos = !showRetos"
              />
            </popper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComponenteSelector from '@/components/ComponenteSelector'
import CampoButton from '@/components/CampoButton'
import { mapMutations } from 'vuex'

export default {
  components: {
    ComponenteSelector,
    CampoButton,
  },
  data() {
    return {
      showPropuestas: false,
      showAcciones: false,
      showEstudios: false,
      showRetos: false,
    }
  },
  computed: {
    componenteSelected: {
      get() {
        return this.$store.state.componenteSelected
      },
      set(val) {
        console.log(val)
        this.setComponenteSelected(val)
        const query = this.$route.query
        delete query.etiqueta
        this.$router.replace({
          query: { ...query, componente: val ? val.orden : null },
        })
      },
    },
  },
  watch: {
    $route(to, from) {
      if (to !== from) {
        this.updateCampos()
      }
    },
    showPropuestas(val) {
      if (val) {
        if (!Object.keys(this.$route.query).includes('propuestas')) {
          this.$router.replace({
            query: { ...this.$route.query, propuestas: null },
          })
        }
      } else if (Object.keys(this.$route.query).includes('propuestas')) {
        const { propuestas, ...rest } = this.$route.query
        this.$router.replace({ query: { ...rest } })
      }
    },
    showAcciones(val) {
      if (val) {
        if (!Object.keys(this.$route.query).includes('acciones')) {
          this.$router.replace({
            query: { ...this.$route.query, acciones: null },
          })
        }
      } else if (Object.keys(this.$route.query).includes('acciones')) {
        const { acciones, ...rest } = this.$route.query
        this.$router.replace({ query: { ...rest } })
      }
    },
    showEstudios(val) {
      if (val) {
        if (!Object.keys(this.$route.query).includes('estudios')) {
          this.$router.replace({
            query: { ...this.$route.query, estudios: null },
          })
        }
      } else if (Object.keys(this.$route.query).includes('estudios')) {
        const { estudios, ...rest } = this.$route.query
        this.$router.replace({ query: { ...rest } })
      }
    },
    showRetos(val) {
      if (val) {
        if (!Object.keys(this.$route.query).includes('retos')) {
          this.$router.replace({
            query: { ...this.$route.query, retos: null },
          })
        }
      } else if (Object.keys(this.$route.query).includes('retos')) {
        const { retos, ...rest } = this.$route.query
        this.$router.replace({ query: { ...rest } })
      }
    },
  },
  mounted() {
    this.updateCampos()
  },
  methods: {
    ...mapMutations([
      'setShowMXNavbarMenu',
      'setComponenteSelected',
      'setActiveCampos',
    ]),
    close() {
      // console.log('close')
      this.setShowMXNavbarMenu(false)
    },
    updateCampos() {
      console.log('query: ', this.$route.query)
      const query = this.$route.query
      delete query.etiqueta
      if (Object.keys(query).includes('propuestas')) {
        this.showPropuestas = true
      }
      if (Object.keys(query).includes('acciones')) {
        this.showAcciones = true
      }
      if (Object.keys(query).includes('estudios')) {
        this.showEstudios = true
      }
      if (Object.keys(query).includes('retos')) {
        this.showRetos = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.playground-navbar-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  pointer-events: none;
  z-index: 2000;
  .container {
    max-width: 1220px;
    width: 100%;
    text-align: right;
    .content {
      display: inline-block;
      margin: 8px;
      padding: 16px;
      background-color: var(--color-light);
      border-radius: 8px;
      max-height: calc(100vh - 16px);
      height: 100%;
      overflow-y: auto;
      pointer-events: auto;
      .close {
        display: block;
        width: 100%;
        text-align: right;
        .burger {
          display: inline-block;
          height: 32px;
        }
      }
      .filters {
        text-align: left;
        p {
          margin: 0;
          margin-top: 8px;
        }
        .componente-selector {
          margin-top: 8px;
        }
        .campo-selector {
          margin-top: 18px;
        }
      }
    }
  }
}

@media (min-width: 760px) {
  .playground-navbar-menu {
    .container {
      .content {
        margin-top: 16px;
        max-height: calc(100vh - 32px);
      }
    }
  }
}
</style>
