<template>
  <div class="mx-navbar-menu">
    <div class="close">
      <img class="burger" src="@/assets/icons/cross.svg" @click="close" />
    </div>
    <ul>
      <li>
        <a class="button" href="https://www.gob.mx/tramites">Trámites</a>
      </li>
      <li>
        <a class="button" href="https://www.gob.mx/gobierno">Gobierno</a>
      </li>
      <li>
        <a class="button" href="https://www.gob.mx/busqueda">
          <img height="18px" src="@/assets/icons/search-white.svg" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['setShowMXNavbarMenu']),
    close() {
      // console.log('close')
      this.setShowMXNavbarMenu(false)
    },
  },
}
</script>

<style lang="scss" scoped>
.mx-navbar-menu {
  position: fixed;
  top: 4px;
  right: 8px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 24px;
  background-color: var(--color-light);
  border-radius: 8px;
  .close {
    display: block;
    width: 100%;
    text-align: right;
    .burger {
      display: inline-block;
      height: 32px;
    }
  }
  ul {
    li {
      margin-top: 8px;
      width: 100%;
      a {
        width: 100%;
        display: inline-block;
        padding: 8px 16px;
        background-color: var(--color-dark);
        border-radius: 8px;
        color: var(--color-light);
      }
    }
  }
}

@media (min-width: 760px) {
  .mx-navbar-menu {
    display: none;
  }
}
</style>
