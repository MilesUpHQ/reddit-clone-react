import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {FaShieldAlt} from 'react-icons/fa'
import '../../css/Tabright.css'
import reddit_cover from '../../images/reddit_cover_half.jpg'
import reddit_home_avatar from '../../images/reddit_home_avatar.png'

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
        <img src="https://www.redditstatic.com/desktop2x/img/id-cards/home-banner@2x.png" className="cover-img home-small-cover" alt="cover" />
        <div className="d-flex">
         <div className="ml-3 home-avatar">
          <img src={reddit_home_avatar} />    
         </div>
          <p className="home">Home</p>
        </div>
        <div className="ml-3 mt-0">
          <p className="front">Your personal Reddit frontpage. Come here to check in with your favorite communities.</p>
          <hr className='mt-3 me-3 ms-3' />
        </div>
        <Link to="/new" className="join-btn create-post-btn text-white">Create post</Link>
        <Link to={account ? "/r/new/" : "/signin"} className="join-btn text-center mb-3">Create Community</Link>
      </div>
    </div>
  )
}

export default Right_Tab;
