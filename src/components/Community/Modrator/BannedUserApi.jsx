import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';


const BannedUserApi = () => {
  let { id } = useParams()
  const account = JSON.parse(localStorage.getItem('account'))
  const Ban_User_URL = `http://localhost:3000/api/v1/communities/${id}/banned_users/`

  const navigate = useNavigate()
  const [bannedUser, setBannedUser] = useState({
    account_id: account.id,
    subscription_id: '',
    username: '',
    reason: '',
    explanation: ''
  });

  const get_banned_users_list_data = () => {
    return axios.get(Ban_User_URL).then((response)=>response.data).catch((error)=>console.log(error))
  }

  const setNewBannedUser = async (banUser) => {
    axios.post(Ban_User_URL, {banned_user: banUser}).then((response) => {
      if (response.status === 201) {
        toast.success("User : "+banUser.username+" Banned Successfully!");
        navigate('/r/'+id+'/mod/')
      }
    }).catch((error) => {
      console.log(error.response.data);
      toast.error("An error occured while submitting the form");
    })
  }
  return { bannedUser, setBannedUser, setNewBannedUser,get_banned_users_list_data }
}

export default BannedUserApi