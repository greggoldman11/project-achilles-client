import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { updatePost, showPost, deletePost } from '../../api/resource'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class UpdatePost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      resource: {
        name: '',
        description: '',
        category: '',
        link: '',
        owner: null
      }
    }
  }
  componentDidMount () {
    const { user, match, msgAlert } = this.props
    showPost(user, match.params)
      .then(res => this.setState({ resource: res.data.resource }))
      .then(() => msgAlert({
        heading: 'Show Success',
        message: messages.showPostSuccess,
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'Show Comment Failed with error: ' + error.message,
        message: messages.showPostFailure,
        variant: 'danger'
      }))
  }
  handleChange = event => {
    event.persist()

    this.setState(prevState => {
      const name = event.target.name
      const value = event.target.value

      const updatedValue = { [name]: value }

      return { resource: { ...prevState.resource, ...updatedValue } }
    })
  }

  onUpdatePost = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props

    updatePost(user, this.state.resource)
      .then(() => msgAlert({
        heading: 'Update Post Success',
        message: messages.updatePostSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ name: '', description: '', category: '', link: '' })
        msgAlert({
          heading: 'Update Post Failed with error: ' + error.message,
          message: messages.updatePostFailure,
          variant: 'danger'
        })
      })
  }

  onDeletePost = () => {
    const { msgAlert, history, user } = this.props
    deletePost(user, this.state.resource)
      .then(() => msgAlert({
        heading: 'Delete Post Success',
        message: messages.deletePostSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/resources'))
      .catch(error => {
        this.setState({ name: '', description: '', category: '', link: '' })
        msgAlert({
          heading: 'Delete Post Failed with error: ' + error.message,
          message: messages.deletPostFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    let action = null
    const { name, description, category, link, owner } = this.state.resource
    if (owner === this.props.user.id) {
      action = (
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <h3>Update Resource</h3>
            <Form onSubmit={this.onUpdatePost}>
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
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
                  value={description}
                  type="text"
                  placeholder="Type a description for your resource"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  name="category"
                  value={category}
                  type="text"
                  placeholder="What is the category for your resource"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="link">
                <Form.Label>Link</Form.Label>
                <Form.Control
                  name="link"
                  value={link}
                  type="text"
                  placeholder="What is the link for your resource"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
              <Button
                variant="danger"
                onClick={this.onDeletePost}
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

export default withRouter(UpdatePost)
