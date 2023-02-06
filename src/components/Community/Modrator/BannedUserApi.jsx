import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const BannedUserApi = () => {
  let { id } = useParams()
  const Ban_User_URL = `http://localhost:3000/api/v1/communities/${id}/banned_users/`

  const navigate = useNavigate()
  const [bannedUserErrors, setBannedUserErrors] = useState();
  const [bannedUser, setBannedUser] = useState({
    account_id: '',
    subscription_id: '',
    username: '',
    reason: '',
    explanation: ''
  });

  const get_banned_users_list_data = () => {
    return axios.get(Ban_User_URL).then((response) => response.data)
  }

  const setNewBannedUser = async (banUser) => {
    axios.post(Ban_User_URL, { banned_user: banUser }).then((response) => {
      if (response.status === 201) {
        toast.success("User Banned Successfully!");
        navigate('/r/' + id + '/mod/')
      }
      else if (response.status === 200) {
        toast.warning("User Already Banned!");
      }
    }).catch((error) => {
      setBannedUserErrors(error.response.data)
    })
  }
  return { bannedUser, bannedUserErrors, setBannedUser, setNewBannedUser, get_banned_users_list_data }
}

export default BannedUserApi
