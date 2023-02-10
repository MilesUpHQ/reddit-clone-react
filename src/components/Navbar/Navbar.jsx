import React, { useState } from 'react'
import reddit_logo from '../../images/reddit-logo.png'
import profile_image from '../../images/profile-img.jpeg'
import '../../css/Navbar.css';
import { FaStar } from "react-icons/fa";
import Autocomplete from './Select';
import Dropdown from 'react-bootstrap/Dropdown';
import SubscriptionsList from './SubscriptionsList';
import { AiFillHome, AiOutlineExclamation, AiOutlineQuestionCircle } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsShieldCheck, BsArrowUpRightCircle, BsChatLeftDots, BsChat, BsShield, BsDot, BsToggleOn, BsToggleOff } from "react-icons/bs";
import { FiEye, FiMail } from "react-icons/fi"
import { BsPlusLg, BsBell, BsCoin } from 'react-icons/bs';
import { CiCircleList } from 'react-icons/ci'
import { TbMessageCircle } from 'react-icons/tb'
import avatar_drop from '../../images/avatar-drop.png';
import { GiStarFormation, GiCheckedShield } from "react-icons/gi";
import { IoShirtOutline, IoTelescopeOutline } from "react-icons/io5";
import { GrAnnounce, GrEmptyCircle } from "react-icons/gr";
import { SlGlobeAlt } from "react-icons/sl";
import { IoIosSettings } from 'react-icons/io';
import { RxAvatar } from 'react-icons/rx'
import { TiDocumentText } from 'react-icons/ti'
import { BiLogOut } from 'react-icons/bi';
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
            <li className='d-flex p-3 navicons gap-4'>
              <BsArrowUpRightCircle />
              <BsCoin />
              <BsChatLeftDots />
              <BsShield style={{ marginTop: "-2px" }} />
              <BsChat style={{ marginTop: "-2px" }} />
              <BsBell style={{ marginTop: "-2px" }} />
              <a className = "text-dark" href = "/new" ><BsPlusLg /></a>
              <GrAnnounce style={{ marginTop: "-2px" }} />
            </li>
          </div>
          {account ? [
            <div className="d-flex gap-2">
              <Dropdown>
                <Dropdown.Toggle className='navprofile' variant="transparent text-muted" id="dropdown-basic">
                  <div className='d-flex'>
                    <img src={avatar_drop} alt="" className="profile-img-navbar mt-1" />
                    <div className='profileinfo inline mt-2'>
                      <div className='profilename'>{account.username}</div>
                      <span className='karma'><IoIosSettings className='star' />1 Karma</span>
                    </div>
                    <span className='customdropdown'><RiArrowDropDownLine /></span>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="mt-2 ms-2 mb-2 text-muted profiledrophead"><RxAvatar /> My Stuff </div>
                  <Dropdown.Item >Online Status<span className='on'><BsToggleOn /></span></Dropdown.Item>
                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item href="/profile">Style Avatar</Dropdown.Item>
                  <Dropdown.Item href="/settings">User Settings</Dropdown.Item>
                  <hr></hr>
                  <div className="mt-2 ms-2 mb-2 text-muted profiledrophead"><FiEye /> View Mode </div>
                  <Dropdown.Item href="">Mod Mode<span className='on2'><BsToggleOn /></span></Dropdown.Item>
                  <Dropdown.Item href="">Dark Mode<span className='off'><BsToggleOff /></span></Dropdown.Item>
                  <hr></hr>
                  <Dropdown.Item href={account ? "/r/new/" : "/signin"}><span className='mod-icon'><BsPlusLg /></span>Create a Community</Dropdown.Item>
                  <Dropdown.Item href=""><span className='mod-icon'><BsCoin /></span>Coins</Dropdown.Item>
                  <Dropdown.Item href=""><span className='mod-icon star'><GiCheckedShield /></span>Premium</Dropdown.Item>
                  <Dropdown.Item href=""><span className='mod-icon'><GrEmptyCircle /></span>Talk</Dropdown.Item>
                  <Dropdown.Item href=""><span className='mod-icon'><IoTelescopeOutline/></span>Explore</Dropdown.Item>
                  <Dropdown.Item href=""><span className='mod-icon'><AiOutlineQuestionCircle/></span>Help Center</Dropdown.Item>
                  <Dropdown.Item href=""><span className='mod-icon'><AiOutlineExclamation/></span>More</Dropdown.Item>
                  <Dropdown.Item href=""><span className='mod-icon'><TiDocumentText/></span>Terms and Policies</Dropdown.Item>
                  <hr></hr>
                  <Dropdown.Item onClick={Signout}><span className='mod-icon'><BiLogOut/></span>Sign Out</Dropdown.Item>
                  <div className="mt-2 ms-2 mb-2 text-mute agreement">© 2023 Reddit, Inc.<br></br> All rights reserved</div>
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
