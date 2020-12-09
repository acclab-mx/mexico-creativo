/* const traspuesta = (list, cols) => {
  function* chunks(arr, n) {
    for (let i = 0; i < arr.length; i += n) {
      yield arr.slice(i, i + n)
    }
  }

  const table = [...chunks(list, cols)]

  const output = []

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < table.length; j++) {
      output.push(table[j][i])
    }
  }

  return output.filter((i) => i)
} */
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
    topics: [],
    topicSelected: null,
    offsets: {
      propuestas: '',
      citas: '',
      estudios: '',
      conceptos: '',
    },
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
    setTopics(state, value) {
      state.topics = value
    },
    setTopicSelected(state, value) {
      state.topicSelected = value
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
    setOffsets(state, offsets) {
      console.log('setOffsets: ', offsets)
      for (const value in offsets) {
        // solo actualizar un offset si es valido (evita reiniciar offsets)
        if (offsets[value] && state.offsets[value] !== 'end') {
          state.offsets[value] = offsets[value]
        } else {
          console.log('no se actualiza offset: ', value, offsets[value])
        }
      }
    },
    clearOffsets(state) {
      console.log('clearOffsets!')
      state.cards = [[], [], []]
      state.offsets = {
        propuestas: '',
        citas: '',
        estudios: '',
        conceptos: '',
      }
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
