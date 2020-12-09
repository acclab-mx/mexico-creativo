<template>
  <div class="card-modal">
    <div class="container">
      <div class="close">
        <img class="cross" src="@/assets/icons/cross.svg" @click="close" />
      </div>
      <div v-if="!card" class="content">
        <div class="loader">
          <img class="icon" src="@/assets/icons/loader.svg" />
        </div>
      </div>
      <div v-else class="content">
        <p class="label">{{ card.category }}</p>
        <div class="separator" :class="[colorClass]"></div>
        <h3>{{ title }}</h3>
        <img v-if="visualAttachment[0].url" :src="visualAttachment[0].url" />
        <div
          v-if="description"
          class="description"
          :class="[card.category.toLowerCase()]"
          v-html="descriptionMD"
        ></div>
        <div></div>
        <div v-if="card.link" class="enlaces">
          <p>Enlaces:</p>
          <a :href="card.link" target="_blank">{{ card.link }}</a>
        </div>
        <div v-for="(pillGroup, g) in pillGroups" :key="g" class="pill-group">
          <p>{{ pillGroup.name }}</p>
          <div
            v-for="(pill, p) in pillGroup.value"
            :key="p"
            class="pill"
            @click="openPill(pill)"
          >
            {{ pill.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import { mapMutations, mapActions } from 'vuex'

const md = new MarkdownIt()

const zipToObj = (category, cardIds, labels) =>
  Array.isArray(cardIds)
    ? cardIds.map((cardId, index) => ({
        category,
        cardId,
        label: labels[index],
      }))
    : [{ category, cardId: cardIds, label: labels }]

export default {
  computed: {
    card() {
      return this.$store.state.cardModal
    },
    colorClass() {
      return `color-topic-${this.card.numero_de_tematica[0]}`
    },
    categoryTag() {
      return this.card.category
        .toLowerCase()
        .substring(0, this.card.category.length - 1)
    },
    visualAttachment() {
      const attachment = this.card.foto ||
        this.card.fotografia ||
        this.card.ilustracion ||
        this.card['visualizacion de datos'] || [{ url: '' }]
      return attachment
    },
    title() {
      return this.card[this.categoryTag]
    },
    description() {
      switch (this.categoryTag) {
        case 'propuesta':
          return this.card.descripcion_corta
        case 'cita':
          return this.card.autora
        case 'concepto':
          return this.card.definicion
        case 'estudio':
          return this.card.descripcion
        default:
          return null
      }
    },
    descriptionMD() {
      return md.render(this.description)
    },
    pillGroups() {
      // return [{ name: 'Pills #1', value: [{ label: 'pill 1', cardId: 'abc' }] }]
      let pillGroups = []
      let tagList = []
      switch (this.categoryTag) {
        case 'propuesta':
          tagList = ['autoras', 'organizaciones', 'conceptos_relacionados']
          break
        case 'cita':
          tagList = ['fuentes', 'organizaciones', 'conceptos_relacionados']
          break
        case 'estudio':
          tagList = ['fuentes', 'organizaciones', 'conceptos_relacionados']
          break
        case 'concepto':
          tagList = ['fuentes', 'autoras']
          break
      }
      pillGroups = tagList
        .map((tag) => {
          switch (tag) {
            case 'autoras':
              return this.card.autora
                ? {
                    name: 'Autores',
                    value: zipToObj(
                      'autora',
                      this.card.autora,
                      this.card.autora_txt
                    ),
                  }
                : null
            case 'fuentes':
              return this.card.fuente
                ? {
                    name: 'Fuentes',
                    value: zipToObj(
                      'fuente',
                      this.card.fuente,
                      this.card.fuente_txt
                    ),
                  }
                : null
            case 'organizaciones':
              return this.card.organizacion
                ? {
                    name: 'Organizaciones',
                    value: zipToObj(
                      'organizacion',
                      this.card.organizacion,
                      this.card.organizacion_txt
                    ),
                  }
                : null
            case 'conceptos_relacionados':
              return this.card.conceptos_relacionados
                ? {
                    name: 'Conceptos relacionados',
                    value: zipToObj(
                      'concepto',
                      this.card.conceptos_relacionados,
                      this.card.conceptos_relacionados_txt
                    ),
                  }
                : null
          }
        })
        .filter((i) => i)
      console.log('pillGroups: ', pillGroups)
      return pillGroups
    },
  },
  mounted() {
    console.log('card modal mounted')
    const queryString = new URLSearchParams(location.search)
    const cardId = queryString.get('cardId')
    console.log('queryString: ', cardId)
    if (cardId) {
      this.fetchCard(cardId)
    }
  },
  methods: {
    ...mapMutations(['setShowCardModal', 'setCardModal']),
    ...mapActions(['fetchCard']),
    close() {
      const queryString = new URLSearchParams(location.search)
      queryString.delete('cardId')
      console.log('queryParams: ', queryString)
      history.pushState(null, null, `?${queryString.toString()}`)
      this.setShowCardModal(false)
    },
    openPill(pill) {
      const cardId = `${pill.category}-${pill.cardId}`
      console.log('open pill: ', cardId)
      if (pill.category === 'concepto') {
        console.log('open: ', cardId)
        const queryParams = new URLSearchParams(window.location.search)
        queryParams.set('cardId', cardId)
        console.log('queryParams: ', queryParams)
        history.pushState(null, null, `?${queryParams.toString()}`)
        this.fetchCard(cardId)
      }
    },
  },
  beforeDestroy() {
    console.log('clear modal!!!')
    this.setCardModal(null)
  },
}
</script>

<style lang="scss" scoped>
.card-modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  > .container {
    width: 100vw;
    height: 100%;
    max-height: 100%;
    display: block;
    padding: 24px;
    padding-bottom: 64px;
    background-color: var(--color-light);
    overflow-y: auto;
    pointer-events: auto;
    .close {
      display: block;
      width: 100%;
      text-align: right;
      .cross {
        width: 32px;
      }
    }
    .content {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      grid-row-gap: 16px;
      .loader {
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          max-width: 60px;
        }
      }
    }
    .label {
      font-style: italic;
    }
    .separator {
      display: block;
      width: 100%;
      height: 4px;
    }
    img {
      max-width: 100%;
      margin: auto;
      border-radius: 8px;
    }
    .description {
      &.citas {
        font-style: italic;
        text-align: right;
      }
    }
    .enlaces {
      p {
        margin: 0;
      }
      a {
        word-wrap: break-word;
        display: inline-block;
      }
    }
    .pill-group {
      p {
        margin: 0;
      }
      .pill {
        display: inline-block;
        margin-top: 8px;
        margin-right: 8px;
        padding: 4px 16px;
        border-radius: 16px;
        color: var(--color-light);
        background-color: gray;
      }
    }
    .action {
      text-align: right;
      font-weight: 700;
    }
  }
}

@media (min-width: 760px) {
  .card-modal {
    padding: 24px;
    > .container {
      max-width: 760px;
      height: auto;
      border-radius: 8px;
    }
  }
}
</style>
