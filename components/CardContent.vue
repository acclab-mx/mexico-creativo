<template>
  <div class="card-content" @click="open">
    <p class="label">{{ category }}</p>
    <div class="separator" :class="[colorClass]"></div>
    <h3 :class="[category.toLowerCase()]">
      {{ title }}
    </h3>
    <img v-if="visualAttachment" :src="visualAttachment[0].url" />
    <div
      v-if="description"
      class="description"
      :class="[category.toLowerCase()]"
      v-html="descriptionMD"
    ></div>
    <div class="action">{{ openText }}</div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import { mapMutations } from 'vuex'

const md = new MarkdownIt()

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    orden: {
      type: Number,
    },
    numero_de_tematica: {
      type: Array,
      required: true,
    },
    category: String,
    cita: String,
    propuesta: String,
    concepto: String,
    estudio: String,
    image: String,
    autora: String,
    definicion: String,
    descripcion: String,
    descripcion_corta: String,
    foto: Array,
    fotografia: Array,
    ilustracion: Array,
    'visualizacion de datos': Array,
  },
  computed: {
    colorClass() {
      return `color-topic-${this.numero_de_tematica}`
    },
    categoryTag() {
      return this.category.toLowerCase().substring(0, this.category.length - 1)
    },
    visualAttachment() {
      const attachment =
        this.foto ||
        this.fotografia ||
        this.ilustracion ||
        this['visualizacion de datos'] ||
        null
      return attachment
    },
    title() {
      return this[this.categoryTag]
    },
    description() {
      switch (this.categoryTag) {
        case 'propuesta':
          return this.descripcion_corta
        case 'cita':
          return this.autora
        case 'concepto':
          return this.definicion
        case 'estudio':
          return this.descripcion
        default:
          return null
      }
    },
    descriptionLimited() {
      return typeof this.description === 'string' &&
        this.description.length > 141
        ? this.description.substring(0, 140) + '...'
        : this.description
    },
    descriptionMD() {
      return md.render(this.descriptionLimited)
    },
    openText() {
      return typeof this.description === 'string' &&
        this.description.length > 140
        ? 'Abrir para continuar leyendo'
        : 'Abrir'
    },
  },
  methods: {
    ...mapMutations(['setShowCardModal', 'setCardModal']),
    open() {
      const cardId = `${this.categoryTag}-${this.id}`
      console.log('open: ', cardId)
      const queryParams = new URLSearchParams(window.location.search)
      queryParams.set('cardId', cardId)
      console.log('queryParams: ', queryParams)
      history.pushState(null, null, `?${queryParams.toString()}`)
      this.setShowCardModal(true)
    },
  },
}
</script>

<style lang="scss" scoped>
.card-content {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 24px;
  border-radius: 8px;
  background-color: var(--color-light);
  grid-row-gap: 8px;
  cursor: pointer;
  .label {
    margin: 0;
    font-style: italic;
  }
  .separator {
    display: block;
    width: 100%;
    height: 4px;
  }
  h3 {
    &.citas {
      font-style: italic;
      font-size: 18px;
      color: rgba(0, 0, 0, 0.75);
    }
  }
  img {
    border-radius: 8px;
  }
  .description {
    max-width: 100%;
    width: 100%;
    padding: 4px;
    margin: 0;
    overflow: hidden;
    &.citas {
      font-style: italic;
      text-align: right;
    }
  }
  .action {
    text-align: right;
    font-weight: 700;
  }
}
</style>
