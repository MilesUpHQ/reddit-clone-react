import React from 'react'
import { Link } from 'react-router-dom';
import profile_image from '../../images/profile-img.jpeg'
import { CiImageOn } from 'react-icons/ci'
import { HiOutlineLink } from 'react-icons/hi'
import '../../css/Create_Post.css'

const account = JSON.parse(localStorage.getItem('account'))
const account_url = "http://localhost:3000"
const Create_Post = () => {
  return (
    <div className="card p-1 pl-3 pr-3 mb-3">
      <div className="row">
        <div className="col-1">
          <div className="mt-1 mb-1 profile-img">
            {account && account.profile_image && account.profile_image.url ? [
              <img src={`${account_url}${account.profile_image.url}`} alt="" />
            ] : [
              <img src={profile_image} alt="" />
            ]}
          </div>
        </div>
        <div className="col-9">
          <div className="create-post">
            <Link to="/new" className="form-control">Create Post</Link>
          </div>
        </div>
        <div className="col-2 pe-2">
          <div className="create-post-img">
            <Link to=''><CiImageOn /></Link>
            <Link to=''><HiOutlineLink /></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create_Post
