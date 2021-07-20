import apiUrl from '../apiConfig'
import axios from 'axios'

export const newPost = (resource, user) => {
  return axios({
    url: apiUrl + '/resources/',
    method: 'POST',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      resource: {
        name: resource.name,
        description: resource.description,
        category: resource.category,
        link: resource.link
      }
    }
  })
}

export const indexPosts = user => {
  return axios({
    url: apiUrl + '/resources/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
export const showPost = (user, resources) => {
  return axios({
    url: apiUrl + `/resources/${resources.id}/`,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
export const deletePost = (user, resources) => {
  return axios({
    url: apiUrl + `/resources/${resources.id}/`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const updatePost = (user, resource) => {
  return axios({
    url: apiUrl + `/resources/${resource.id}/`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      resource: {
        name: resource.name,
        description: resource.description,
        category: resource.category,
        link: resource.link,
        owner: user.id
      }
    }
  })
}
export const indexComments = user => {
  return axios({
    url: apiUrl + '/comments/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
export const showComment = (user, comment) => {
  return axios({
    url: apiUrl + `/comments/${comment.id}`,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
export const newComment = (comment, user, resource) => {
  return axios({
    url: apiUrl + '/comments/',
    method: 'POST',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      comments: {
        name: comment.name,
        body: comment.body,
        resource: resource,
        owner: user.id
      }
    }
  })
}

export const deleteComment = (user, comment) => {
  return axios({
    url: apiUrl + `/comments/${comment.id}/`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const updateComment = (user, comment) => {
  return axios({
    url: apiUrl + `/comments/${comment.id}/`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      comment: {
        name: comment.name,
        description: comment.body,
        owner: user.id
      }
    }
  })
}
