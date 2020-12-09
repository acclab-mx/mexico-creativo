<template>
  <div class="playground-navbar-menu">
    <div class="container">
      <div class="content">
        <div class="close">
          <img class="burger" src="@/assets/icons/cross.svg" @click="close" />
        </div>
        <div class="filters">
          <h3>Explorar información</h3>
          <p>Por temática</p>
          <div class="topic-selector">
            <TopicSelector
              v-model="topicSelected"
              :topics="$store.state.topics"
            />
          </div>
          <p>Por categoría</p>
          <div class="category-selector">
            <CategoryButton
              v-model="showPropuestas"
              label="Propuestas"
              @click="showPropuestas = !showPropuestas"
            />
            <CategoryButton
              v-model="showCitas"
              label="Citas"
              @click="showCitas = !showCitas"
            />
            <CategoryButton
              v-model="showEstudios"
              label="Estudios"
              @click="showEstudios = !showEstudios"
            />
            <CategoryButton
              v-model="showConceptos"
              label="Conceptos"
              @click="showConceptos = !showConceptos"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopicSelector from '@/components/TopicSelector'
import CategoryButton from '@/components/CategoryButton'
import { mapMutations } from 'vuex'

export default {
  components: {
    TopicSelector,
    CategoryButton,
  },
  data() {
    return {
      showPropuestas: false,
      showCitas: false,
      showEstudios: false,
      showConceptos: false,
    }
  },
  computed: {
    topicSelected: {
      get() {
        return this.$store.state.topicSelected
      },
      set(val) {
        console.log(val)
        this.setTopicSelected(val)
        this.$router.replace({
          query: { ...this.$route.query, topic: val ? val.orden : null },
        })
      },
    },
  },
  watch: {
    $route(to, from) {
      if (to !== from) {
        this.updateCategories()
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
    showCitas(val) {
      if (val) {
        if (!Object.keys(this.$route.query).includes('citas')) {
          this.$router.replace({
            query: { ...this.$route.query, citas: null },
          })
        }
      } else if (Object.keys(this.$route.query).includes('citas')) {
        const { citas, ...rest } = this.$route.query
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
    showConceptos(val) {
      if (val) {
        if (!Object.keys(this.$route.query).includes('conceptos')) {
          this.$router.replace({
            query: { ...this.$route.query, conceptos: null },
          })
        }
      } else if (Object.keys(this.$route.query).includes('conceptos')) {
        const { conceptos, ...rest } = this.$route.query
        this.$router.replace({ query: { ...rest } })
      }
    },
  },
  mounted() {
    this.updateCategories()
  },
  methods: {
    ...mapMutations([
      'setShowMXNavbarMenu',
      'setTopicSelected',
      'setActiveCategories',
    ]),
    close() {
      // console.log('close')
      this.setShowMXNavbarMenu(false)
    },
    updateCategories() {
      console.log('query: ', this.$route.query)
      if (Object.keys(this.$route.query).includes('propuestas')) {
        this.showPropuestas = true
      }
      if (Object.keys(this.$route.query).includes('citas')) {
        this.showCitas = true
      }
      if (Object.keys(this.$route.query).includes('estudios')) {
        this.showEstudios = true
      }
      if (Object.keys(this.$route.query).includes('conceptos')) {
        this.showConceptos = true
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
        .category-selector {
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
