import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const ResourceCard = (resource) => (
  // use hooks to create likes
  <Card className="card" key={resource.id}>
    <Card.Body className="card-body">
      <Card.Title className="card-title">{resource.name}</Card.Title>
      <Card.Text className="card-text">
        <div>
          <p>{resource.description}</p>
          <a href={resource.link} target="_blank" rel="noopener noreferrer">{resource.link}</a>
        </div>
      </Card.Text>
      <Button variant="primary"><Link className="button-link" to={`/resources/${resource.id}`}>Check out this post!</Link></Button>
    </Card.Body>
  </Card>
)

export default withRouter(ResourceCard)
