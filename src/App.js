import React from 'react'
import logo from './logo.svg'
import './App.css'
import Floatingtool from './components/Floatingtool'
import TabLinks from './components/TabLinks'

import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import reducers from 'reducers'
import sagas from 'sagas'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]
if (process.env.REACT_APP_REDUX_LOGGER === 'true') {
  middlewares.push(logger)
}
const store = createStore(reducers, applyMiddleware(...middlewares))

sagaMiddleware.run(sagas)

const theme2 = createMuiTheme({
  typography: {
    fontFamily: 'Asap',

    h2: {
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontSize: '1.5rem',
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
      primary: '#fff',
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

const sources = [
  'https://en.wikipedia.org/',
  'https://ondamedia.cl/#/',
  'https://www.scirp.org/',
]

function App() {
  const [index, setIndex] = React.useState(0)
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme2}>
        <CssBaseline />
        <iframe
          style={{ height: '100vh', width: '100vw', border: 0 }}
          title='exampleWiki'
          src={sources[index]}
        />
        <Floatingtool />
        <Button
          style={{ position: 'fixed', top: '1%', left: '30%', zIndex: '2000' }}
          onClick={() => setIndex(index + 1 >= sources.length ? 0 : index + 1)}
          color='primary'
          variant='contained'
        >
          Next page
        </Button>
      </ThemeProvider>
    </Provider>
  )
}

export default App
