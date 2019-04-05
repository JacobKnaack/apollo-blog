import React from 'react'
import { Container } from 'semantic-ui-react'
import ArticleList from './articleList.js'

class Home extends React.Component {
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
      title: {
        fontSize: '2rem',
      }
    }

    return (
      <Container className="home-container" style={styles.container}>
        <div className="home-heading" style={styles.heading}>
          <h1 style={styles.title}>Apollo Blog</h1>
          <p>A simple and extensible blog platform</p>
        </div>
        <ArticleList />
      </Container>
    )
  }
}

export default Home