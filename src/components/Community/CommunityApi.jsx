import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CommunityApi = () => {
  const [errorJson, setErrorJson] = useState('')
  const Community_URL = 'http://localhost:3000/api/v1/communities/'

  let { id } = useParams();
  const account = JSON.parse(localStorage.getItem('account'))
  const navigate = useNavigate();
  const [community, setCommunity] = useState({
    account_id: account.id,
    name: '',
    url: '',
    rules: '',
    profile_image: null,
    cover_image: null
  });

  const get_community = () => {
    return axios.get(Community_URL + id).then((response) => response.data)
  }

  const delete_community = () => {
    return axios.delete(Community_URL + id).then((response) => response.data)
  }

  const setFormData = (community) => {
    let data = new FormData()
    data.append('account_id', account.id)
    data.append('name', community.name)
    data.append('url', community.url)
    data.append('rules', community.rules)
    data.append('profile_image', community.profile_image)
    data.append('cover_image', community.cover_image)
    return data
  }

  const set_new_community = async (community) => {

    let CommunityFormData = setFormData(community)

    axios.post(Community_URL, CommunityFormData).then((response) => {
      if (response.status === 201) {
        toast.success("Community Created successfully!");
        navigate('/r')
      }
    }).catch((error) => {
      console.log(error.response.data);
      setErrorJson(error.response.data)
      toast.error("An error occured while submitting the form");
    })
  }

  const edit_community = async (community) => {
    let CommunityFormData = setFormData(community)

    await axios.put(Community_URL + id, CommunityFormData ).then((response) => {
      if (response.status === 200) {
        toast.success("Community Edited successfully!");
        navigate('/r/' + id)
      }
    }).catch((error) => {
      console.log(error.response.data);
      setErrorJson(error.response.data)
      toast.error("An error occured while submitting the form");
    })
  }

  return { community, setCommunity, edit_community, set_new_community, get_community, errorJson }
}

export default CommunityApi
