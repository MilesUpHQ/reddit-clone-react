import React from 'react'
import Postform from './Postform'
import Draft from './Draft'
import '../../css/post.css'
import post_new_avatar from '../../images/reddit_avatar.png'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const NewPost = () => {
  return (
    <div>
      <div className="community_post pb-5">
        <div className="row">
          <div className="col-8">
            <div className="row new_post_head pb-1">
              <div className="col-10 p-0">
                <h5 className="">Create Post</h5>
              </div>
              <div className="col-2 p-0">
                <Draft />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <Postform />
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card mt-4">
              <div className="d-flex mt-3">
                <div className="ms-3 post-header-community-img">
                  <img src={post_new_avatar} alt="" />
                </div>
                <p className='mt-3 ms-2 post-new-rules-head'>Posting to Reddit</p>
              </div>
              <hr className='mt-1 me-4 ms-4 mb-2 post-new-hr-line' />
              <ol className='ms-3 post-new-rules-list'>
                <li>Remember the human</li>
                <hr className='mt-3 me-4 mb-1 post-new-hr-line' />
                <li>Behave like you would in real life</li>
                <hr className='mt-3 me-4 mb-1 post-new-hr-line' />
                <li>Look for the original source of content</li>
                <hr className='mt-3 me-4 mb-1 post-new-hr-line' />
                <li>Search for duplicates before posting</li>
                <hr className='mt-3 me-4 mb-1 post-new-hr-line' />
                <li>Read the community's rules</li>
                <hr className='mt-3 me-4 mb-1 post-new-hr-line' />
              </ol>
            </div>
            <p className='content-policy text-muted'>
              Please be mindful of reddit's
              <Link to='' className='text-decoration-none'> content policy</Link><br />
              and practice good
              <Link to='' className='text-decoration-none'> reddiquette</Link>
              .
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default NewPost
