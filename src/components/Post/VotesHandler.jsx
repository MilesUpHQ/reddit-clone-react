import { React, useState, useEffect } from 'react'
import { TbArrowBigTop, TbArrowBigDown } from 'react-icons/tb'
import { GoArrowUp, GoArrowDown } from 'react-icons/go'
import axios from 'axios'

const VotesHandler = ({ post, communityId, postId, voteCount }) => {
  const account = JSON.parse(localStorage.getItem('account'))
  const [count, setCount] = useState(voteCount);
  const [upvoteClass, setUpvoteClass] = useState("");
  const [downvoteClass, setDownvoteClass] = useState("");
  const url = `http://localhost:3000/api/v1/communities/${communityId}/posts/${postId}/votes`;

  useEffect(() => {
    const fetchVotes = async () => {
      const response = await axios.get(url);
      setCount(response.data.reduce((sum, vote) => sum + vote.value, 0));
      setUpvoteClass(response.data.find(vote => vote.account_id === account.id && vote.value === 1) ? 'voted' : '');
      setDownvoteClass(response.data.find(vote => vote.account_id === account.id && vote.value === -1) ? 'voted' : '');
    };

    if (account) {
      fetchVotes();
    } else {
      setCount(voteCount);
    }
  }, [account, communityId, postId]);

  const handleVote = async (value) => {
    if (!account) {
      return;
    }
    const response = await axios.get(url);
    let vote = response.data.find(vote => vote.post_id === postId && vote.account_id === account.id);

    if (vote) {
      if (vote.value === value) {
        await axios.delete(`${url}/${vote.id}`);
        setCount(count - value);
        if (value === 1) {
          setUpvoteClass("");
        } else {
          setDownvoteClass("");
        }
      } else {
        await axios.patch(`${url}/${vote.id}`, {
          vote: { value }
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
        vote: {
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
    <div className=''>
      <div className={`vote-icon upvote ${upvoteClass}`}>
        {upvoteClass ?
          <GoArrowUp onClick={handleUpvote} />
          :
          <TbArrowBigTop onClick={handleUpvote} />
        }
      </div>
      <span className={`vote-score upvote_${upvoteClass} downvote_${downvoteClass}`}>{count}</span>
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

export default VotesHandler
