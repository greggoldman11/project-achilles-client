import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { showPost } from '../../api/resource'
import messages from '../AutoDismissAlert/messages'
import ResourceCard from '../ResourceCard/ResourceCard'
import CommentCard from '../CommentCard/CommentCard'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

class ShowPost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      resource: null,
      isOwner: false,
      hideComments: false,
      isCommentOwner: false
    }
  }
  componentDidMount () {
    const { msgAlert, user, match } = this.props
    showPost(user, match.params)
      .then(res => this.setState({ resource: res.data.resource }))
      .then(() => {
        if (this.state.resource.owner === this.props.user.id) {
          this.setState({ isOwner: true })
        } else {
          this.setState({ isOwner: false })
        }
      })
      .then(() => {
        if (this.state.resource.comments.owner === this.props.user.id) {
          this.setState({ isCommentOwner: true })
        } else {
          this.setState({ isCommentOwner: false })
        }
      })
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
  toggleComments = () => this.setState(prevState => {
    return { hideComments: !prevState.hideComments }
  })

  render () {
    let resourceJSX = ''
    const { resource, isOwner } = this.state
    if (!resource) {
      resourceJSX = <Spinner animation="border" variant="warning" />
    } else {
      resourceJSX =
      <Fragment key={resource.id}>
        <ResourceCard
          user={this.props.user}
          key={resource.id}
          id={resource.id}
          name={resource.name}
          description={resource.description}
          category={resource.category}
          link={resource.link}
        />
        {isOwner ? <Button><Link className="button-link" to={`/resources/${resource.id}/update`}>Update</Link></Button> : ''}
        <Fragment>
          <Button onClick={this.toggleComments}>{this.state.hideComments ? 'Hide Comments' : 'Show Comments'}</Button>
          {this.state.hideComments
            ? <CommentCard
              resource={resource.id}
              user={this.props.user}
              comments={resource.comments}
              msgAlert={this.props.msgAlert}
            />
            : ''
          }
        </Fragment>
      </Fragment>
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
