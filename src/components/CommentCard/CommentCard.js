import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import NewComment from '../NewComment/NewComment'

const CommentCard = ({ comments, user, resource }) => (
  <Card className="card" key={comments.id}>
    <Card.Body className="card-body">
      <Card.Title className="card-title">{comments.name}</Card.Title>
      <Card.Text className="card-text">
        <ListGroup variant="flush">
          {comments.map(comment =>
            <ListGroup.Item key={comment.id}>
              {comment.name} commented:
              <br></br>
              { user.id === comment.owner
                ? <Button variant="link"><Link className="comment-link card-text" to={`/comments/${comment.id}`}>{comment.body}</Link></Button>
                : `${comment.body}` }
            </ListGroup.Item>
          )}
        </ListGroup>
        <NewComment user={user} resource={resource}/>
      </Card.Text>
    </Card.Body>
  </Card>
)

export default withRouter(CommentCard)
