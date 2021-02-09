const isMobile = () => (process.client ? window.screen.width < 760 : true)

const getColumnSizes = (className) => {
  const columnElements = process.client
    ? Array.from(document.getElementsByClassName(className))
    : []
  const result = columnElements.map(
    (column) => column.getBoundingClientRect().height
  )
  return result
}

const getMinColumnIndex = () => {
  const columnsSizes = getColumnSizes('cards-column')
  const minColumn = Math.min(...columnsSizes)
  const result = columnsSizes.indexOf(minColumn)
  return result >= 0 ? result : 0
}

const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export default {
  state: {
    showOverlay: false,
    showMXNavbarMenu: false,
    showPlaygroundNavbarMenu: false,
    showCardModal: false,
    cardModal: null,
    componentes: [],
    componenteSelected: null,
    offset: null,
    cards: [[], [], []],
  },
  mutations: {
    setOverlay(state, value) {
      state.showOverlay = value
    },
    openOverlay(state) {
      state.showOverlay = true
    },
    closeOverlay(state) {
      state.showOverlay = false
    },
    setShowMXNavbarMenu(state, value) {
      state.showMXNavbarMenu = value
      state.showOverlay = value
    },
    setShowPlaygroundNavbarMenu(state, value) {
      state.showPlaygroundNavbarMenu = value
      state.showOverlay = value
    },
    setShowCardModal(state, value) {
      state.showCardModal = value
      state.showOverlay = value
    },
    setCardModal(state, value) {
      state.cardModal = value
    },
    setComponentes(state, value) {
      state.componentes = value
    },
    setComponenteSelected(state, value) {
      state.componenteSelected = value
    },
    clearComponenteSelected(state) {
      state.componenteSelected = null
    },
    setCards(state, cards) {
      state.cards = cards
    },
    addCard(state, { card, columnIndex }) {
      state.cards[columnIndex].push(card)
    },
    clearCards(state) {
      state.cards = [[], [], []]
    },
    setOffset(state, offset) {
      console.log('setOffset: ', offset)
      state.offset = offset
    },
    clearOffset(state) {
      console.log('clearOffset!')
      state.cards = [[], [], []]
      state.offset = null
    },
  },
  actions: {
    async setCards({ commit, state }, cards) {
      if (isMobile()) {
        commit('setCards', [[...cards], [], []])
      } else {
        commit('setCards', [[], [], []])
        for (let i = 0; i < cards.length; i++) {
          await delay(1)
          const columnIndex = getMinColumnIndex()
          commit('addCard', { card: cards[i], columnIndex })
        }
      }
    },
    async addCards({ commit, state }, cards) {
      if (isMobile()) {
        commit('setCards', [[...state.cards[0], ...cards], [], []])
      } else {
        for (let i = 0; i < cards.length; i++) {
          await delay(100)
          const columnIndex = getMinColumnIndex()
          commit('addCard', { card: cards[i], columnIndex })
        }
      }
    },
    async fetchCard({ commit }, cardId) {
      const response = await this.$axios.get(`/api/card?cardId=${cardId}`)
      console.log('fetchCard response: ', response.data)
      commit('setCardModal', response.data)
    },
  },
}
