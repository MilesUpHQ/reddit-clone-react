import React, { useState } from 'react'
import reddit_logo from '../../images/reddit-logo.png'
import profile_image from '../../images/profile-img.jpeg'
import '../../css/Navbar.css';
import { FaStar } from "react-icons/fa";
import Autocomplete from './Select';
import Dropdown from 'react-bootstrap/Dropdown';
import SubscriptionsList from './SubscriptionsList';
import { AiFillHome } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsShieldCheck, BsArrowUpRightCircle } from "react-icons/bs";
import { FiMail } from "react-icons/fi"
import { BsPlusLg, BsBell, BsCoin } from 'react-icons/bs';
import { CiCircleList } from 'react-icons/ci'
import { TbMessageCircle } from 'react-icons/tb'
import avatar_drop from '../../images/avatar-drop.png';
import { GiStarFormation, GiCheckedShield } from "react-icons/gi";
import { IoShirtOutline } from "react-icons/io5";
import { GrEmptyCircle } from "react-icons/gr";
import { SlGlobeAlt } from "react-icons/sl";

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
      <div className="bg-white mr-auto">
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="navbar-nav">
            <img src={reddit_logo} alt="" className="navbar-brand" width="35" height="45" />
            <a href="/" className="navbar-brand-name">reddit</a>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <Dropdown>
            <Dropdown.Toggle className="navhome" variant="transparent" id="dropdown-basic">
              <span className='homedrop'><span className='homeicon'><AiFillHome /></span>Home</span><span className='customdrop'><RiArrowDropDownLine /></span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <div className="mt-2 ms-2 mb-2 text-muted drophead"> MODERATING </div>
              <Dropdown.Item href=""><span className='mod-icon'><BsShieldCheck /></span>Mod Queue</Dropdown.Item>
              <Dropdown.Item href=""><span className='mod-icon'><FiMail /></span>Modmail</Dropdown.Item>
              <Dropdown.Item href=""><span className='mod-icon'><BsShieldCheck /></span>r/Mod</Dropdown.Item>
              <div className="mt-2 ms-2 mb-2 text-muted drophead"> YOUR COMMUNITIES </div>
              <Dropdown.Item href={account ? "/r/new/" : "/signin"}><span className='mod-icon'><BsPlusLg /></span>Create Community</Dropdown.Item>
              {account && <SubscriptionsList accountId={account.id} />}
              <div className="mt-2 ms-2 mb-2 text-muted drophead"> FEEDS </div>
              <Dropdown.Item href="/"><span className='mod-icon'><AiFillHome /></span>Home</Dropdown.Item>
              <Dropdown.Item href="/"><span className='mod-icon'><BsArrowUpRightCircle /></span>Popular</Dropdown.Item>
              <Dropdown.Item href="/"><span className='mod-icon'><CiCircleList /></span>All</Dropdown.Item>
              <Dropdown.Item href="/"><span className='mod-icon'><TbMessageCircle /></span>Happening Now</Dropdown.Item>
              <div className="mt-2 ms-2 mb-2 text-muted drophead"> OTHERS </div>
              <Dropdown.Item href="/"><img src={avatar_drop} className='community-icon mod-icon' alt="" />User Settings</Dropdown.Item>
              <Dropdown.Item href="/"><img src={avatar_drop} className='community-icon mod-icon' alt="" />Messages</Dropdown.Item>
              <Dropdown.Item href={account ? "/new" : "/signin"}><span className='mod-icon'><BsPlusLg /></span>Create Post</Dropdown.Item>
              <Dropdown.Item href=""><span className='mod-icon'><BsBell /></span>Notifications</Dropdown.Item>
              <Dropdown.Item href=""><span className='mod-icon star'><GiStarFormation /></span>Community Hubs</Dropdown.Item>
              <Dropdown.Item href=""><span className='mod-icon'><BsCoin /></span>Coins</Dropdown.Item>
              <Dropdown.Item href=""><span className='mod-icon star'><GiCheckedShield /></span>Premium</Dropdown.Item>
              <Dropdown.Item href=""><span className='mod-icon'><IoShirtOutline /></span>Avatar</Dropdown.Item>
              <Dropdown.Item href=""><span className='mod-icon'><GrEmptyCircle /></span>Talk</Dropdown.Item>
              <Dropdown.Item href=""><span className='mod-icon'><SlGlobeAlt /></span>Predictions</Dropdown.Item>
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
