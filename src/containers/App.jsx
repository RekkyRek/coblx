import React from 'react'
import { Route } from 'react-router-dom'

import Cards from './Cards.jsx'

import '../style/main.sass'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Route route='/' component={Cards} />
      </div>
    )
  }
}
