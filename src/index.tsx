import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider as RebassProvider } from 'rebass';
import { Provider as MobxProvider } from 'mobx-react';

import App from './App';
import client from './graphql/client';
import MediaItemsStore from './store/MediaItemsStore';
import { getMediaItems } from './utils/localstorage-utils';

const mediaItemStore = new MediaItemsStore(getMediaItems());

ReactDOM.render(
  <ApolloProvider client={client}>
    <RebassProvider>
      <MobxProvider mediaItemStore={mediaItemStore}>
        <App />
      </MobxProvider>
    </RebassProvider>
  </ApolloProvider>,
  document.getElementById('app'),
);
