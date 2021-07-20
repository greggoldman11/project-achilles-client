import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { newComment } from '../../api/resource'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class NewComment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      body: '',
      resource: null
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onNewComment = event => {
    event.preventDefault()

    const { history, user, resource } = this.props
    newComment(this.state, user, resource)
      .then(() => history.push('/resources'))
      .catch(error => {
        this.setState({ name: '', body: '' })
        console.log(error)
      })
  }

  render () {
    const { name, body } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Create a New Comment</h3>
          <Form onSubmit={this.onNewComment}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={name}
                placeholder="Type your name"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                required
                name="body"
                value={body}
                type="text"
                placeholder="Leave a comment!"
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

export default withRouter(NewComment)
