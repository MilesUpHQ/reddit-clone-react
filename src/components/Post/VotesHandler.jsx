import { React, useState } from 'react'
import { TbArrowBigTop, TbArrowBigDown } from 'react-icons/tb'


const VotesHandler = ({ communityId, postId, voteCount }) => {
    const account = JSON.parse(localStorage.getItem('account'))
    const [count, setCount] = useState(voteCount);
    const handleUpvote = async () => {
        axios
            .post(`http://localhost:3000/api/v1/communities/${communityId}/posts/${postId}/votes`, {
                vote: {
                    value: 1,
                    account_id: account.id
                },
            })
            .then((response) => {
                setCount(response.data);
            });
    }
    return (
        <div>
            <div className={`upvote`}>
                <TbArrowBigTop onClick={handleUpvote} />
            </div>
            <span className="font-weight-bold score">{count}</span>
            <div className={`downvote`}>
                <TbArrowBigDown />
            </div>
        </div>
    )
}

export default VotesHandler
