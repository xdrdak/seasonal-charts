import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider as RebassProvider } from 'rebass';

import App from './App';
import client from './graphql/client';

ReactDOM.render(
  <ApolloProvider client={client}>
    <RebassProvider>
      <App />
    </RebassProvider>
  </ApolloProvider>,
  document.getElementById('app'),
);
