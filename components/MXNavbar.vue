<template>
  <header class="mx-navbar">
    <div class="container">
      <div class="brand">
        <img
          src="@/assets/img/logo-mexico.png"
          alt="logo de México"
          @click="$router.push('/')"
        />
      </div>
      <div class="navmenu">
        <div class="burger-button">
          <img
            class="burger"
            src="@/assets/icons/bars-white.svg"
            @click="open"
          />
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
    </div>
  </header>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  watch: {
    '$store.state.showOverlay'(val) {
      // console.log('watch showOverlay: ', val)
      this.setShowMXNavbarMenu(val)
    },
  },
  methods: {
    ...mapMutations(['setShowMXNavbarMenu']),
    open() {
      // console.log('toggle!')
      this.setShowMXNavbarMenu(!this.$store.state.showMXNavbarMenu)
    },
  },
}
</script>

<style lang="scss" scoped>
.mx-navbar {
  z-index: 100;
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
    padding: 16px 48px 8px 48px;
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
    height: 30px;
  }
}
.navmenu {
  display: flex;
  position: absolute;
  top: 4px;
  right: 4px;
  margin-left: 4px;
  margin-bottom: 4px;
  z-index: 99999999;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  ul {
    display: none;
    margin-top: 8px;
    padding: 0;
    li {
      display: flex;
      flex-direction: column;
      list-style: none;
      margin-top: 8px;
      margin-right: 16px;
      a {
        display: block;
        font-size: 16px;
        color: var(--color-dark);
        font-family: 'asapregular', 'HelveticaNeue-Light',
          'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial,
          'Lucida Grande', sans-serif;
        font-weight: 500;
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
