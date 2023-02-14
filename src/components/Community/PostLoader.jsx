import React from 'react'
import { TbArrowBigDown, TbArrowBigTop } from 'react-icons/tb'

const PostLoader = () => {
  return (
    <div>
      <div className="card post-card post-loader-card shadow">
        <div className="row m-0">
          <div className="col-1 m-0 vote-col text-center">
            <div id="vote-actions-1" className="d-block vote" data-id="1">
              <div className=''>
                <div className='vote-icon upvote'>
                  <TbArrowBigTop />
                </div>
                <span className='vote-score mb-2'></span>
                <div className='vote-icon downvote'>
                  <TbArrowBigDown />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostLoader
