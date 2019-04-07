import React from 'react'
import { Container, Image } from 'semantic-ui-react'
import Logo from '../../images/logo.svg'
import ArticleList from './articleList.js'

class Home extends React.Component {
  render() {
    const styles = {
      heading: {
        margin: '0 0 20px 0',
        height: '300px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Rubik', sans-serif",
        backgroundColor: '#4ABDAC',
        color: 'white',
      },
    }

    return (
      <Container className="home-container" style={styles.container}>
        <div className="home-heading" style={styles.heading}>
          <Image className="logo" src={Logo} />
          <p>A simple and extensible blog platform</p>
        </div>
        <ArticleList />
      </Container>
    )
  }
}

export default Home