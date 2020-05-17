import React from 'react';
// import logo from './logo.svg';
import './App.css';

import Search from './components/Search';
import Products from './components/Products';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        
      </header>
      <Container maxWidth="xl">
        <Search />
        <Products />
      </Container>
    </div>
  );
}

export default App;
