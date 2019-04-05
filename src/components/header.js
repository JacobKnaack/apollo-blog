import React from 'react'
import { Container } from 'semantic-ui-react'

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const styles = {
      container: {
        position: 'fixed',
        zIndex: '100',
        height: '50px',
        width: '100%',
        top: '-50px',
        left: '0',
        backgroundColor: '#4ABDAC',
        transition: '0.5s ease-in-out',
      },
      title: {
        lineHeight: '50px',
        color: '#4ABDAC',
        textAlign: 'center',
      }
    }

    if (this.state.visible) {
      styles.container.top = '0'
      styles.title.color = 'white'
    }
    return (
      <Container className='header-container' style={styles.container}>
        <h5 style={styles.title}>Apollo Blog</h5>
      </Container>
    )
  }

  handleScroll() {
    const scrollTop = window.pageYOffset
    if (scrollTop > 100) {
      this.setState({ visible: true })
    } else {
      this.setState({ visible: false })
    }
  }
}

export default Header