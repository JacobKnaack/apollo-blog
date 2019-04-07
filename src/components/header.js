import React from 'react'
import { Container, Image } from 'semantic-ui-react'
import MenuIcon from '../images/menuIcon.svg'

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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#4ABDAC',
        transition: '0.5s ease-in-out',
      },
      title: {
        lineHeight: '50px',
        color: 'white',
        textAlign: 'center',
        margin: '0 15px',
      },
      icon: {
        width: '40px',
      }
    }

    if (this.state.visible) {
      styles.container.top = '0'
    }
    return (
      <Container className='header-container' style={styles.container}>
        <Image src={MenuIcon} style={styles.icon} />
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