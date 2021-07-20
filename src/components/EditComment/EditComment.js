import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { updateComment, showComment, deleteComment } from '../../api/resource'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class EditComment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      comment: {
        name: '',
        body: '',
        owner: null
      }
    }
  }
  componentDidMount () {
    const { user, match } = this.props
    showComment(user, match.params)
      .then(res => this.setState({ comment: res.data }))
      .catch(console.error)
  }
  handleChange = event => {
    event.persist()

    this.setState(prevState => {
      const name = event.target.name
      const value = event.target.value

      const updatedValue = { [name]: value }

      return { comment: { ...prevState.comment, ...updatedValue } }
    })
  }

  onUpdateComment = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props

    updateComment(user, this.state.comment)
      .then(() => msgAlert({
        heading: 'Update Comment Success',
        message: messages.updateCommentSuccess,
        variant: 'success'
      }))
      .then(() => history.push(`/resources/${this.state.comment.resource}`))
      .catch(error => {
        this.setState({ name: '', body: '' })
        msgAlert({
          heading: 'Update Comment Failed with error: ' + error.message,
          message: messages.updateCommentFailure,
          variant: 'danger'
        })
      })
  }

  onDeleteComment = () => {
    const { msgAlert, history, user } = this.props
    deleteComment(user, this.state.comment)
      .then(() => msgAlert({
        heading: 'Delete Comment Success',
        message: messages.deleteCommentSuccess,
        variant: 'success'
      }))
      .then(() => history.push(`/resources/${this.state.comment.resource}`))
      .catch(error => {
        this.setState({ name: '', body: '' })
        msgAlert({
          heading: 'Delete Comment Failed with error: ' + error.message,
          message: messages.deleteCommentFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    let action = null
    const { name, body, owner } = this.state.comment
    if (owner === this.props.user.id) {
      action = (
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <h3>Update Comment</h3>
            <Form onSubmit={this.onUpdateComment}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Type the name for the resource"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Body</Form.Label>
                <Form.Control
                  name="body"
                  value={body}
                  type="text"
                  placeholder="Type a description for your resource"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
              >
                Update
              </Button>
              <Button
                variant="danger"
                onClick={this.onDeleteComment}
              >
                Delete
              </Button>
            </Form>
          </div>
        </div>
      )
    } else {
      action = (
        <h1>Access Denied</h1>
      )
    }
    return action
  }
}

export default withRouter(EditComment)
