import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import { indexComments } from '../../api/resource'
import messages from '../AutoDismissAlert/messages'

import Spinner from 'react-bootstrap/Spinner'

class IndexComments extends Component {
  constructor (props) {
    super(props)

    this.state = {
      comments: null
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props
    indexComments(user)
      .then(res => this.setState({ comments: res.data.comments }))
      .then(() => msgAlert({
        heading: 'Index Success',
        message: messages.indexCommentsSuccess,
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'Index Post Failed with error: ' + error.message,
        message: messages.indexCommentsFailure,
        variant: 'danger'
      })
      )
  }

  render () {
    let commentsJSX = ''
    const { comments } = this.state
    if (comments === null) {
      commentsJSX = <Spinner animation="border" variant="warning" />
    } else if (comments.length === 0) {
      commentsJSX = <p>No Comments Available</p>
    } else {
      commentsJSX =
      comments.map(comment => {
        return (
          <Fragment key={comment.id}>
            <p>{comment.body}</p>
          </Fragment>
        )
      })
    }
    return (
      <Fragment>
        <h2>All Comments</h2>
        <div>
          {commentsJSX}
        </div>
      </Fragment>
    )
  }
}

export default withRouter(IndexComments)
