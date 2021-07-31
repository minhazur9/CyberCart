import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@material-ui/core';
import Navbar from './Components/Navbar/Navbar';
import Routes from './config/routes';

// The Material UI Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#2d78f0"
    },
  },
});

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Navbar />
        <Routes />
      </ThemeProvider>
    </div>
  );
}

export default App;
