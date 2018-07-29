import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
});

export default client;
