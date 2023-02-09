import { Markup } from 'interweave'
import React from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'

const RulesCommunity = ({ community }) => {
  return (
    <div className='mt-3'>
      <div className="card">
        <div className="rounded-top p-1 ps-3 bg-primary">
          <p className="about-community-title h6 pt-2 text-light d-flex">Community Rules
            <div className="about-community-dots me-2">
              <BiDotsHorizontalRounded />
            </div>
          </p>
        </div>
        <div className="about-community-summary p-2 ps-3">
          <p className='mb-3 community_rules'>
            <Markup content={community.rules}></Markup>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RulesCommunity
