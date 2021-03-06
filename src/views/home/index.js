import React from 'react'
import { Container, Image, Input } from 'semantic-ui-react'
import Logo from '../../images/logo.svg'
import ArticleList from './articleList.js'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      search: '',
    }
    this.handleInput = this.handleInput.bind(this)
  }

  render() {
    const styles = {
      heading: {
        margin: '0 0 20px 0',
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Rubik', sans-serif",
        backgroundColor: '#4ABDAC',
        color: 'white',
      },
      headingTitle: {
        marginBottom: '30px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }
    }

    return (
      <Container className="home-container" style={styles.container}>
        <div className="home-heading" style={styles.heading}>
          <div style={styles.headingTitle}>
            <Image className="logo" src={Logo} />
            <p>A simple and extensible blog platform</p>
          </div>
          <Input
            placeholder="Search..."
            name="search"
            value={this.state.search}
            onChange={this.handleInput}
          />
        </div>
        <ArticleList
          search={this.state.search}
        />
      </Container>
    )
  }

  handleInput(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
}

export default Home