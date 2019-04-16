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
  constructor() {
    super()
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    }
    this.handleResize = this.handleResize.bind(this)
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Header />
          <div className="router-content">
            <Route exact path="/" component={Home} />
            <Route path="/article/:articleName" render={(props) => <Article {...props} windowWidth={this.state.windowWidth} />} />
          </div>
          <Footer />
        </BrowserRouter>
      </ApolloProvider>
    )
  }

  handleResize() {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight })
  }
}

export default App
