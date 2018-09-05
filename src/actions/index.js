export const newCard = (card) => {
  return {
    type: 'CARD',
    action: 'NEW',
    card: {
      title: 'Hello, Coblx!',
      code: 'log("Hello, Coblx!")'
    }
  }
}

export const updateTitle = (index, title) => {
  return {
    type: 'CARD',
    action: 'EDIT_TITLE',
    index,
    title
  }
}

export const updateCode = (index, code) => {
  return {
    type: 'CARD',
    action: 'EDIT_CODE',
    index,
    code
  }
}

export const updateArguments = (index, args) => {
  return {
    type: 'CARD',
    action: 'EDIT_ARGS',
    index,
    args
  }
}

export const removeCard = (index) => {
  return {
    type: 'CARD',
    action: 'REMOVE',
    index
  }
}
