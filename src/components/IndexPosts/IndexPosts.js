import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import { indexPosts } from '../../api/resource'
import messages from '../AutoDismissAlert/messages'

import Spinner from 'react-bootstrap/Spinner'

class IndexPosts extends Component {
  constructor (props) {
    super(props)

    this.state = {
      resources: null
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props
    indexPosts(user)
      .then(res => this.setState({ resources: res.data.resources }))
      .then(() => msgAlert({
        heading: 'Index Success',
        message: messages.indexPostsSuccess,
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'Index Post Failed with error: ' + error.message,
        message: messages.indexPostsFailure,
        variant: 'danger'
      })
      )
  }

  render () {
    let resourcesJSX = ''
    const { resources } = this.state
    console.log(resources)
    if (resources === null) {
      resourcesJSX = <Spinner animation="border" variant="warning" />
    } else if (resources.length === 0) {
      resourcesJSX = <p>No Resources Available</p>
    } else {
      resourcesJSX =
      resources.map(resource => {
        return (
          <div key={resource.id}>
            <h2>{resource.name}</h2>
            <p>{resource.description}</p>
            <a href={resource.link} target="_blank" rel="noopener noreferrer">Visit this Resource!</a>
          </div>
        )
      })
    }
    return (
      <Fragment>
        <h2>All Resources</h2>
        <div>
          {resourcesJSX}
        </div>
      </Fragment>
    )
  }
}

export default withRouter(IndexPosts)
