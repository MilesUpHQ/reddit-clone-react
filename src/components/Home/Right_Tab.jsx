import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {FaShieldAlt} from 'react-icons/fa'
import '../../css/Tabright.css'
import cover_image from '../../images/Cover-Image.jpg'
import profile_image from '../../images/profile-img.jpeg'

const account = JSON.parse(localStorage.getItem('account'))
const account_url = "http://localhost:3000"

const Right_Tab = () => {
  return (
    <div className="">
      <div className="card p-3">
        <div className="row">
          <div className="col-2">
            <i className="premium-logo"><FaShieldAlt /></i>
          </div>
          <div className="col-10">
            <p className="premium-head mb-1">Reddit Premium</p>
            <p className="premium-des">The best Reddit experience, with monthly Coins</p>
          </div>
        </div>
        <Button className="w-100 premium-join text-center mb-3 text-white">Try Now</Button>
      </div>
      <div className="card mt-3">
        <img src={cover_image} className="cover-img home-small-cover" alt="cover" />
        <div className="d-flex">
        <div className="ml-3 home-small-profile">
          {account && account.profile_image.url ? [
            <img src={`${account_url}${account.profile_image.url}`} alt="" className="home-small-profile" />
          ] : [
            <img src={profile_image} alt="" className="" />
          ]}
          
        </div>
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
