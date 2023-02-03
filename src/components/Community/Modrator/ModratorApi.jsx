import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const ModratorApi = () => {
  const { id } = useParams();
  const JoinedAccountsURL = `http://localhost:3000/api/v1/communities/${id}/joined_accounts`
  const [ joinedAccounts, setJoinedAccounts ] = useState('')

  const GetJoinedAccounts = () => {
    return axios.get(JoinedAccountsURL).then((response) => response.data)
  }

  return { joinedAccounts, setJoinedAccounts, GetJoinedAccounts }
}

export default ModratorApi
