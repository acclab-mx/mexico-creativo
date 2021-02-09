<template>
  <div class="playground-navbar-menu">
    <div class="container">
      <div class="content">
        <div class="close">
          <img class="burger" src="@/assets/icons/cross.svg" @click="close" />
        </div>
        <div class="filters">
          <h3>Explorar información</h3>
          <p>Por componentes</p>
          <div class="componente-selector">
            <ComponenteSelector
              v-model="componenteSelected"
              :componentes="$store.state.componentes"
            />
          </div>
          <p>Por campos</p>
          <div class="campo-selector">
            <CampoButton
              v-model="showPropuestas"
              label="Propuestas"
              @click="showPropuestas = !showPropuestas"
            />
            <CampoButton
              v-model="showAcciones"
              label="Acciones"
              @click="showAcciones = !showAcciones"
            />
            <CampoButton
              v-model="showEstudios"
              label="Estudios"
              @click="showEstudios = !showEstudios"
            />
            <CampoButton
              v-model="showRetos"
              label="Retos"
              @click="showRetos = !showRetos"
            />
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
        this.$router.replace({
          query: { ...this.$route.query, componente: val ? val.orden : null },
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
      if (Object.keys(this.$route.query).includes('propuestas')) {
        this.showPropuestas = true
      }
      if (Object.keys(this.$route.query).includes('acciones')) {
        this.showAcciones = true
      }
      if (Object.keys(this.$route.query).includes('estudios')) {
        this.showEstudios = true
      }
      if (Object.keys(this.$route.query).includes('retos')) {
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
          > * {
            margin-top: 8px;
          }
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
