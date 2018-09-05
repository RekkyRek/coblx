const appPreData = window.localStorage.getItem('coblx_cards') ? JSON.parse(window.localStorage.getItem('coblx_cards')) : [{id: 0, title: 'Hello, Coblx!', code: 'log("Hello, Coblx!")', args: ''}]

const cards = (state = appPreData, action) => {
  if (action.type === 'CARD') {
    let newState = [...(handleCards(state, action))]
    window.localStorage.setItem('coblx_cards', JSON.stringify(newState))
    return newState
  }

  return state
}

const handleCards = (state, action) => {
  switch (action.action) {
    case 'NEW':
      return [...state, {...action.card, id: Math.random().toString(36).substr(2)}]
    case 'EDIT_TITLE':
      let editTitleCards = [ ...state ]
      editTitleCards[action.index].title = action.title
      return [...editTitleCards]
    case 'EDIT_CODE':
      let editCodeCards = [ ...state ]
      editCodeCards[action.index].code = action.code
      return [...editCodeCards]
    case 'EDIT_ARGS':
      let editArgsCards = [ ...state ]
      editArgsCards[action.index].args = action.args
      return [...editArgsCards]
    case 'REMOVE':
      let removeCards = [ ...state ]
      removeCards.splice(action.index, 1)
      return [...removeCards]
    default:
      return state
  }
}

module.exports = cards
