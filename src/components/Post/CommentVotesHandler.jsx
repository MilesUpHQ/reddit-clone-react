import { React, useState, useEffect } from 'react'
import { TbArrowBigTop, TbArrowBigDown } from 'react-icons/tb'
import { GoArrowUp, GoArrowDown } from 'react-icons/go'
import { useParams } from 'react-router-dom';
import axios from 'axios'

const CommentVotesHandler = ({ comment, post, commentId, voteCount }) => {
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
  }, [post]);

  const handleVote = async (value) => {
    await axios.get(`http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/comments/${commentId}/comment_votes`)
      .then(response => {
        let comment_vote = response.data.find(comment_vote => comment_vote.comment_id === commentId && comment_vote.account_id === account.id)
        if (comment_vote) {
          axios
            .delete(`http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/comments/${commentId}/comment_votes/${comment_vote.id}`)
            .then((response) => {
              setCount(commentVote ? --voteCount : voteCount--);
              setupvoteClass("")
              setdownvoteClass("")
            });
        } else {
          axios
            .post(`http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/comments/${commentId}/comment_votes `, {
              comment_vote: {
                value: value,
                account_id: account.id
              },
            })
            .then((response) => {
              setCount(response.data);
              if (value === 1) {
              setupvoteClass("voted")
              setdownvoteClass("")
            } else {
              setdownvoteClass("voted")
              setupvoteClass("")
            }
            });
        }
      });
  };

  const handleUpvote = () => handleVote(1);
  const handleDownvote = () => handleVote(-1);

  return (
    <div style={{ display: "flex" }} className='mb-3'>
      <div className={`vote-icon upvote ${upvoteClass}`}>
        {upvoteClass ?
          <GoArrowUp onClick={handleUpvote} />
          :
          <TbArrowBigTop onClick={handleUpvote} />
        }
      </div>
      <span className={`vote-score upvote_${upvoteClass} downvote_${downvoteClass} mt-3 mx-2`}>{count}</span>
      <div className={`vote-icon downvote ${downvoteClass}`}>
        {downvoteClass ?
          <GoArrowDown onClick={handleDownvote} />
          :
          <TbArrowBigDown onClick={handleDownvote} />
        }
      </div>
    </div>
  )

}

export default CommentVotesHandler