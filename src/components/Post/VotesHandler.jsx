import {React, useState } from 'react'
import { TbArrowBigTop, TbArrowBigDown } from 'react-icons/tb'
import axios from 'axios'


const VotesHandler = ({ post, communityId, postId, voteCount }) => {
    const account = JSON.parse(localStorage.getItem('account'))
    const postvote = account && post.votes ? post.votes.find(vote => vote.account_id === account.id) : "";
    const [count, setCount] = useState(voteCount);
    const [upvoteClass, setupvoteClass] = useState(postvote && postvote.value === 1 ? "voted" : "");
    const [downvoteClass, setdownvoteClass] = useState(postvote && postvote.value === -1 ? "voted" : "");

    const handleUpvote = async() => {
        await axios.get(`http://localhost:3000/api/v1/communities/${communityId}/posts/${postId}/votes`)
        .then(response => {
            let vote = response.data.find(vote => vote.post_id === postId && vote.account_id === account.id)
            if (vote) {
                axios
                    .delete(`http://localhost:3000/api/v1/communities/${communityId}/posts/${postId}/votes/${vote.id}`)
                    .then((response) => {
                        console.log(voteCount)
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
        <div>
            <div className={`upvote ${upvoteClass}`}>
                <TbArrowBigTop onClick={handleUpvote} />
            </div>
            <span className="font-weight-bold score">{count}</span>
            <div className={`downvote ${downvoteClass}`}>
                <TbArrowBigDown onClick={handleDownvote} />
            </div>
        </div>
    )
}

export default VotesHandler