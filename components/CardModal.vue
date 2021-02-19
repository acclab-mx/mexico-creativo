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
        <img v-if="visualAttachment !== null" :src="visualAttachment" />
        <div
          v-if="description"
          class="description"
          :class="[card.campos_txt ? card.campos_txt[0].toLowerCase() : '']"
          v-html="descriptionMD"
        ></div>
        <div></div>
        <div v-if="card.enlace" class="enlaces">
          <p>Enlaces:</p>
          <a :href="card.enlace" target="_blank">{{ card.enlace }}</a>
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

const md = new MarkdownIt({
  breaks: true,
})

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
      return `color-campo-${
        this.card.campos_orden_txt ? this.card.campos_orden_txt[0] : '0'
      }`
    },
    categoryTag() {
      return this.card.category
        .toLowerCase()
        .substring(0, this.card.category.length - 1)
    },
    visualAttachment() {
      const attachment = this.card.portada || null
      return attachment
    },
    title() {
      return this.card.titulo || this.card.nombre || ''
    },
    description() {
      return this.card.descripcion
    },
    descriptionMD() {
      return md.render(this.description)
    },
    pillGroups() {
      // return [{ name: 'Pills #1', value: [{ label: 'pill 1', cardId: 'abc' }] }]
      let pillGroups = []
      const tagList = ['autoras', 'fuentes', 'organizacion', 'etiquetas']
      pillGroups = tagList
        .map((tag) => {
          switch (tag) {
            case 'autoras':
              return this.card.autoras
                ? {
                    name: 'Autores',
                    value: zipToObj(
                      'autora',
                      this.card.autoras,
                      this.card.autoras_txt
                    ),
                  }
                : null
            case 'fuentes':
              return this.card.fuentes
                ? {
                    name: 'Fuentes',
                    value: zipToObj(
                      'fuente',
                      this.card.fuentes,
                      this.card.fuentes_txt
                    ),
                  }
                : null
            case 'organizacion':
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
            case 'etiquetas':
              return this.card.etiquetas
                ? {
                    name: 'Etiquetas',
                    value: zipToObj(
                      'etiqueta',
                      this.card.etiquetas_orden,
                      this.card.etiquetas_txt
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
      if (pill.category === 'etiqueta') {
        console.log('open: ', cardId)
        /* const queryParams = new URLSearchParams(window.location.search)
        queryParams.set('cardId', cardId)
        console.log('queryParams: ', queryParams)
        history.pushState(null, null, `?${queryParams.toString()}`)
        this.fetchCard(cardId) */
        this.$router.push(`/playground?etiqueta=${pill.cardId}`)
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
  z-index: 3000;
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
        cursor: pointer;
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
