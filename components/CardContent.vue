<template>
  <div class="card-content" @click="open">
    <p class="label">{{ category }}</p>
    <div class="separator" :class="[topicId]"></div>
    <h3 :class="[category.toLowerCase()]">
      {{ title }}
    </h3>
    <img v-if="image" :src="image" />
    <div
      v-if="description"
      class="description"
      :class="[category.toLowerCase()]"
      v-html="descriptionMD"
    ></div>
    <div class="action">Abrir</div>
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
    topicId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'Category',
    },
    title: {
      type: String,
      default: '',
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
  },
  computed: {
    descriptionMD() {
      return md.render(this.description)
    },
  },
  methods: {
    ...mapMutations(['setShowCardModal', 'setCardModal']),
    open() {
      console.log('open: ', this.id, this.category)
      this.setCardModal(
        this.$store.state.cards.filter((c) => c.id === this.id)[0]
      )
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
