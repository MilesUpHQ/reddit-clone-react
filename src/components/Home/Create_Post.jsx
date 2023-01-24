import React from 'react'
import profile_image from '../../images/profile-img.jpeg'
import {FaImage, FaLink} from 'react-icons/fa'
import '../../css/Create_Post.css'

const Create_Post = () => {
  return (
 <div className="card p-2 pl-4 pr-3">
  <div className="row">
    <div className="col-1">
      <img src={profile_image} alt="" className="profile-img" />
    </div>
    <div className="col-9">
      <div className="create-post m-1">
        <button className="form-control">Create Post</button>
      </div>
    </div>
    <div className="col-2 create-post-img">
      <div className="d-flex gap-3"><FaImage /><FaLink /></div>
    </div>
  </div>
</div>   

  )
}

export default Create_Post
