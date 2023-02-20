import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../css/Community.css'
import JoinButton from './joinButton';
import cover_image from '../../images/Cover-Image.jpg';
import reddit_logo from '../../images/reddit-logo.png'
import PostList from '../Post/PostList';
import CreatePost from '../Home/CreatePost';
import Nocommunity from './Nocommunity';
import AboutCommunity from './AboutCommunity';
import RulesCommunity from './RulesCommunity';
import PostLoader from './PostLoader';
const Community_URL = 'http://localhost:3000/api/v1/communities/'
const my_account = JSON.parse(localStorage.getItem('account'))

const ShowCommunity = () => {
  const [community, setCommunity] = useState([]);
  const [posts, setPosts] = useState([]);
  const [account, setAccount] = useState([]);
  const [subscribeId, setSubscribeId] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(false)
  let { id } = useParams();

  const get_community_data = (community_id) => {
    return axios.get(`${Community_URL}${community_id}?page=${page}`).then((response) =>
      response.data
    ).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    let mounted = true;
    window.addEventListener('scroll', handleScroll);
    get_community_data(id).then((items) => {
      if (mounted) {
        if (items.posts.length === 0) {
          setLastPage(true)
          window.removeEventListener('scroll', handleScroll);
        }
        if (page === 1) {
          setCommunity(items.community);
          setAccount(items.account);
          checkIsSubscribed(items.subscriptions);
          checkIsBanned(items.banned_users)
        }
        setPosts(posts.concat(items.posts));
      }
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      mounted = false
    };
  }, [page]);

  const handleScroll = () => {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
      setPage(page + 1)
    }
  }

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
                  <JoinButton subscribeId={subscribeId} setSubscribeId={setSubscribeId} isSubscribed={isSubscribed} setIsSubscribed={setIsSubscribed} />
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
                {!isBanned && [<CreatePost />]}
                <div className="tab-content">
                  <div id="post" className="tab-pane fade-in active">
                    <div>
                      <PostList account={account} community={community} posts={posts} />
                      { !lastPage && <PostLoader /> }
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
                <AboutCommunity community={community} isBanned={isBanned} />
                <RulesCommunity community={community} />
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
