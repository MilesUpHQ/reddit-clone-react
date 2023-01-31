import React from 'react'
import { Link } from 'react-router-dom';
import profile_image from '../../images/profile-img.jpeg'
import { FaImage, FaLink } from 'react-icons/fa'
import '../../css/Create_Post.css'

const Create_Post = () => {
  return (
    <div class="card p-1 pl-3 pr-3 mb-3">
      <div class="row">
        <div class="col-1">
          <div className="profile-img">
            <img src={profile_image} alt="" className="profile-img" />
          </div>
        </div>
        <div class="col-9">
          <div class="create-post m-1">
            <Link to="/new" className="form-control">Create post</Link>
          </div>
        </div>
        <div class="col-2 create-post-img">
          <div className="d-flex gap-3">
            <FaImage />
            <FaLink />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create_Post
