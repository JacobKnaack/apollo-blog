import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import 'semantic-ui-css/semantic.min.css'

import Home from './views/home'
import Article from './views/article'
import Header from './components/header.js'
import Footer from './components/footer.js'

const client = new ApolloClient({
  uri: "https://graphql.cosmicjs.com/v1"
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Header />
          <div className="router-content">
            <Route exact path="/" component={Home} />
            <Route path="/article/:articleName" component={Article} />
          </div>
          <Footer />
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}

export default App
