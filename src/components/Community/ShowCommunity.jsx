
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { IoShieldOutline } from 'react-icons/io5'
import { GoPrimitiveDot } from 'react-icons/go'
import { GiCakeSlice } from 'react-icons/gi'
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import '../../css/Community.css'
import JoinButton from './joinButton';
import cover_image from '../../images/Cover-Image.jpg';
import reddit_logo from '../../images/reddit-logo.png'
import moment from 'moment/moment';
import { confirmAlert } from 'react-confirm-alert';
import PostList from '../Post/PostList';
import Create_Post from '../Home/Create_Post';
import Nocommunity from './Nocommunity';
const Community_URL = 'http://localhost:3000/api/v1/communities/'
const my_account = JSON.parse(localStorage.getItem('account'))

function delete_community(community_id) {
  return axios.delete(Community_URL + community_id).then((response) => response.data)
}

const ShowCommunity = () => {
  const [community, setCommunity] = useState([]);
  const [posts, setPosts] = useState([]);
  const [account, setAccount] = useState([]);
  const [subscribeId, setSubscribeId] = useState(0);
  const [isSubribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate()
  const [isBanned, setIsBanned] = useState(false);
  let { id } = useParams();

  function get_community_data(community_id) {
    return axios.get(Community_URL + community_id).then((response) => {
      return response.data
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    let mounted = true;
    get_community_data(id).then((items) => {
      if (mounted) {
        setCommunity(items);
        setPosts(items.posts);
        setAccount(items.account);
        checkIsSubscribed(items.subscriptions);
        checkIsBanned(items.banned_users)
      }
    });
    return () => (mounted = false);
  }, []);

  const checkIsSubscribed = (subscriptions) => {
    setSubscribeId(subscriptions[0].id)
    {
      subscriptions.map((sub) => (
        sub.account_id == my_account.id && setIsSubscribed(true)
      ))
    }
  }

  const checkIsBanned = (banned_users) => {
    banned_users.map((ban) => (
      ban.account_id == my_account.id && setIsBanned(true)
    ))
  }

  const deleteCommunityHandler = () => {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            delete_community(community.id)
            toast.success("Community Deleted!");
            navigate('/')
          }
        },
        {
          label: 'No'
        }
      ]
    });
    console.log("Delete")
  }

  return (
    <>
      {community ? (
        <div>
          <div className="cover-image">
            {community.cover_image && community.cover_image.url ? [
              <img src={`http://localhost:3000${community.cover_image.url}`}></img>
            ] : [
              <img src={cover_image}></img>
            ]}
          </div>
          <div className="row gap-3">
            <div className="col-2">
              <div className="profile-pic">
                {community.profile_image && community.profile_image.url ? [
                  <img src={`http://localhost:3000${community.profile_image.url}`} alt="" />
                ] : [
                  <img src={reddit_logo} alt="" />
                ]}
              </div>
            </div>
            <div className="col-9">
              <div className="d-flex gap-4">
                <span className="ml-4">
                  <h4 className='mt-1 community-title'>/r/{community.name} : {community.category}</h4>
                  <p className='text-muted small-community-title'>r/{community.name}</p>
                </span>
                <div className="pl-2">
                  <JoinButton subscribeId={subscribeId} setSubscribeId={setSubscribeId} isSubribed={isSubribed} setIsSubscribed={setIsSubscribed} />
                </div>
              </div>
            </div>
          </div>
          <div className="community-nav-tab">
            <ul className="nav">
              <li className="community-nav-link m-0 active">
                <a data-toggle="tab" className='text-decoration-none' href="#post">Posts</a></li>
            </ul>
          </div>
          <div className="community_post">
            <div className="row">
              <div className="col-sm-8">
                {!isBanned ? [<Create_Post />] : []}
                <div className="tab-content">
                  <div id="post" className="tab-pane fade-in active">
                    <div>
                      <PostList account={account} community={community} posts={posts} />
                    </div>
                  </div>
                  <div id="menu1" className="tab-pane fade">
                    <h3>Menu 1</h3>
                    <p>Some content in menu 1.</p>
                  </div>
                  <div id="menu2" className="tab-pane fade">
                    <h3>Menu 2</h3>
                    <p>Some content in menu 2.</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card">
                  <div className="rounded-top p-1 ps-3 bg-primary">
                    <p className="about-community-title h6 pt-2 text-light d-flex">About Community
                      {community.account_id == my_account.id &&
                        <Link to={`/r/${id}/mod`} className='text-white text-decoration-none'>
                          <div className="mod">
                            <IoShieldOutline className='me-2' />
                            Mod
                          </div>
                        </Link>
                      }
                      <div className="about-community-dots me-2">
                        <BiDotsHorizontalRounded />
                      </div>
                    </p>
                  </div>
                  <div className="about-community-summary p-2 ps-3">
                    <p className='mb-3'>{community.summary}</p>
                    <div className="community-created-at">
                      <GiCakeSlice />
                      <p className='text-muted'>Created {moment(community.created_at).fromNow()}</p>
                    </div>
                  </div>
                  <hr className='mt-1 me-3 ms-3 mb-2' />
                  <div className="ms-3 member">
                    <div className="total">
                      {community.total_members} 22.7m
                      <p className='text-muted'>Members</p>
                    </div>
                    <div className="online">
                      <GoPrimitiveDot className='online-dot' /> 1
                      <p className='text-muted'>Online</p>
                    </div>
                    <div className="rank">
                      #{community.id}
                      <p className='text-muted'>Ranked by Size</p>
                    </div>
                    <div className=""></div>
                  </div>
                { !isBanned ? ( 
                 <> 
                  <hr className='mt-1 me-3 ms-3' />
                  <Link to='/r/new' className='me-3 ms-3 join-btn create-post-btn text-white'>Create Post</Link>
                  <hr className='mt-3 me-3 ms-3' />
                  <div className="p-3">
                    <div className="row-5">
                    </div>
                  </div>
                 </> 
                ): null
                } 
                </div>
                <div className="card mt-3">
                  <div className="rounded-top p-2 ps-3 bg-primary">
                    <p className="about-community-title h6 pt-2 text-light"> r/{community.name}'s Rules</p>
                  </div>
                  <div className=" p-3">
                    <p className="card-text">1. {community.rules}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Nocommunity />
      )}
    </>
  )
}
export default ShowCommunity
