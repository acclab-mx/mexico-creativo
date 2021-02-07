<template>
  <div id="playground" class="container">
    <PlaygroundNavbar class="playground-spacer" />
    <MXNavbar />
    <div class="head-spacer"></div>
    <!--section v-show="$route.query.topic" class="topic-description">
      <div v-if="topicSelected && topicSelected.tema">
        <p class="label">Temática</p>
        <p>
          {{ topicSelected.tema }}
        </p>
      </div>
    </section-->
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
      <div class="button" @click="fetchData(true)">Cargar más elementos</div>
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
    <MXFooter />
  </div>
</template>

<script>
import MXNavbar from '@/components/MXNavbar'
import PlaygroundNavbar from '@/components/PlaygroundNavbar'
import CardContent from '@/components/CardContent'
import MXFooter from '@/components/MXFooter'
import { mapMutations, mapActions } from 'vuex'

export default {
  components: {
    MXNavbar,
    PlaygroundNavbar,
    CardContent,
    MXFooter,
  },
  async fetch() {
    // await this.fetchData()
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
    offsets() {
      return this.$store.state.offsets
    },
    topic() {
      return this.$route.query.topic || null
    },
    topicSelected() {
      return this.$store.state.topicSelected
    },
    categoryList() {
      const list = Object.keys(this.$route.query)
        .map((q) => {
          return q === 'propuestas' ||
            q === 'citas' ||
            q === 'estudios' ||
            q === 'conceptos'
            ? q
            : false
        })
        .filter((f) => f)
      return list.length
        ? list
        : ['propuestas', 'citas', 'estudios', 'conceptos']
    },
  },
  watch: {
    $route(to, from) {
      if (to !== from) {
        console.log('buscar items!!!')
        window.location.reload()
        this.clearOffsets()
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
    this.clearOffsets()
    this.fetchData()
    const queryString = new URLSearchParams(location.search)
    const cardId = queryString.get('cardId')
    if (cardId) {
      this.setShowCardModal(true)
    }
  },
  methods: {
    ...mapMutations([
      'setShowCardModal',
      'setTopicSelected',
      'setOffsets',
      'clearOffsets',
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
    async fetchData(append) {
      console.log('fetch offsets: ', this.offsets)
      console.log('fetch topic: ', this.topic)
      console.log('fetch categoryList: ', this.categoryList)
      this.loading = true
      let url = `/api/playground?`
      url = `${url}categoryList=${this.categoryList}`
      if (this.topic) {
        url = `${url}&topic=${this.topic}`
      }
      if (this.offsets.propuestas) {
        url = `${url}&offsetPropuestas=${this.offsets.propuestas}`
      }
      if (this.offsets.citas) {
        url = `${url}&offsetCitas=${this.offsets.citas}`
      }
      if (this.offsets.estudios) {
        url = `${url}&offsetEstudios=${this.offsets.estudios}`
      }
      if (this.offsets.conceptos) {
        url = `${url}&offsetConceptos=${this.offsets.conceptos}`
      }
      const { data } = await this.$axios(url)
      this.loading = false
      console.log('data: ', data)
      if (data.cards.length) {
        if (append) {
          this.addCards(data.cards)
        } else {
          this.clearOffsets()
          this.setCards(data.cards)
        }
        console.log('offsets: ', data.offsets)
        this.setOffsets(data.offsets)
      } else {
        this.isEndList = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #e5e5e5;
  main.content {
    display: flex;
    column-gap: 24px;
    align-items: flex-start;
    margin: 0 auto;
    max-width: 1220px;
    padding: 24px;
    .cards-column {
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
.playground-spacer {
  margin-top: 68px;
}
.head-spacer {
  display: block;
  width: 100%;
  height: 224px;
}
.topic-description {
  display: flex;
  justify-content: center;
  background-color: var(--color-light);
  > div {
    padding: 24px;
    width: 100%;
    max-width: 1220px;
    p {
      margin: 0;
      &.label {
        margin-bottom: 8px;
        font-size: 18px;
        font-style: italic;
      }
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
  .playground-spacer {
    margin-top: 68px;
  }
  .head-spacer {
    height: 240px;
  }
  .container {
    main.content {
      .cards-column {
        width: calc(100% / 3);
      }
    }
  }
}
</style>
