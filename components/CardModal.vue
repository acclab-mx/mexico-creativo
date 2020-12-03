<template>
  <div class="card-modal">
    <div class="container">
      <div class="close">
        <img class="cross" src="@/assets/icons/cross.svg" @click="close" />
      </div>
      <div class="content">
        <p class="label">{{ card.category }}</p>
        <div class="separator" :class="[card.topicId]"></div>
        <h3>{{ card.title }}</h3>
        <img v-if="card.image" :src="card.image" />
        <div
          v-if="card.description"
          class="description"
          :class="[card.category.toLowerCase()]"
          v-html="descriptionMD"
        ></div>
        <div v-if="card.link" class="enlaces">
          <p>Enlaces:</p>
          <a :href="card.link" target="_blank">{{ card.link }}</a>
        </div>
        <div v-if="card.fuentes" class="pill-group">
          <p>Fuente:</p>
          <div v-for="(label, l) in card.fuentes" :key="l" class="pill">
            {{ label }}
          </div>
        </div>
        <div v-if="card.autoras" class="pill-group">
          <p>Autores:</p>
          <div v-for="(label, l) in card.autoras" :key="l" class="pill">
            {{ label }}
          </div>
        </div>
        <div v-if="card.organizaciones" class="pill-group">
          <p>Organización:</p>
          <div v-for="(label, l) in card.organizaciones" :key="l" class="pill">
            {{ label }}
          </div>
        </div>
        <div v-if="card.conceptos" class="pill-group">
          <p>Conceptos relacionados:</p>
          <div v-for="(label, l) in card.conceptos" :key="l" class="pill">
            {{ label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import { mapMutations } from 'vuex'

const md = new MarkdownIt()

export default {
  computed: {
    card() {
      return this.$store.state.cardModal
    },
    descriptionMD() {
      return md.render(this.card.description)
    },
  },
  methods: {
    ...mapMutations(['setShowCardModal']),
    close() {
      this.setShowCardModal(false)
    },
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
