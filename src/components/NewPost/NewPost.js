import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { newPost } from '../../api/resource'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class NewPost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      description: '',
      category: '',
      link: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onNewPost = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props

    newPost(this.state, user)
      .then(() => msgAlert({
        heading: 'New Post Success',
        message: messages.newPostSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ name: '', description: '', category: '', link: '' })
        msgAlert({
          heading: 'New Post Failed with error: ' + error.message,
          message: messages.newPostFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { name, description, category, link } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Create a New Resource</h3>
          <Form onSubmit={this.onNewPost}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
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
                required
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
                required
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
                required
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
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(NewPost)
