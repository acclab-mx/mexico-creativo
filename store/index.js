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

export default {
  state: {
    showOverlay: false,
    showMXNavbarMenu: false,
    showPlaygroundNavbarMenu: false,
    showCardModal: false,
    cardModal: {},
    topics: [],
    topicSelected: null,
    offsets: {
      propuestas: '',
      citas: '',
      estudios: '',
      conceptos: '',
    },
    cards: [],
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
    setCards(state, { cards, trasponer }) {
      // console.log('setCards: ', cards, ', trasponer: ', trasponer)
      // const trasp = traspuesta(cards, 3);
      // console.log('trasp: ', trasp)
      state.cards = cards // trasponer ? trasp : cards
    },
    addCards(state, { cards, trasponer }) {
      state.cards = [...state.cards, ...cards] // trasponer
      // ? [...state.cards, ...traspuesta(cards, 3)]
      // : [...state.cards, ...cards]
    },
    setOffsets(state, value) {
      state.offsets = value
    },
  },
}
