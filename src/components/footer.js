import React from 'react'

const Footer = () => {
  const styles = {
    container: {
      width: '100%',
      height: '150px',
      position: 'relative',
      bottom: '0',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }
  }

  return (
    <div className="footer-container" style={styles.container}>
      <a href="https://cosmicjs.com/add-bucket?import_bucket=5ca68130b364994aea821419"><img src="https://s3-us-west-2.amazonaws.com/cosmicjs/51fe54d0-4f6e-11e9-9f32-8d001da69630-powered-by-cosmicjs.svg" alt="cosmicjs-badge" /></a>
    </div>
  )
}

export default Footer