import React from 'react';
import { Link } from 'react-router-dom';
import {FaShieldAlt} from 'react-icons/fa'
import '../../css/Tabright.css'
import cover_image from '../../images/Cover-Image.jpg'
import profile_image from '../../images/profile-img.jpeg'

const Right_Tab = () => {
  return (
    <div className="col-8">
      <div className="card p-3">
        <div className="row">
          <div className="col-2">
            <p className="premium-logo"><FaShieldAlt /></p>
          </div>
          <div className="col-10">
            <p className="premium-head mb-1">Reddit Premium</p>
            <p className="premium-des">The best Reddit experience, with monthly Coins</p>
          </div>
        </div>
        <div className="premium-join">
          <button className="join-btn text-center mb-3 text-white">Try Now</button>
        </div>
      </div>
      <div className="card mt-3">
        <img src={cover_image} className="cover-img home-small-cover" alt="cover" />
        <div className="d-flex">
          <img src={profile_image} className="ml-3 home-small-profile" alt="profile" />
          <p className="mt-3 home"><b>Home</b></p>
        </div>
        <div className="ml-3 mt-0">
          <p className="front">Your personal Reddit frontpage. Come here to check in with your favorite communities.</p>
        </div>
        <Link to="/new" className="join-btn create-post-btn text-white">Create post</Link>
        <Link to="r/new/" className="join-btn text-center mb-3">Create Community</Link>
      </div>
    </div>
  )
}

export default Right_Tab;
