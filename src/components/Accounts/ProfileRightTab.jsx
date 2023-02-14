import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { GiCheckedShield } from 'react-icons/gi'
import '../../css/Tabright.css'
import reddit_home_avatar from '../../images/reddit_home_avatar.png'

const account = JSON.parse(localStorage.getItem('account'))
const account_url = "http://localhost:3000"

const Right_Profile_Tab = () => {
  return (
    <div>
      <div className=''>
        <div className="card">
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
          <Link to="/new" className="join-btn create-post-btn text-white">New post</Link>
        </div>
        <div className="card mt-3">
          <div className="policy d-flex">
            <div className="terms">
              User Agreement<br />
              Privacy Policy<br />
            </div>
            <div className="terms">
              Content Policy<br />
              Moderator code of conduct<br />
            </div>
          </div>
          <div className="policy d-flex">
            <div className="terms">
              English<br />
              Français<br />
              Italiano<br />
            </div>
            <div className="terms">
              Deutsch<br />
              Español<br />
              Português<br />
            </div>
          </div>
          <p className='rights'>Reddit Inc © 2023. All rights reserved</p>
        </div>
      </div>
    </div >
  )
}

export default Right_Profile_Tab;
