<template>
  <div id="playground" class="container">
    <PlaygroundNavbar class="playground-spacer" />
    <div class="head-spacer"></div>
    <div class="description">
      <div
        v-if="componenteSelected && componenteSelected.id !== ''"
        class="description-content"
      >
        <h3>{{ componenteSelected.nombre }}</h3>
        <div class="descripcion">
          <div v-html="toMD(componenteSelected.descripcion)"></div>
        </div>
      </div>
    </div>
    <main v-if="$store.state.cards[0]" class="content">
      <div
        v-for="(cards, cs) in $store.state.cards"
        :key="cs"
        class="cards-column"
      >
        <CardContent v-for="(card, c) in cards" :key="c" v-bind="card" />
      </div>
    </main>
    <div class="scroll-top">
      <div class="content">
        <div class="scroll" @click="scrollTop">
          <img class="arrow-up" src="@/assets/icons/arrow-up.svg" />
          <p>Subir</p>
        </div>
      </div>
    </div>
    <div v-if="!loading" class="loadMore">
      <div class="button" @click="loadMore(true)">Cargar más elementos</div>
    </div>
    <div
      v-waypoint="{
        active: true,
        callback: onWaypoint,
        options: intersectionOptions,
      }"
      class="loader-container"
    >
      <img
        class="loader-icon"
        :class="[{ invisible: !loading }]"
        src="@/assets/icons/loader.svg"
      />
      <div v-if="!loading && isEndList" class="end-list">
        {{ endListMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import PlaygroundNavbar from '@/components/PlaygroundNavbar.vue'
import CardContent from '@/components/CardContent'
import { mapMutations, mapActions } from 'vuex'

const md = new MarkdownIt({
  breaks: true,
})

const camposTitulos = {
  propuestas: 'Propuestas',
  acciones: 'Acciones',
  estudios: 'Estudios',
  retos: 'Retos',
}

const camposDescripciones = {
  propuestas: `Frente a las necesidades despiertan voces tenues que conforman rumores y en la medida que crecen se convierten en propuestas que retumban e invitan a pensar en el cambio.\n
**Escribe y comparte tus ideas, futuros imaginados, iniciativas, etc.  sobre el diseño, ejecución, evaluación de las políticas culturales (de gobierno, del sector privado y de la sociedad civil organizada) dirigidas al fortalecimiento del ecosistema cultural**
  `,
  acciones: `Las propuestas llevadas a la práctica pueden volverse cargas eléctricas, propagarse y alcanzar a dar un poco de luz capaz de volverse grandes fuegos.\n
**Queremos ampliar el conocimiento sobre programas y proyectos de gobierno, del sector privado, la sociedad civil organizada u organismos internacionales  que se estén llevando actualmente para el fortalecimiento del ecosistema cultural**
  `,
  estudios: `Los estudios reunidos y en vías de sumarse, tienen diferentes sonoridades. Desde las investigaciones académicas, y los datos estadísticos, hasta los manifiestos artísticos, hacen eco de diversas reflexiones en torno a la contrucción de políticas culturales.\n
**¿Conoces investigaciones, manifiestos, peticiones,  entre otros documentos, que abonen al conocimiento del ecosistema cultural? Te invitamos a subirlos en este conjunto de estudios.**
  `,
  retos: `¿Nuestras acciones llegaron, alcanzaron, resonaron hasta los rincones esperados, su propagación generó algún cambio, otras formas de hacer?, ¿logramos crear, experimentar y habitar lo común?\n
**¿Cuáles son los desafìos a afrontar para el fortalecimiento del ecosistema cultural?**
  `,
}

export default {
  name: 'Playground',
  components: {
    PlaygroundNavbar,
    CardContent,
  },
  data() {
    return {
      loading: false,
      endListMessage: 'No hay mas elementos para mostrar',
      isEndList: false,
      intersectionOptions: {
        root: null,
        rootMargin: '0px 0px 0px 0px',
        threshold: [0, 1],
      },
      waypoint: {
        going: 'out',
      },
    }
  },
  computed: {
    isMobile() {
      return process.client ? window.screen.width < 760 : true
    },
    offset() {
      return this.$store.state.offset
    },
    autor() {
      return this.$route.query.autor || null
    },
    fuente() {
      return this.$route.query.fuente || null
    },
    organizacion() {
      return this.$route.query.organizacion || null
    },
    etiqueta() {
      return this.$route.query.etiqueta || null
    },
    componente() {
      return this.$route.query.componente || null
    },
    componenteSelected() {
      let response =
        this.camposList.length === 1
          ? {
              nombre: camposTitulos[this.camposList[0]],
              descripcion: camposDescripciones[this.camposList[0]],
            }
          : null
      if (this.$store.state.componenteSelected) {
        response = this.$store.state.componenteSelected
      }
      return response
    },
    camposList() {
      const list = Object.keys(this.$route.query)
        .map((q) => {
          return q === 'propuestas' ||
            q === 'acciones' ||
            q === 'estudios' ||
            q === 'retos'
            ? q
            : false
        })
        .filter((f) => f)
      return list.length
        ? list
        : ['propuestas', 'acciones', 'estudios', 'retos']
    },
  },
  watch: {
    $route(to, from) {
      console.log('router!!!')
      if (to !== from) {
        console.log('buscar items!!!')
        window.location.reload()
        this.clearOffset()
        this.isEndList = false
      }
    },
    waypoint(to, from) {
      if (to.going === 'in' && from.going === 'out') {
        if (this.$store.state.cards[0].length) {
          console.log('cargar más items...')
          this.fetchData(true)
        }
      }
    },
  },
  mounted() {
    // this.fetchData()
    this.isEndList = false
    this.clearOffset()
    if (!this.componente) {
      this.clearComponenteSelected()
    }
    // this.fetchData()
    const queryString = new URLSearchParams(location.search)
    const cardId = queryString.get('cardId')
    if (cardId) {
      this.setShowCardModal(true)
    }
    this.loadMore()
  },
  methods: {
    ...mapMutations([
      'setShowCardModal',
      'setComponenteSelected',
      'clearComponenteSelected',
      'setOffset',
      'clearOffset',
      'clearCards',
    ]),
    ...mapActions(['setCards', 'addCards']),
    scrollTop() {
      console.log('scroll-top')
      if (process.client) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      }
    },
    onWaypoint(e) {
      // console.log('onWaypoint: ', e)
      this.waypoint = e
    },
    loadMore(append) {
      this.fetchData(append)
    },
    async fetchByEtiqueta(append) {
      console.log('fetchByEtiqueta: ', append)
      console.log('fetch offset: ', this.offset)
      this.loading = true
      const queryString = new URLSearchParams(location.search)
      const etiqueta = queryString.get('etiqueta')
      let url = `/api/etiquetas?id=${etiqueta}`
      if (this.offset) {
        url = `${url}&offset=${this.offset}`
      }
      const { data } = await this.$axios(url)
      this.loading = false
      console.log('data: ', data)
      if (data.records.length) {
        if (append) {
          this.addCards(data.records)
        } else {
          this.clearOffset()
          this.setCards(data.records)
        }
        console.log('offset: ', data.offset)
        this.setOffset(data.offset)
      } else {
        this.isEndList = true
      }
    },
    async fetchData(append) {
      console.log('fetch offset: ', this.offset)
      console.log('fetch etiqueta: ', this.etiqueta)
      console.log('fetch componente: ', this.componente)
      console.log('fetch camposList: ', this.camposList)
      this.loading = true
      let url = `/api/playground?`
      url = `${url}camposList=${this.camposList}`
      if (this.autor) {
        url = `${url}&autor=${this.autor}`
      }
      if (this.fuente) {
        url = `${url}&fuente=${this.fuente}`
      }
      if (this.organizacion) {
        url = `${url}&organizacion=${this.organizacion}`
      }
      if (this.etiqueta) {
        url = `${url}&etiqueta=${this.etiqueta}`
      }
      if (this.componente) {
        url = `${url}&componente=${this.componente}`
      }
      if (this.offset) {
        url = `${url}&offset=${this.offset}`
      }
      const { data } = await this.$axios(url)
      this.loading = false
      console.log('data: ', data)
      if (data.records.length) {
        if (append) {
          this.addCards(data.records)
        } else {
          this.clearOffset()
          this.setCards(data.records)
        }
        console.log('offset: ', data.offset)
        this.setOffset(data.offset)
      } else {
        this.isEndList = true
      }
    },
    toMD(text) {
      return text ? md.render(text) : null
    },
  },
}
</script>

<style lang="scss" scoped>
.head-spacer {
  display: block;
  width: 100%;
  height: 140px;
}
.content {
  width: 100%;
}
.container {
  min-height: 100vh;
  background-color: #e5e5e5;
  main.content {
    display: block;
    align-items: flex-start;
    margin: 0 auto;
    max-width: 1220px;
    padding: 24px;
    .cards-column {
      padding: 0 12px;

      > * {
        margin-bottom: 24px;
      }
    }
  }
  .scroll-top {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    .content {
      display: flex;
      justify-content: flex-end;
      padding: 24px;
      width: 100%;
      max-width: 1220px;
      pointer-events: none;
      .scroll {
        padding: 16px 24px;
        background-color: var(--color-light);
        box-shadow: 0 0 8px var(--color-dark);
        border-radius: 8px;
        pointer-events: auto;
        > * {
          margin: 0;
          padding: 0;
        }
      }
    }
  }
  .loader-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 48px;
    .loader-icon {
      display: block;
      width: 64px;
      &.invisible {
        display: none;
      }
    }
    .end-list {
      display: block;
      text-align: center;
      width: 100%;
      margin-top: 24px;
    }
  }
}
.description {
  padding: 24px 18px;
  background-color: white;
  .description-content {
    margin: 0 auto;
    max-width: 1220px;
    padding: 0 24px;
    .descripcion {
      display: block;
      max-width: 40em;
      box-sizing: border-box;
    }
  }
}
.loadMore {
  display: flex;
  width: 100%;
  justify-content: center;
  padding-left: 64px;
  padding-right: 64px;
  .button {
    display: block;
    cursor: pointer;
    width: auto;
    padding: 8px 24px;
    border-radius: 8px;
    background-color: var(--color-light);
  }
}
@media (min-width: 760px) {
  .container {
    main.content {
      display: flex;
      .cards-column {
        width: calc(100% / 3);
      }
    }
  }
}
</style>
