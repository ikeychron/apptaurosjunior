import React from 'react'
import ReactDOM from 'react-dom'

// React-Redux
import { Provider } from 'react-redux'
import store from './store/store'

import App from './App'
import './main.scss';

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)