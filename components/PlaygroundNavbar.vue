<template>
  <div class="mx-navbar">
    <div class="container header">
      <div class="container navigation">
        <div class="back" @click="$router.back()">
          <img class="arrow-left" src="@/assets/icons/arrow-left.svg" />
          <p>Volver</p>
        </div>
        <div class="back" @click="$router.push('/')">
          <img
            class="arrow-left"
            style="float: left"
            src="@/assets/icons/bars-white.svg"
          />
          <p>Ir al inicio</p>
        </div>
      </div>
      <div class="burger-button">
        <img class="burger" src="@/assets/icons/filter.svg" @click="open" />
      </div>
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
  margin-top: 58px;
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
      padding: 16px 24px 16px 16px;
      .description {
        margin: 0;
        padding: 8px 0;
        max-width: 40em;
        font-size: 14px;
      }
    }
    &.navigation {
      display: flex;
      width: auto;
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

.burger {
  display: block;
  height: 32px;
}

@media (min-width: 760px) {
  /* ljhad */
  .burger {
    height: 32px;
  }
}
</style>
