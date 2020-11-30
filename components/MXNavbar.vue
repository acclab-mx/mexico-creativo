<template>
  <header class="mx-navbar">
    <div class="container">
      <div class="brand">
        <img src="@/assets/img/logo-mexico.png" />
      </div>
      <div class="navmenu" :class="[{ white: showMenu }]">
        <div class="burger-button">
          <img
            v-if="showMenu"
            class="cross"
            src="@/assets/icons/cross.svg"
            @click="toggle"
          />
          <img
            v-else
            class="burger"
            src="@/assets/icons/bars-white.svg"
            @click="toggle"
          />
        </div>
        <ul :class="{ hidden: !showMenu }">
          <li><a class="button" href="#">Descargar reportes</a></li>
          <li><a class="button" href="#">Descargar base de datos</a></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
    }
  },
  methods: {
    toggle() {
      console.log('toggle!')
      this.showMenu = !this.showMenu
    },
  },
}
</script>

<style lang="scss" scoped>
.mx-navbar {
  position: fixed;
  display: flex;
  top: 0;
  width: 100vw;
  color: var(--color-light);
  background-color: var(--color-brand-green);
  justify-content: center;
  .container {
    display: flex;
    justify-content: space-between;
    max-width: 1220px;
    width: 100%;
    padding: 16px 24px;
  }
}

.hidden {
  display: none;
}

.white {
  background-color: white;
}

.brand {
  img {
    max-height: 40px;
  }
}
.navmenu {
  position: absolute;
  top: 4px;
  right: 4px;
  margin-left: 4px;
  margin-bottom: 4px;
  z-index: 40;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  ul {
    margin-top: 8px;
    padding: 0;
    column-gap: 16px;
    li {
      display: flex;
      flex-direction: column;
      list-style: none;
      margin-top: 8px;
      a {
        display: block;
        font-size: 18px;
        color: var(--color-dark);
        text-decoration: none;
        &.button {
          padding: 8px 16px;
          border-radius: 8px;
          color: white;
          background-color: var(--color-brand-dark);
        }
      }
    }
  }
  .burger-button {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
  .burger {
    display: block;
    height: 32px;
  }
  .cross {
    display: block;
    height: 24px;
  }
}

@media (min-width: 760px) {
  .brand img {
    max-height: 60px;
  }
  .navmenu {
    display: flex;
    justify-content: center;
    position: inherit;
    background-color: inherit;
    padding: 0;
    ul {
      margin-top: 0;
      display: flex;
      align-items: center;
      li {
        margin-top: 0;
        a {
          color: white;
          &.button {
            padding: 4px;
            background-color: inherit;
          }
        }
      }
    }
    .burger,
    .cross {
      display: none;
    }
  }
}
</style>
