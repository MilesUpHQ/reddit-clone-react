import { React, useState, useEffect } from 'react'
import { TbArrowBigTop, TbArrowBigDown } from 'react-icons/tb'
import { GoArrowUp, GoArrowDown } from 'react-icons/go'
import { useParams } from 'react-router-dom';
import axios from 'axios'

const CommentVotesHandler = ({ comment, commentId, voteCount }) => {
  const account = JSON.parse(localStorage.getItem('account'))
  const [count, setCount] = useState();
  let { id, community_id } = useParams();
  const [upvoteClass, setupvoteClass] = useState("");
  const [downvoteClass, setdownvoteClass] = useState("");
  const commentVote = account && comment.votes ? comment.votes.find(comment_vote => comment_vote.account_id === account.id) : null;

  useEffect(() => {
    setCount(voteCount);
    setupvoteClass(commentVote && commentVote.value === 1 ? 'voted' : '');
    setdownvoteClass(commentVote && commentVote.value === -1 ? 'voted' : '');
  }, [comment]);

  
  return (
    <div style={{ display: "flex" }} className='mt-0'>
      <div className={`vote-icon upvote ${upvoteClass}`}>
        {upvoteClass ?
          <GoArrowUp />
          :
          <TbArrowBigTop />
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