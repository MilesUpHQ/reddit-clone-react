import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'

const HistoryApi = () => {
  const { id, community_id } = useParams();
  const Post_url = `http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/post_views/`
  const account = JSON.parse(localStorage.getItem('account'))
  const get_post_views = () => {
    return axios.get(Post_url, { account_id: account.id }).then((response) => response.data).catch((error) => console.log(error))
  }

  const set_post_views = () => {
    return axios.post(Post_url, { account_id: account.id }).then((response) => response.data).catch((error) => console.log(error))
  }

  return { get_post_views, set_post_views }
}

export default HistoryApi

