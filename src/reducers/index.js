import { combineReducers } from 'redux'
import cards from './cards'

let cardsApp

try {
  cardsApp = combineReducers({
    cards
  })
} catch (e) {

}

export default cardsApp
