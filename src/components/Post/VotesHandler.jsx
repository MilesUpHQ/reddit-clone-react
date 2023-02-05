import {React, useState } from 'react'
import { TbArrowBigTop, TbArrowBigDown } from 'react-icons/tb'


const VotesHandler = ({ post, communityId, postId, voteCount }) => {
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
