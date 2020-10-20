import React from 'react'
import logo from './logo.svg'
import './App.css'
import Floatingtool from './components/Floatingtool'
import TabLinks from './components/TabLinks'

import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const theme2 = createMuiTheme({
  typography: {
    fontFamily: 'Asap',
    }
});

function App() {
  return (
    <ThemeProvider theme={theme2}>
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
