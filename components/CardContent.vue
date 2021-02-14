<template>
  <div class="card-content" @click="open">
    <p class="label">{{ campo }}</p>
    <div class="separator" :class="[colorClass]"></div>
    <h3 v-show="titulo" :class="[campos_txt[0].toLowerCase()]">
      {{ titulo }}
    </h3>
    <img v-if="visualAttachment !== null" :src="visualAttachment" />
    <div
      v-if="descripcion"
      class="description"
      :class="[campos_txt[0].toLowerCase()]"
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
    titulo: {
      type: String,
      required: true,
    },
    campos_orden_txt: {
      type: Array,
      required: true,
    },
    campos_txt: Array,
    accion: String,
    propuesta: String,
    reto: String,
    estudio: String,
    portada: String,
    autora_txt: String,
    definicion: String,
    descripcion: String,
    descripcion_corta: String,
  },
  computed: {
    colorClass() {
      return `color-campo-${this.campos_orden_txt[0]}`
    },
    campo() {
      let tag = ''
      const campo = this.campos_txt[0]

      console.log('campo: ', campo)

      if (campo === 'retos') tag = 'Reto'
      if (campo === 'propuestas') tag = 'Propuesta'
      if (campo === 'estudios') tag = 'Estudio'
      if (campo === 'acciones') tag = 'Acción'

      return tag
    },
    categoryTag() {
      return this.campos_txt[0]
    },
    visualAttachment() {
      const attachment = this.portada
      return attachment
    },
    title() {
      return this[this.categoryTag]
    },
    descriptionLimited() {
      return typeof this.descripcion === 'string' &&
        this.descripcion.length > 141
        ? this.descripcion.substring(0, 140) + '...'
        : this.descripcion
    },
    descriptionMD() {
      return md.render(this.descriptionLimited)
    },
    openText() {
      return typeof this.descripcion === 'string' &&
        this.descripcion.length > 140
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
