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
export const showPost = (user) => {
  return axios({
    url: apiUrl + '/resources/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
