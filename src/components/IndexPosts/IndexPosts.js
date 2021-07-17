import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import { indexPosts } from '../../api/resource'
import messages from '../AutoDismissAlert/messages'

import Spinner from 'react-bootstrap/Spinner'

import ResourceCard from '../ResourceCard/ResourceCard'

class IndexPosts extends Component {
  constructor (props) {
    super(props)

    this.state = {
      resources: null,
      liked: false
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props
    indexPosts(user)
      .then(res => this.setState({ resources: res.data.resources }))
      .then(() => msgAlert({
        heading: 'Index Success',
        message: messages.indexPostsSuccess,
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'Index Post Failed with error: ' + error.message,
        message: messages.indexPostsFailure,
        variant: 'danger'
      })
      )
  }
  handleClick = () => this.setState(prevState => {
    return { liked: !prevState.liked }
  })
  render () {
    let resourcesJSX = ''
    const { resources } = this.state
    console.log(resources)
    if (resources === null) {
      resourcesJSX = <Spinner animation="border" variant="warning" />
    } else if (resources.length === 0) {
      resourcesJSX = <p>No Resources Available</p>
    } else {
      resourcesJSX =
      resources.map(resource => {
        return (
          <ResourceCard
            user={this.props.user}
            key={resource.id}
            id={resource.id}
            name={resource.name}
            description={resource.description}
            category={resource.category}
            link={resource.link}
          />
        )
      })
    }
    return (
      <Fragment>
        <h2>All Resources</h2>
        <div>
          {resourcesJSX}
        </div>
      </Fragment>
    )
  }
}

export default withRouter(IndexPosts)
