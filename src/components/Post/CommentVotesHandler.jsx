import { React, useState, useEffect } from 'react'
import { TbArrowBigTop, TbArrowBigDown } from 'react-icons/tb'
import { GoArrowUp, GoArrowDown } from 'react-icons/go'
import axios from 'axios'

const CommentVotesHandler = ({ comment, communityId, commentId, voteCount }) => {
  const account = JSON.parse(localStorage.getItem('account'))
  const [count, setCount] = useState();
  const [upvoteClass, setupvoteClass] = useState("");
  const [downvoteClass, setdownvoteClass] = useState("");
  const commentVote = account && comment.votes ? comment.votes.find(comment_vote => comment_vote.account_id === account.id) : null;

  return (
    <div  style={{display: "flex"}} className=''>
      <div className={`vote-icon upvote ${upvoteClass}`}>
        {upvoteClass ?
          <GoArrowUp  />
          :
          <TbArrowBigTop  />
        }
      </div>
      <span className={`vote-score upvote_${upvoteClass} downvote_${downvoteClass}`}>{count}</span>
      <div className={`vote-icon downvote ${downvoteClass}`}>
        {downvoteClass ?
          <GoArrowDown />
          :
          <TbArrowBigDown />
        }
      </div>
    </div>
  )

}

export default CommentVotesHandler