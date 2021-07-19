import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import NewComment from '../NewComment/NewComment'

const CommentCard = (comment) => (
  <Card className="card" key={comment.id}>
    <Card.Body className="card-body">
      <Card.Title className="card-title">{comment.name}</Card.Title>
      <Card.Text className="card-text">
        <div>
          {comment.comments.map(comment =>
            <p key={comment.id}>
              {comment.name} commented:
              <br></br>
              --------------
              {comment.body}
            </p>)
          }
        </div>
        <NewComment user={comment.user} resource={comment.resource}/>
      </Card.Text>
    </Card.Body>
  </Card>
)

export default withRouter(CommentCard)
