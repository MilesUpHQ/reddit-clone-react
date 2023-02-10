import React from 'react'
import reddit_logo from '../../images/reddit-logo.png'
import '../../css/Navbar.css';
import Autocomplete from './Select';
import { BsArrowUpRightCircle, BsChatLeftDots, BsChat, BsShield } from "react-icons/bs";
import { BsPlusLg, BsBell, BsCoin } from 'react-icons/bs';
import { GrAnnounce} from "react-icons/gr";
import Homedropdown from './Homedropdown';
import Profiledropdown from './Profiledropdown';

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
          <Homedropdown />
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
              <a className="text-dark" href="/new" ><BsPlusLg /></a>
              <GrAnnounce style={{ marginTop: "-2px" }} />
            </li>
          </div>
          {account ? [
            <div className="d-flex gap-2">
              <Profiledropdown />
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
