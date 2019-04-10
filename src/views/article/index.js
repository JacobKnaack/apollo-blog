import React from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Container, Loader, Label, Image } from 'semantic-ui-react'
import { formatDate, findKeyInArray } from '../../lib/util.js'
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
      metafields {
        key
        value
      }
    }
  }
`


const Article = ({ match }) => {
  const read_key = process.env.REACT_APP_COSMIC_JS_READ_KEY
  const article_slug = match.params.articleName

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    article: {
      width: '95%',
      maxWidth: '900px',
      margin: '20px auto',
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
      maxWidth: '900px',
      maxHeight: '500px',
    },
  }


  return (
    <Query query={GET_ARTICLE_BY_SLUG} variables={{ read_key, slug: article_slug }}>
      {({ loading, error, data }) => {
        if (loading) return <Loader active inline="centered" size="massive">...loading</Loader>
        if (error) return `Error! ${error.message}`
        const image = findKeyInArray({ key: 'image', array: data.object.metafields })
        const author = findKeyInArray({ key: 'author', array: data.object.metafields })
        let categories = findKeyInArray({ key: 'categories', array: data.object.metafields })
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
              {image ? <Image src={`https://cosmic-s3.imgix.net/${image}`} style={styles.image} /> : null}
              {categories
                ? <div> {categories.map(category => <Label key={category}>{category.replace(/,/g, '')}</Label>)} </div>
                : null
              }
              <AuthorDisplay display="card" authorId={author} />
            </div>
            <div
              className="article"
              dangerouslySetInnerHTML={{ __html: data.object.content }}
              style={styles.article}
            />
          </Container>
        )
      }}
    </Query>
  )
}

export default Article
