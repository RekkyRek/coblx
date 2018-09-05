import { connect } from 'react-redux'
import Cards from '../components/Cards.jsx'

import { newCard, removeCard, updateTitle, updateCode, updateArguments } from '../actions'

const mapStateToProps = state => {
  return {
    cards: state.cards
  }
}

const mapDispatchToProps = dispatch => {
  return {
    newCard: (card) => {
      dispatch(newCard(card))
    },
    removeCard: (index) => {
      dispatch(removeCard(index))
    },
    editTitle: (index, title) => {
      dispatch(updateTitle(index, title))
    },
    editCode: (index, code) => {
      dispatch(updateCode(index, code))
    },
    editArgs: (index, args) => {
      dispatch(updateArguments(index, args))
    }
  }
}

const HomeConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cards)

export default HomeConnect
