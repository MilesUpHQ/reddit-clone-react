import React from 'react'
import axios from 'axios'

const PostApi = () => {
  const Posts_URL = 'http://localhost:3000/api/v1/communities/1/posts'

  const get_all_posts = () => {
    return axios.get(Posts_URL).then((response) => response.data)
  }

  return { get_all_posts }
}

export default PostApi
