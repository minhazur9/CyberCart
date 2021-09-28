import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client'
import Navbar from './Components/Navbar/Navbar';
import Routes from './config/routes';



// The Apollo Client
const client = new ApolloClient({
  link: createUploadLink({
    uri: 'http://localhost:4000/graphql',
  }),
  cache: new InMemoryCache(),
})

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
    <ApolloProvider client={client}>
      <div className="App">
        <ThemeProvider theme={theme}>
          <Navbar />
          <Routes />
        </ThemeProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;
