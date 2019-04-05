import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Container, Card, Image, Label, Loader } from 'semantic-ui-react'
import { formatDate, findKeyInArray } from '../../lib/util.js'

const GET_ARTICLES = gql`
  query Articles($read_key: String!) {
    objectsByType(bucket_slug: "apollo-blog", type_slug: "articles", read_key: $read_key ) {
      _id
      slug
      created_at 
      title
      type_slug
      metafields {
        key
        value
      }
    }
  }
`

const ArticleList = () => {
  const read_key = process.env.REACT_APP_COSMIC_JS_READ_KEY
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
    },
    title: {
      fontSize: '200%',
      margin: '10px 0',
    }
  }

  return (
    <Query query={GET_ARTICLES} variables={{ read_key }}>
      {({ loading, error, data }) => {
        if (loading) return <Loader active inline="centered" size="massive">...loading</Loader>
        if (error) return `Error! ${error.message}`
        return (
          <Container className="articleList-container" style={styles.container}>
            {data.objectsByType.map(article => {
              const summary = findKeyInArray({ key: 'summary', array: article.metafields })
              const image = findKeyInArray({ key: 'image', array: article.metafields })
              let categories = findKeyInArray({ key: 'categories', array: article.metafields })
              if (categories) categories = categories.split(' ')

              return (
                <Link key={article._id} to={`/article/${article.slug}`}>
                  <Card>
                    <Card.Content>
                      {image ? <Image src={`https://cosmic-s3.imgix.net/${image}`} /> : null}
                      <Card.Header style={styles.title}>{article.title}</Card.Header>
                      <Card.Meta>
                        <span className='date'>{formatDate(article.created_at)}</span>
                      </Card.Meta>
                      <Card.Description>{summary}</Card.Description>
                    </Card.Content>
                    {categories
                      ? <Card.Content extra>
                        {categories.map(category => <Label key={category}>{category.replace(/,/g, '')}</Label>)}
                      </Card.Content>
                      : null
                    }
                  </Card>
                </Link>
              )
            })}
          </Container>
        )
      }}
    </Query>
  )
}

export default ArticleList