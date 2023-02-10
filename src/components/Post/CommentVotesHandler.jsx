import { React, useState, useEffect } from 'react'
import { TbArrowBigTop, TbArrowBigDown } from 'react-icons/tb'
import { GoArrowUp, GoArrowDown } from 'react-icons/go'
import { useParams } from 'react-router-dom';
import axios from 'axios'

const CommentVotesHandler = ({ comment, commentId, voteCount }) => {
  const account = JSON.parse(localStorage.getItem('account'))
  const [count, setCount] = useState(voteCount);
  let { id, community_id } = useParams();
  const [upvoteClass, setUpvoteClass] = useState("");
  const [downvoteClass, setDownvoteClass] = useState("");
  const url = `http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/comments/${commentId}/comment_votes`;

  useEffect(() => {
    const fetchCommentVotes = async () => {
      const response = await axios.get(url);
      setCount(response.data.reduce((sum, vote) => sum + vote.value, 0));
      setUpvoteClass(response.data.find(vote => vote.account_id === account.id && vote.value === 1) ? 'voted' : '');
      setDownvoteClass(response.data.find(vote => vote.account_id === account.id && vote.value === -1) ? 'voted' : '');
    };

    if (account) {
      fetchCommentVotes();
    } else {
      setCount(voteCount);
    }
  }, [account, community_id, id, commentId]);

  const handleVote = async (value) => {
    if (!account) {
      return;
    }
    const response = await axios.get(url);
    let comment_vote = response.data.find(comment_vote => comment_vote.comment_id === commentId && comment_vote.account_id === account.id);

    if (comment_vote) {
      if (comment_vote.value === value) {
        await axios.delete(`${url}/${comment_vote.id}`);
        setCount(count - value);
        if (value === 1) {
          setUpvoteClass("");
        } else {
          setDownvoteClass("");
        }
      } else {
        await axios.patch(`${url}/${comment_vote.id}`, {
          comment_vote: { value }
        });
        setCount(count + 2 * value);
        if (value === 1) {
          setUpvoteClass("voted");
          setDownvoteClass("");
        } else {
          setDownvoteClass("voted");
          setUpvoteClass("");
        }
      }
    } else {
      await axios.post(url, {
        comment_vote: {
          value,
          account_id: account.id
        }
      });
      setCount(count + value);
      if (value === 1) {
        setUpvoteClass("voted");
      } else {
        setDownvoteClass("voted");
      }
    }
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