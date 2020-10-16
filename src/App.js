import React from 'react';
import logo from './logo.svg';
import './App.css';
import Floatingtool from './components/Floatingtool' 
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Floatingtool />
      <Tooltip title="Add" placement="top">
        <Button>right-end</Button>
      </Tooltip>
    </div>
  );
}

export default App;
