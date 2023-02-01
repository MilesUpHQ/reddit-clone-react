import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function JoinButton({ isSubribed , setIsSubscribed}) {
  const { id } = useParams();
  const account = JSON.parse(localStorage.getItem('account'))
  const Community_Subscribe_URL = `http://localhost:3000/api/v1/communities/${id}/subscriptions`

  const [isClicked, setIsClicked] = useState(false);

  const Subscribe = async() => {
    return axios.post(Community_Subscribe_URL, {
      account_id: account.id
    }).then((response) => {
      setIsSubscribed(true)
      toast.success("Joined Community!")
    }).catch((error)=>{
      toast.error("Something went wrong!")
      console.log(error.response.data)
    })
  }

  return (
    <button className="create-post join-btn"
      onMouseEnter={() => setIsClicked(false)}
      onMouseLeave={() => setIsClicked(false)}
      onClick={Subscribe}
    >
      {isSubribed ? "Leave" : "Join"}
    </button>
  );
}

export default JoinButton
