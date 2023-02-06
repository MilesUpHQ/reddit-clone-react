import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaBirthdayCake, FaRegStickyNote } from 'react-icons/fa'
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
  let { id } = useParams();

  function get_community_data(community_id) {
    return axios.get(Community_URL + community_id, {
      params: {
        account_id: my_account.id
      }
    }).then((response) => {
      return response.data
    }).catch((error) => {
      console.log(error)
      navigate('/')
    })
  }

  useEffect(() => {
    let mounted = true;
    get_community_data(id).then((items) => {
      if (mounted) {
        setCommunity(items);
        setPosts(items.posts);
        setAccount(items.account);
        checkIsSubscribed(items.subscriptions)
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
    <div>
      {community.cover_image && community.cover_image.url ? [
        <img src={`http://localhost:3000${community.cover_image.url}`} className="cover-image"></img>
      ] : [
        <img src={cover_image} className="cover-image"></img>
      ]}
      <div className="row gap-3">
        <div className="col-1">
          {community.profile_image && community.profile_image.url ? [
            <img src={`http://localhost:3000${community.profile_image.url}`} className='profile-pic' alt="" />
          ] : [
            <img src={reddit_logo} className='profile-pic' alt="" />
          ]}
        </div>
        <div className="col-10">
          <div className="d-flex">
            <span className="ml-4">
              <h3>/r/{community.name} : {community.category}</h3>
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
            <Create_Post />
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
            <div className="card p-2 bg-primary">
              <p className="h6 pt-2 text-light">About this community</p>
            </div>
            <div className="card p-3">
              <div className="row-5">
                <Link to={`/r/${id}/mod`} className='btn btn-primary col-2 m-2'>Mod Tools</Link>
                <Button className='col-2 m-2' onClick={deleteCommunityHandler}>Delete</Button>
              </div>
              <p className="text-muted"><i className='mr-2 '><FaBirthdayCake /></i> Created {moment(community.created_at).fromNow()}</p>
              <div className="member">
                <p>
                  MEMBERS : {community.total_members} 0 count
                </p>
              </div>
            </div>
            <div className="card mt-3 p-2 bg-primary">
              <p className="h6 pt-2 text-light"> {community.name}'s Rules</p>
            </div>
            <div className="card p-3">
              <p className="card-text"><FaRegStickyNote /> {community.rules}</p>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}
export default ShowCommunity
