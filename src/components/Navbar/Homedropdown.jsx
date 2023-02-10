import React from 'react'
import '../../css/Navbar.css';
import Dropdown from 'react-bootstrap/Dropdown';
import SubscriptionsList from './SubscriptionsList';
import { AiFillHome } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsShieldCheck, BsArrowUpRightCircle} from "react-icons/bs";
import { FiEye, FiMail } from "react-icons/fi"
import { BsPlusLg, BsBell, BsCoin } from 'react-icons/bs';
import { CiCircleList } from 'react-icons/ci'
import { TbMessageCircle } from 'react-icons/tb'
import avatar_drop from '../../images/avatar-drop.png';
import { GiStarFormation, GiCheckedShield } from "react-icons/gi";
import { IoShirtOutline} from "react-icons/io5";
import { GrEmptyCircle } from "react-icons/gr";
import { SlGlobeAlt } from "react-icons/sl";

const Homedropdown = () => {
  return (
    <div>
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
    </div>
  )
}

export default Homedropdown
