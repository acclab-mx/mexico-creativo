<template>
  <div class="topic-selector">
    <div
      v-if="!showOptions"
      class="topic-selected"
      :class="[valor !== null ? 'border-' + valor.orden : 'card-default-bg']"
      @click="clear"
    >
      <p class="selected">
        {{ valor !== null ? valor.tema : 'Selecciona una opción' }}
      </p>
      <div v-if="valor !== null" class="action">
        <img class="trash" src="@/assets/icons/trash.svg" />
      </div>
    </div>
    <div v-if="showOptions" class="topic-options">
      <div
        v-for="topic in topics"
        :key="topic.id"
        class="topic-option"
        @click="select(topic)"
      >
        <div :class="border(topic.orden)">{{ topic.tema }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    topics: {
      default: [],
      required: true,
    },
  },
  data() {
    return {
      showOptions: false,
    }
  },
  computed: {
    valor() {
      return (
        this.$store.state.topicSelected || {
          orden: 0,
          tema: 'Selecciona una opción',
        }
      )
    },
  },
  methods: {
    select(topic) {
      console.log('topic selected: ', topic)
      this.showOptions = false
      this.$emit('input', topic)
    },
    clear() {
      console.log('clear')
      this.showOptions = true
    },
    border(id) {
      return `border-topic-${id}`
    },
  },
}
</script>

<style lang="scss" scoped>
.topic-selector {
  .topic-selected {
    display: flex;
    border-radius: 8px;
    margin-bottom: 16px;
    width: 100%;
    max-width: 436px;
    background-color: #e5e5e5;
    .selected {
      cursor: pointer;
      width: 100%;
      padding: 8px 16px;
      font-weight: 700;
    }
    .action {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px;
      background-color: rgba(0, 0, 0, 0.05);
      border-radius: 0 8px 8px 0;
      .trash {
        height: 32px;
      }
    }
  }
  .topic-options {
    z-index: 10;
    display: block;
    max-width: 436px;
    width: 100%;
    min-height: 60px;
    height: 100%;
    overflow-y: scroll;
    .topic-option {
      cursor: pointer;
      border-bottom: 1px solid white;
      display: flex;
      background-color: #e5e5e5;
      border-radius: 8px;
      margin-top: 8px;
      div {
        display: block;
        padding: 8px;
        border-radius: 8px;
      }
    }
  }
}
</style>
