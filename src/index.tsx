import React from 'react';
import { render } from 'react-dom';
import App from './App';

import { token } from './conf';

import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql'
});

const authLink = setContext(() => ({
  headers: {
    authorization: `Bearer ${token}`
  }
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const rootNode = document.getElementById('root');

render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  rootNode
);
