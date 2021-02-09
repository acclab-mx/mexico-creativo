<template>
  <div class="componente-selector">
    <div
      v-if="!showOptions"
      class="componente-selected"
      :class="[
        valor !== null ? 'border-componente-' + valor.orden : 'card-default-bg',
      ]"
      @click="clear"
    >
      <p class="selected">
        {{ valor !== null ? valor.nombre : 'Selecciona una opción' }}
      </p>
      <div v-if="valor !== null" class="action">
        <img class="trash" src="@/assets/icons/trash.svg" />
      </div>
    </div>
    <div v-if="showOptions" class="componente-options">
      <div
        v-for="componente in componentes"
        :key="componente.id"
        class="componente-option"
        @click="select(componente)"
      >
        <div :class="border(componente.orden)">{{ componente.nombre }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    componentes: {
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
        this.$store.state.componenteSelected || {
          orden: 0,
          nombre: 'Selecciona una opción',
        }
      )
    },
  },
  methods: {
    select(componente) {
      console.log('componente selected: ', componente)
      this.showOptions = false
      this.$emit('input', componente)
    },
    clear() {
      console.log('clear')
      this.showOptions = true
    },
    border(id) {
      return `border-componente-${id}`
    },
  },
}
</script>

<style lang="scss" scoped>
.componente-selector {
  .componente-selected {
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
  .componente-options {
    z-index: 10;
    display: block;
    max-width: 436px;
    width: 100%;
    min-height: 60px;
    height: 100%;
    overflow-y: scroll;
    .componente-option {
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
