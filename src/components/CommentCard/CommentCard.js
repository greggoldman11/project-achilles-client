import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import NewComment from '../NewComment/NewComment'
// import EditComment from '../EditComment/EditComment'

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
              <Button variant="primary"><Link className="button-link" to={`/comments/${comment.id}`}>{comment.body}</Link></Button>
            </p>
          )}
        </div>
        <NewComment user={comment.user} resource={comment.resource}/>
      </Card.Text>
    </Card.Body>
  </Card>
)

export default withRouter(CommentCard)
