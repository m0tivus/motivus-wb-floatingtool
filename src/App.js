import React from 'react'
import './App.css'
import Floatingtool from './components/Floatingtool'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import reducers from 'reducers'
import sagas from 'sagas'

import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles'

const generateClassName = createGenerateClassName({
  productionPrefix: 'motivus-widget',
  disableGlobal: true,
})

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]
if (process.env.REACT_APP_REDUX_LOGGER === 'true') {
  middlewares.push(logger)
}
const store = createStore(reducers, applyMiddleware(...middlewares))

sagaMiddleware.run(sagas)

console.log(process.env.REACT_APP_VERSION)

// var Motivus = window.Motivus || {}
// console.log('client_id', Motivus.client_id)

const theme2 = createMuiTheme({
  typography: {
    fontFamily: 'Asap',
    color: 'white !important',

    h2: {
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontSize: '1.3rem',
      lineHeight: 1.334,
      letterSpacing: '0em',
    },
    h3: {
      fontWeight: '600',
      fontStyle: 'italic',
      fontSize: '1.15rem',
      lineHeight: 1.2,
      letterSpacing: '0em',
    },

    h1: {
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontSize: '1.7rem',
      lineHeight: 1.334,
      letterSpacing: '0em',
    },

    h6: {
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontSize: '1rem',
      lineHeight: 1.334,
      letterSpacing: '0em',
    },
  },

  palette: {
    primary: {
      light: '#9455fe',
      main: '#5d25ca',
      dark: '#1a0098',
      contrastText: '#fff',
    },

    secondary: {
      light: '#ff8fff',
      main: '#cc5de7',
      dark: '#9828b4',
      contrastText: '#fff',
    },

    background: {
      paper: '#9468e9',
      default: '#613bb6',
    },

    text: {
      primary: '#fff !important',
    },
  },
  overrides: {
    // Style sheet name ⚛️
    MuiTab: {
      // Name of the rule
      textColorSecondary: {
        // Some CSS
        color: '#aaa',
      },
    },
  },
})

function App() {
  return (
    <Provider store={store}>
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={theme2}>
          <Floatingtool />
        </ThemeProvider>
      </StylesProvider>
    </Provider>
  )
}

export default App
