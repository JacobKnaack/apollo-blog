import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Container, Label, Image, Segment } from 'semantic-ui-react'
import { formatDate, findKeyInArray } from '../../lib/util.js'

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
    article: {
      width: '70%',
      maxWidth: '950px',
      margin: '20px auto',
    },
    heading: {
      height: '100px',
      width: '100%',
      backgroundColor: '#4ABDAC',
    },
    headingTitle: {
      color: 'white',
    },
    details: {
      height: '200px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    lineOne: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      width: '70%',
      maxWidth: '950px',
    },
    title: {
      fontSize: '200%',
    },
    date: {
      fontSize: '130%',
    }
  }


  return (
    <Query query={GET_ARTICLE_BY_SLUG} variables={{ read_key, slug: article_slug }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading..."
        if (error) return `Error! ${error.message}`
        const image = findKeyInArray({ key: 'image', array: data.object.metafields })
        let categories = findKeyInArray({ key: 'categories', array: data.object.metafields })
        if (categories) categories = categories.split(' ')

        return (
          <Container>
            <div className="post-heading" style={styles.heading}>
              <h1 style={styles.headingTitle}>Apollo Blog</h1>
            </div>
            <div className="post-details" style={styles.details}>
              <div style={styles.lineOne}>
                <h4 className="post-title" style={styles.title}>{data.object.title}</h4>
                <h6 className="post-date" style={styles.date}>{formatDate(data.object.created_at)}</h6>
              </div>
              {image ? <Image src={`https://cosmic-s3.imgix.net/${image}`} /> : null}
              {categories
                ? <div>
                  {categories.map(category => <Label key={category}>{category.replace(/,/g, '')}</Label>)}
                </div>
                : null
              }
            </div>
            <Segment
              className="post-content-container"
              dangerouslySetInnerHTML={{ __html: data.object.content }}
              raised
              style={styles.article}
            />
          </Container>
        )
      }}
    </Query>
  )
}

export default Article
