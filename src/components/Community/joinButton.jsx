import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function JoinButton({ subscribeId, setSubscribeId, isSubscribed ,setIsSubscribed}) {
  const { id } = useParams();
  const account = JSON.parse(localStorage.getItem('account'))
  const Community_Subscribe_URL = `http://localhost:3000/api/v1/communities/${id}/subscriptions/`

  const [isClicked, setIsClicked] = useState(false);

  const Subscribe = async() => {
    return axios.post(Community_Subscribe_URL, {
      account_id: account.id,
      community_id: id
    }).then((response) => {
      if(response.status === 201) {
        setSubscribeId(response.data.id)
        setIsSubscribed(true)
        toast.success("Joined Community!")
      }
    }).catch((error)=>{
      toast.error("Something went wrong!")
      console.log(error.response.data)
    })
  }

  const UnSubscribe = async() => {
    return axios.delete(Community_Subscribe_URL+subscribeId).then((response) => {
      if (response.status === 200) {
        setIsSubscribed(false)
        toast.success("Leaved Community!")
      }
    }).catch((error)=>{
      toast.error("Something went wrong!")
      console.log(error.response.data)
    })
  }

  const ToggleSubscribe = () => {
    isSubscribed ? UnSubscribe() : Subscribe()
  }

  return (
    <button className="join-btn"
      onMouseEnter={() => setIsClicked(false)}
      onMouseLeave={() => setIsClicked(false)}
      onClick={ToggleSubscribe}
    >
      {isSubscribed ? "Leave" : "Join"}
    </button>
  );
}

export default JoinButton
