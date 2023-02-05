import {React, useState } from 'react'
import { TbArrowBigTop, TbArrowBigDown } from 'react-icons/tb'


const VotesHandler = ({ communityId, postId, voteCount }) => {
    const [count, setCount] = useState(voteCount);
       return (
        <div>
            <div className={`upvote`}>
                <TbArrowBigTop />
            </div>
            <span className="font-weight-bold score">{count}</span>
            <div className={`downvote`}>
                <TbArrowBigDown />
            </div>
        </div>
    )
}

export default VotesHandler
