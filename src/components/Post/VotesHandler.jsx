import {React, useState, useEffect } from 'react'
import { TbArrowBigTop, TbArrowBigDown } from 'react-icons/tb'
import { GoArrowUp, GoArrowDown } from 'react-icons/go'
import axios from 'axios'

const VotesHandler = ({ post, communityId, postId, voteCount }) => {
    const account = JSON.parse(localStorage.getItem('account'))
    const [count, setCount] = useState();
    const [upvoteClass, setupvoteClass] = useState("");
    const [downvoteClass, setdownvoteClass] = useState("");
    const postvote = account && post.votes ? post.votes.find(vote => vote.account_id === account.id) : null;

    useEffect(() => {
        setCount(voteCount);
        setupvoteClass(postvote && postvote.value === 1 ? 'voted' : '');
        setdownvoteClass(postvote && postvote.value === -1 ? 'voted' : '');
    },[post]);

    const handleUpvote = async() => {
        await axios.get(`http://localhost:3000/api/v1/communities/${communityId}/posts/${postId}/votes`)
        .then(response => {
            let vote = response.data.find(vote => vote.post_id === postId && vote.account_id === account.id)
            if (vote) {
                axios
                    .delete(`http://localhost:3000/api/v1/communities/${communityId}/posts/${postId}/votes/${vote.id}`)
                    .then((response) => {
                        setCount(postvote ? --voteCount : voteCount--);
                        setupvoteClass("")
                        setdownvoteClass("")
                    });
            } else {
                axios
                    .post(`http://localhost:3000/api/v1/communities/${communityId}/posts/${postId}/votes`, {
                        vote: {
                            value: 1,
                            account_id: account.id
                        },
                    })
                    .then((response) => {
                        setCount(response.data);
                        setupvoteClass("voted")
                        setdownvoteClass("")
                    });
            }
        });
    };

    const handleDownvote = async() => {
        await axios.get(`http://localhost:3000/api/v1/communities/${communityId}/posts/${postId}/votes`)
        .then(response => {
            let vote = response.data.find(vote => vote.post_id === postId && vote.account_id === account.id)
            if (vote) {
                axios
                    .delete(`http://localhost:3000/api/v1/communities/${communityId}/posts/${postId}/votes/${vote.id}`)
                    .then((response) => {
                        setCount(postvote ? --voteCount : voteCount--);
                        setupvoteClass("")
                        setdownvoteClass("")
                    });
            } else {
                axios
                    .post(`http://localhost:3000/api/v1/communities/${communityId}/posts/${postId}/votes`, {
                        vote: {
                            value: -1,
                            account_id: account.id
                        },
                    })
                    .then((response) => {
                        setCount(response.data);
                        setdownvoteClass("voted")
                        setupvoteClass("")
                    });
            }
        });
    };
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
