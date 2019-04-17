import React from 'react'
import gql from 'graphql-tag'
import { Card, Image, Label, Icon } from 'semantic-ui-react'
import { Query } from 'react-apollo'

const GET_AUTHORS = gql`
  query authors($read_key: String!) {
    objectsByType(bucket_slug: "apollo-blog", type_slug: "authors", read_key: $read_key) {
      _id
      title
      slug
      metadata
    }
  }
`

const Authors = ({ author, authorId, display }) => {
  const read_key = process.env.REACT_APP_COSMIC_JS_READ_KEY
  const isLargeScreen = Boolean(window.innerWidth > 700)
  const styles = {
    container: {
      display: 'inline-block',
    },
    labelImage: {
      margin: '0 10px 0 0',
    },
    card: {
      width: '200px',
    }
  }
  if (!isLargeScreen) {
    styles.card.width = '95%'
  }

  return (
    <Query query={GET_AUTHORS} variables={{ read_key }}>
      {({ loading, error, data }) => {
        if (loading) return '...loading'
        if (error) return `Error! ${error.message}`

        return (
          <div className="author-container" style={styles.container}>
            {data.objectsByType.map(author => {
              if (authorId === author._id) {
                const { avatar, connect, bio } = author.metadata

                return (
                  <div key={author._id} className="author-info">
                    {display !== 'card'
                      ? <Label>
                        {avatar
                          ? <img style={styles.labelImage} src={avatar.url} alt={author.slug} />
                          : <Icon className="user circle" />
                        }
                        {author.title}
                      </Label>
                      : <Card style={styles.card}>
                        {isLargeScreen
                          ? <div>
                            {avatar
                              ? <Image src={avatar.url} alt={author.slug} />
                              : <Icon className="user circle" />
                            }
                          </div>
                          : null
                        }
                        <Card.Content>
                          {!isLargeScreen
                            ? <div>
                              {avatar
                                ? <Image size="mini" floated="left" src={avatar.url} alt={author.slug} />
                                : <Icon floated="right" className="user circle" />
                              }
                            </div>
                            : null
                          }
                          <Card.Header>
                            {author.title}
                          </Card.Header>
                          <Card.Meta>
                            <Card.Description>
                              {bio}
                            </Card.Description>
                          </Card.Meta>
                        </Card.Content>
                        {Object.keys(connect).length
                          ? <Card.Content extra>
                            {Object.keys(connect).map(key => (
                              <a key={key} href={connect[key]} target="_blank" rel="noopener noreferrer">
                                <Icon className={`${key}`} />
                              </a>
                            ))}
                          </Card.Content>
                          : null
                        }
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