import React from 'react'
import AboutCommunity from '../Community/AboutCommunity';
import RulesCommunity from '../Community/RulesCommunity';

const CommunityDetails = ({ post, isBanned }) => {

  return (
    <div>
      <AboutCommunity community={post.community} isBanned={isBanned} postShow={true} />
      <RulesCommunity community={post.community} />
    </div>
  )
}

export default CommunityDetails
