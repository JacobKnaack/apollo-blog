import React from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Container, Loader, Label, Image } from 'semantic-ui-react'
import { formatDate } from '../../lib/util.js'
import Logo from '../../images/logo.svg'
import AuthorDisplay from '../../components/authorDisplay'
import './_article.css'

const GET_ARTICLE_BY_SLUG = gql`
  query Article($read_key: String!, $slug: String!) {
    object(bucket_slug: "apollo-blog", read_key: $read_key, slug: $slug ) {
      _id
      created_at
      title
      content
      metadata
    }
  }
`


const Article = ({ match, windowWidth }) => {
  const read_key = process.env.REACT_APP_COSMIC_JS_READ_KEY
  const article_slug = match.params.articleName

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    articleContainer: {
      width: '95%',
      maxWidth: '1000px',
      margin: '20px auto',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    article: {
      width: '70%',
      margin: '-20px 0 0 20px',
      fontFamily: '"Quicksand", sans-serif',
    },
    heading: {
      height: '100px',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#4ABDAC',
    },
    headingTitle: {
      color: 'white',
    },
    details: {
      width: '100%',
      minHeight: '200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    lineOne: {
      width: '95%',
      maxWidth: '900px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    title: {
      width: '50%',
      fontSize: '250%',
      textAlign: 'right',
      margin: 'auto 20px',
      lineHeight: '35px',
    },
    date: {
      fontSize: '130%',
      lineHeight: '20px',
    },
    image: {
      maxWidth: '950px',
      maxHeight: '500px',
    },
  }
  if (windowWidth < 700) {
    styles.articleContainer.flexDirection = 'column'
    styles.articleContainer.alignItems = 'center'
    styles.article.width = '95%'
  }


  return (
    <Query query={GET_ARTICLE_BY_SLUG} variables={{ read_key, slug: article_slug }}>
      {({ loading, error, data }) => {
        if (loading) return <Loader active inline="centered" size="massive">...loading</Loader>
        if (error) return `Error! ${error.message}`
        let { image, author, categories } = data.object.metadata
        if (categories) categories = categories.split(' ')
        return (
          <Container>
            <div className="post-heading" style={styles.heading}>
              <Link to="/" className="header-btn">
                <Image className="logo small" src={Logo} />
              </Link>
            </div>
            <div className="post-details" style={styles.details}>
              <div style={styles.lineOne}>
                <h4 className="post-title" style={styles.title}>{data.object.title}</h4>
                <h6 className="post-date" style={styles.date}>{formatDate(data.object.created_at)}</h6>
              </div>
              {categories
                ? <div> {categories.map(category => <Label key={category}>{category.replace(/,/g, '')}</Label>)} </div>
                : null
              }
              {image ? <Image src={image.url} style={styles.image} /> : null}
            </div>
            <div style={styles.articleContainer}>
              <AuthorDisplay
                display="card"
                author={author}
                authorId={author._id}
              />
              <div
                className="article"
                dangerouslySetInnerHTML={{ __html: data.object.content }}
                style={styles.article}
              />
            </div>
          </Container>
        )
      }}
    </Query>
  )
}

export default Article
