import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Container, Card, Image, Label, Loader } from 'semantic-ui-react'
import AuthorDisplay from '../../components/authorDisplay'
import { formatDate } from '../../lib/util.js'

const GET_ARTICLES = gql`
  query Articles($read_key: String!) {
    objectsByType(bucket_slug: "apollo-blog", type_slug: "articles", read_key: $read_key ) {
      _id
      slug
      created_at 
      title
      type_slug
      metadata
    }
  }
`

class ArticleList extends React.Component {
  render() {
    const { data: { loading, error, objectsByType } } = this.props
    const styles = {
      container: {
        minHeight: 'calc(100vh - 500px)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      },
      title: {
        fontSize: '200%',
        margin: '10px 0',
      },
      card: {
        minWidth: '350px',
      },
      summary: {
        fontSize: '120%',
        lineHeight: '25px',
      }
    }
    if (loading) return <Loader active inline="centered" size="massive">...loading</Loader>
    if (error) return `Error! ${error.message}`
    return (
      <Container className="articleList-container" style={styles.container}>
        {this.filterPostsByKeywords(objectsByType).map(article => {
          let { summary, image, categories, author } = article.metadata
          if (categories) categories = categories.split(' ')

          return (
            <Link key={article._id} to={`/article/${article.slug}`}>
              <Card style={styles.card}>
                <Card.Content>
                  {image ? <Image src={image.url} /> : null}
                  <Card.Header style={styles.title}>{article.title}</Card.Header>
                  <Card.Meta>
                    {author ? <AuthorDisplay author={author} authorId={author._id} /> : null}
                    <span className='date'>{formatDate(article.created_at)}</span>
                  </Card.Meta>
                  <Card.Description style={styles.summary}>{summary}</Card.Description>
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
  }

  filterPostsByKeywords(posts) {
    const results = []
    if (this.props.search) {
      for (const i in posts) {
        const categories = posts[i].metadata.categories.split(' ')
        for (const j in categories) {
          if (categories[j].replace(/,/g, '').toLowerCase().includes(this.props.search.toLowerCase()) && !results.includes(posts[i])) {
            results.push(posts[i])
          }
        }
        if (posts[i].title.toLowerCase().includes(this.props.search.toLowerCase()) && !results.includes(posts[i])) {
          results.push(posts[i])
        }
        if (posts[i].metadata.author.title.toLowerCase().includes(this.props.search.toLowerCase()) && !results.includes(posts[i])) {
          results.push(posts[i])
        }
      }
      if (results.length) {
        return results
      }
    }

    return posts
  }
}

export default graphql(GET_ARTICLES, {
  options: {
    variables: {
      read_key: process.env.REACT_APP_COSMIC_JS_READ_KEY,
    }
  },
  props: ({ data }) => ({
    data,
  }),
})(ArticleList)