import React from 'react'
import gql from 'graphql-tag'
import { Card, Label, Icon } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import { findKeyInArray } from '../../lib/util.js'

const GET_AUTHORS = gql`
  query authors($read_key: String!) {
    objectsByType(bucket_slug: "apollo-blog", type_slug: "authors", read_key: $read_key) {
      _id
      title
      slug
      metafields {
        key
        value
      }
    }
  }
`

const Authors = ({ authorId, displayType }) => {
  const read_key = process.env.REACT_APP_COSMIC_JS_READ_KEY
  const styles = {
    labelImage: {
      margin: '0 10px 0 0',
    }
  }

  return (
    <Query query={GET_AUTHORS} variables={{ read_key }}>
      {({ loading, error, data }) => {
        if (loading) return '...loading'
        if (error) return `Error! ${error.message}`

        return (
          <div className="author-container">
            {data.objectsByType.map(author => {
              if (authorId === author._id) {
                const avatarPath = findKeyInArray({ key: "avatar", array: author.metafields })
                const bio = findKeyInArray({ key: 'bio', array: author.metafields })
                const connect = findKeyInArray({ key: 'connect', array: author.metafields })
                console.log(connect)

                return (
                  <div key={author._id} className="author-info">
                    {displayType === 'default'
                      ? <Label>
                        {avatarPath
                          ? <img style={styles.labelImage} src={`https://cosmic-s3.imgix.net/${avatarPath}`} alt={author.slug} />
                          : <Icon className="user circle" />
                        }
                        {author.title}
                      </Label>
                      : <Card>
                        <Card.Content>
                          <Card.Header>
                            {author.title}
                          </Card.Header>
                          <Card.Meta>
                            <Card.Description>
                              {bio}
                            </Card.Description>
                          </Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                          {Object.keys(connect).map(key => (
                            <Icon key={key} className={`${key}`} />
                          ))}
                        </Card.Content>
                      </Card>
                    }
                  </div>
                )
              }
              return null
            })}
          </div>
        )
      }}
    </Query>
  )
}


export default Authors