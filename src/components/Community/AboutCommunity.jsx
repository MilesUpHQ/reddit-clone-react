import React from 'react'
import moment from 'moment'
import { Link, useParams } from 'react-router-dom'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { GiCakeSlice } from 'react-icons/gi'
import { GoPrimitiveDot } from 'react-icons/go'
import { IoShieldOutline } from 'react-icons/io5'
import reddit_logo from '../../images/reddit-logo.png'

const AboutCommunity = ({ community, isBanned, postShow }) => {
  const { id } = useParams()
  const my_account = JSON.parse(localStorage.getItem('account'))

  return (
    <div>
      <div className="card">
        <div className="rounded-top p-1 ps-3 bg-primary">
          <p className="about-community-title h6 pt-2 text-light d-flex">About Community
            {!postShow && community.account_id == my_account.id &&
              <Link to={`/r/${id}/mod`} className='text-white text-decoration-none'>
                <div className="mod">
                  <IoShieldOutline className='me-2' />
                  Mod
                </div>
              </Link>
            }
            <div className="about-community-dots me-2">
              <BiDotsHorizontalRounded />
            </div>
          </p>
        </div>
        {postShow &&
          <div className="d-flex mt-3">
            <div className="ms-3 post-header-community-img">
              {community && community.profile_image && community.profile_image.url ? [
                <img src={`http://localhost:3000${community.profile_image.url}`} alt="" />
              ] : [
                <img src={reddit_logo} alt="" />
              ]}
            </div>
            <p className='mt-2 ms-2'>r/{community.name}</p>
          </div>
        }
        <div className="about-community-summary p-2 ps-3">
          <p className='mb-3'>{community.summary}</p>
          <div className="community-created-at">
            <GiCakeSlice />
            <p className='text-muted'>Created {moment(community.created_at).fromNow()}</p>
          </div>
        </div>
        <hr className='mt-1 me-3 ms-3 mb-2' />
        <div className="ms-3 member">
          <div className="total">
            {community.total_members} 22.7m
            <p className='text-muted'>Members</p>
          </div>
          <div className="online">
            <GoPrimitiveDot className='online-dot' /> 1
            <p className='text-muted'>Online</p>
          </div>
          <div className="rank">
            #{community.id}
            <p className='text-muted'>Ranked by Size</p>
          </div>
          <div className=""></div>
        </div>
        {!isBanned ? (
          <>
            <hr className='mt-1 me-3 ms-3' />
            {postShow && <Link to={`/r/${community.id}/`} className='me-3 ms-3 join-btn'>View Community</Link>}
            <Link to='/new' className='me-3 ms-3 join-btn create-post-btn text-white'>Create Post</Link>
            <hr className='mt-3 me-3 ms-3' />
            <div className="p-3">
              <div className="row-5">
              </div>
            </div>
          </>
        ) : null
        }
      </div>
    </div>
  )
}

export default AboutCommunity
