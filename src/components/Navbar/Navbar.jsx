import React, { useState} from 'react'
import reddit_logo from '../../images/reddit-logo.png'
import profile_image from '../../images/profile-img.jpeg'
import '../../css/Navbar.css';
import { FaStar } from "react-icons/fa";
//import { Multiselect } from 'multiselect-react-dropdown';
import Dropdown from 'react-bootstrap/Dropdown';


const navbar = () => {
  const data=[
    {Title: "First" , id: 1},
    {Title: "Second" , id: 2}
  ]
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
              <Dropdown.Item href="#/action-3"><img src={profile_image} alt="" className="profile-img" /> My Communities</Dropdown.Item>
              <Dropdown.Item href="/r/new">Create a Community</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <form action="get">
                  <div className="nav-item dropdown">
                    <input type="text" className="search-input-navbar form-control myInput_mycommunities navbar-redirection" placeholder="Search" />
                  </div>
                </form>
              </li>
            </ul>
          </div>

          <div className="karma">
            2
            <FaStar className= '  text-warning' />
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="transparent nav-link text-muted" id="dropdown-basic">
                <img src={profile_image} alt="" className="profile-img-navbar" />
                Username
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/profile">Profile</Dropdown.Item>
              <Dropdown.Item href="/settings">Settings</Dropdown.Item>
              <Dropdown.Item href="/sign-out">Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="/signup" className="nav-link">Sign Up</a>
            </li>
            <li className="nav-item">
              <a href="/signin" className="nav-link">Log In</a>
            </li>
          </ul>
        </nav>
      </div >
    </div >
  )
}

export default navbar
