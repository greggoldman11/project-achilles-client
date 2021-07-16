import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { showPost } from '../../api/resource'
import messages from '../AutoDismissAlert/messages'

import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

class ShowPost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      resource: null
    }
  }
  componentDidMount () {
    const { msgAlert, user, match } = this.props
    showPost(user, match.params)
      .then(res => this.setState({ resource: res.data.resource }))
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
    if (!resource) {
      resourceJSX = <Spinner animation="border" variant="warning" />
    } else if (resource.length === 0) {
      resourceJSX = <p>No Resources Available</p>
    } else {
      resourceJSX =
      <div key={resource.id}>
        <h2>{resource.name}</h2>
        <p>{resource.description}</p>
        <a href={resource.link} target="_blank" rel="noopener noreferrer">{resource.link}</a>
      </div>
    }
    return (
      <Fragment>
        <h2>The Resource</h2>
        <div>
          {resourceJSX}
        </div>
        <Button variant="primary"><Link className="button-link" to={'/resources/'}>See All Resources</Link></Button>
      </Fragment>
    )
  }
}

export default withRouter(ShowPost)