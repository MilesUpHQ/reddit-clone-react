import React, { useState } from 'react'
import reddit_logo from '../../images/reddit-logo.png'
import profile_image from '../../images/profile-img.jpeg'
import '../../css/Navbar.css';
import { FaStar } from "react-icons/fa";
import Autocomplete from './Select';
import Dropdown from 'react-bootstrap/Dropdown';
import SubscriptionsList from './SubscriptionsList';


const navbar = () => {
  const data = [
    { Title: "First", id: 1 },
    { Title: "Second", id: 2 }
  ]
  const account = JSON.parse(localStorage.getItem('account'))
  const account_url = "http://localhost:3000"
  const Signout = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className=''>
      <div className="p-1 bg-light mr-auto">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="navbar-nav">
            <img src={reddit_logo} alt="" className="navbar-brand" width="35" height="45" />
            <a href="/" className="navbar-brand">Reddit Clone</a>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <Dropdown>
            <Dropdown.Toggle variant="transparent" id="dropdown-basic">
              Home
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/r">All Communities</Dropdown.Item>
              <Dropdown.Item href="/r/">Top Trending</Dropdown.Item>
              <div className="mt-2 ms-2 mb-2 text-muted"> My Communities</div>
              <Dropdown.Item href={account ? "/r/new/" : "/signin"}>Create Community</Dropdown.Item>
            {account && <SubscriptionsList accountId={account.id} />}
          </Dropdown.Menu>
        </Dropdown>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <form action="get">
                <div className="">
                  < Autocomplete />
                </div>
              </form>
            </li>
          </ul>
        </div>

        {account ? [
          <div className="d-flex gap-2">
            <div className="karma">
              2
              <FaStar className='  text-warning' />
            </div>
            <Dropdown>
              <Dropdown.Toggle variant="transparent nav-link text-muted" id="dropdown-basic">
                {account && account.profile_image && account.profile_image.url ? [
                  <img src={`${account_url}${account.profile_image.url}`} alt="" className="profile-img-navbar" />
                ] : [
                  <img src={profile_image} alt="" className="profile-img-navbar" />
                ]}
                {account.username}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                <Dropdown.Item onClick={Signout}>Sign Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ] : [
          <div className="">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="/signup" className="nav-link">Sign Up</a>
              </li>
              <li className="nav-item">
                <a href="/signin" className="nav-link">Log In</a>
              </li>
            </ul>
          </div>
        ]}

      </nav>
    </div >
    </div >
  )
}

export default navbar
