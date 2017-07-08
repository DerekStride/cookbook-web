import React, { Component } from 'react';
import { ApolloClient, ApolloProvider, createNetworkInterface, gql, graphql } from 'react-apollo';
import './App.css';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000/graphql'
});

const client = new ApolloClient({
  networkInterface: networkInterface,
  opts: {
    mode: 'no-cors',
  }
});

const MyQuery = gql`
    query {
      cookbooks(first: 3) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `;

class Cookbook extends Component {
  cookbooks() {
    return this.props.data.cookbooks.edges.map(
      (edge) => {
        let book = edge.node;
        return <li key={book.id}>{book.title}</li>
      }
    );
  }

  render() {
    if (this.props.data.networkStatus === 1) {
      return <div>Waiting</div>
    }
    return <ul>{this.cookbooks()}</ul>
  }
}

const CookbookWithData = graphql(MyQuery)(Cookbook);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <CookbookWithData />
      </ApolloProvider>
    );
  }
}



export default App;
