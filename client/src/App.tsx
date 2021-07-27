import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Routes from './config/routes';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes />
    </div>
  );
}

export default App;
