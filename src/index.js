import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import { Provider } from 'react-redux'
// configureStore is no longer exported by default, so make that change here
import { configureStore } from './store/configureStore'

// Create the store
const store = configureStore()

// Wrap in Provider to connect React to Redux
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('app')
)
