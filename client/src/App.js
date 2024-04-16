import React, { Component, Suspense } from 'react'

import './scss/style.scss'

import Router from './routes/Router'

class App extends Component {
  render() {
    return (
      <Router />
    )
  }
}

export default App

