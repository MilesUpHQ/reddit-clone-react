import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CommunityApi = () => {
  const Community_URL = 'http://localhost:3000/api/v1/communities/'
  const account = JSON.parse(localStorage.getItem('account'))

  let { id } = useParams();
  const navigate = useNavigate();
  const [community, setCommunity] = useState({
    account_id: account.id,
    name: '',
    url: '',
    rules: ''
  });

  const get_community = () => {
    return axios.get(Community_URL + id).then((response) => response.data)
  }

  const set_new_community = async (community) => {
    await axios.post(Community_URL, { community }).then((response) => {
      if (response.status === 201) {
        toast.success("Community Created successfully!");
        navigate('/r')
      }
    }).catch((error) => {
      console.log(error.response.data);
      toast.error("An error occured while submitting the form");
      // handleErrors(error.response.data)
    })
  }

  const edit_community = async (community) => {
    await axios.put(Community_URL + id, { community }).then((response) => {
      if (response.status === 200) {
        toast.success("Community Edited successfully!");
        navigate('/r/' + id)
      }
    }).catch((error) => {
      console.log(error.response.data);
      toast.error("An error occured while submitting the form");
      // handleErrors(error.response.data)
    })
  }

  return { community, setCommunity, edit_community, set_new_community, get_community }
}

export default CommunityApi
