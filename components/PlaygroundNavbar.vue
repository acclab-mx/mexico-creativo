<template>
  <div class="mx-navbar">
    <div class="container header">
      <div class="brand" @click="$router.push('/')">
        <h3>México Creativo</h3>
        <h2>Playground</h2>
      </div>
      <div class="burger-button">
        <img class="burger" src="@/assets/icons/filter.svg" @click="open" />
      </div>
    </div>
    <div class="container navigation">
      <nuxt-link to="/" class="back">
        <img class="arrow-left" src="@/assets/icons/arrow-left.svg" />
        <p>Volver</p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      showMenu: false,
    }
  },
  watch: {
    '$store.state.showOverlay'(val) {
      // console.log('watch showOverlay: ', val)
      if (!val) {
        this.setShowPlaygroundNavbarMenu(false)
        this.setShowCardModal(false)
      }
    },
  },
  methods: {
    ...mapMutations(['setShowPlaygroundNavbarMenu', 'setShowCardModal']),
    open() {
      // console.log('toggle!')
      this.setShowPlaygroundNavbarMenu(true)
    },
  },
}
</script>

<style lang="scss" scoped>
.mx-navbar {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  color: var(--color-dark);
  background-color: var(--color-light);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1220px;
    width: 100%;
    &.header {
      padding: 16px 24px 0 16px;
    }
    &.navigation {
      padding: 8px 16px 8px 16px;
    }
    .back {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .arrow-left {
        width: 32px;
      }
      p {
        display: inline-block;
        margin: 0;
        margin-left: 8px;
        color: var(--color-dark);
      }
    }
  }
}

.hidden {
  display: none;
}

.white {
  background-color: white;
}

.brand {
  h2,
  h3 {
    margin: 0;
    padding: 0;
    line-height: 1;
  }
}
.burger {
  display: block;
  height: 32px;
}

@media (min-width: 760px) {
  /* ljhad */
}
</style>
