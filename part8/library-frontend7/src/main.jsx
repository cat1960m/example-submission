import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloProvider } from "@apollo/client/react";

import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'


const authLink = new SetContextLink((prevContext) => {
  const token = localStorage.getItem("phonenumbers-user-token");
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql", // 👈 make sure this is your GraphQL endpoint
});

const wsLink = new GraphQLWsLink(
  createClient({ url: 'ws://localhost:4000' })
)

const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
 link: splitLink,
  connectToDevTools: true,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);