import React from 'react'
import logo from './logo.svg'
import './App.css'
import Floatingtool from './components/Floatingtool'
import TabLinks from './components/TabLinks'

import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

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

function App() {
  return (
    <ThemeProvider theme={theme2}>
      <CssBaseline />
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
        </header>
        <Floatingtool />
        <Tooltip title='Add' placement='top'>
          <Button>right-end</Button>
        </Tooltip>
      </div>
    </ThemeProvider>
  )
}

export default App
