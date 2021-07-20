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
      resources: null
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props
    indexPosts(user)
      .then(res => this.setState({ resources: res.data.resources }))
      .then(console.log(this.state.resources))
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
  render () {
    let resourcesJSX = ''
    const { resources } = this.state
    if (resources === null) {
      resourcesJSX = <Spinner animation="border" variant="warning" />
    } else if (resources.length === 0) {
      resourcesJSX = <p>No Resources Available</p>
    } else {
      resourcesJSX =
      resources.map(resource => {
        return (
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
          </Fragment>
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
