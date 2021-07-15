import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import { showPost } from '../../api/resource'
import messages from '../AutoDismissAlert/messages'

import Spinner from 'react-bootstrap/Spinner'

class ShowPost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      resource: null
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props
    const { match } = this.props
    console.log(match)
    showPost(user)
      .then(res => this.setState({ resource: res.data.resources }))
      .then(() => msgAlert({
        heading: 'Show Success',
        message: messages.showPostsSuccess,
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'Show Post Failed with error: ' + error.message,
        message: messages.showPostFailure,
        variant: 'danger'
      })
      )
  }
  render () {
    let resourceJSX = ''
    const { resource } = this.state
    console.log(resource)
    if (resource === null) {
      resourceJSX = <Spinner animation="border" variant="warning" />
    } else if (resource.length === 0) {
      resourceJSX = <p>No Resources Available</p>
    } else {
      resourceJSX =
      resource.map(resource => {
        return (
          <div key={resource.id}>
            <h2>{resource.name}</h2>
            <p>{resource.description}</p>
            <a href={resource.link} target="_blank" rel="noopener noreferrer">{resource.link}</a>
          </div>
        )
      })
    }
    return (
      <Fragment>
        <h2>The Resource</h2>
        <div>
          {resourceJSX}
        </div>
      </Fragment>
    )
  }
}

export default withRouter(ShowPost)
