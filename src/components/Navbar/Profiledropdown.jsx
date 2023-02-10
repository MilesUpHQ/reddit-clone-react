import React from 'react';
import '../../css/Navbar.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { AiOutlineExclamation, AiOutlineQuestionCircle } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import { FiEye } from "react-icons/fi"
import { BsPlusLg, BsCoin } from 'react-icons/bs';
import avatar_drop from '../../images/avatar-drop.png';
import { GiCheckedShield } from "react-icons/gi";
import { IoTelescopeOutline } from "react-icons/io5";
import { GrEmptyCircle } from "react-icons/gr";
import { IoIosSettings } from 'react-icons/io';
import { RxAvatar } from 'react-icons/rx'
import { TiDocumentText } from 'react-icons/ti'
import { BiLogOut } from 'react-icons/bi';

const Profiledropdown = () => {
    return (
        <div>
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
                    <Dropdown.Item href=""><span className='mod-icon'><IoTelescopeOutline /></span>Explore</Dropdown.Item>
                    <Dropdown.Item href=""><span className='mod-icon'><AiOutlineQuestionCircle /></span>Help Center</Dropdown.Item>
                    <Dropdown.Item href=""><span className='mod-icon'><AiOutlineExclamation /></span>More</Dropdown.Item>
                    <Dropdown.Item href=""><span className='mod-icon'><TiDocumentText /></span>Terms and Policies</Dropdown.Item>
                    <hr></hr>
                    <Dropdown.Item onClick={Signout}><span className='mod-icon'><BiLogOut /></span>Sign Out</Dropdown.Item>
                    <div className="mt-2 ms-2 mb-2 text-mute agreement">© 2023 Reddit, Inc.<br></br> All rights reserved</div>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default Profiledropdown
