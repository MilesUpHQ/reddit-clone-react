import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link, useLocation } from 'react-router-dom';
import Reactions from './Reactions';
import CommunityDetails from './CommunityDetails';
import Form from '../Comment/Form';
import reddit_logo from '../../images/reddit-logo.png'
import { Markup } from 'interweave';
import '../../css/post.css'
import Comments from './Comments';
import moment from 'moment';
import 'react-quill/dist/quill.snow.css';
import VotesHandler from './VotesHandler';
import Nopost from './Nopost';

const PostShow = () => {
  const [post, setPost] = useState([]);
  const [highlight, setHighlight] = useState("");
  const [isBanned, setIsBanned] = useState(false);
  const location = useLocation();
  const account = JSON.parse(localStorage.getItem('account'))
  let { id, community_id } = useParams();
  const Post_URL = `http://localhost:3000/api/v1/communities/${community_id}/posts/`;
  const Community_URL = `http://localhost:3000/api/v1/communities/`;

  function get_post_data(post_id) {
    return axios.get(Post_URL + post_id).then((response) => response.data)
  }

  function get_community_data(community_id) {
    return axios.get(Community_URL + community_id).then((response) => {
      return response.data
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    let mounted = true;
    get_community_data(community_id).then((items) => {
      if (mounted) {
        checkIsBanned(items.banned_users)
      }
    });
    return () => (mounted = false);
  }, []);

  const checkIsBanned = (banned_users) => {
    banned_users.map((ban) => (
      ban.account_id == account.id && setIsBanned(true)
    ))
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setHighlight(queryParams.get("highlight") || "");
  }, [location.search]);

  useEffect(() => {
    let mounted = true;
    get_post_data(id).then((items) => {
      if (mounted) {
        setPost(items);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <>
      <div className="row post-show-header">
        <div className="col-4">
          <div className="community-img">
            <div className="post-header-community-img">
              {post.community && post.community.profile_image && post.community.profile_image.url ? [
                <img src={`http://localhost:3000${post.community.profile_image.url}`} alt="" />
              ] : [
                <img src={reddit_logo} alt="" />
              ]}
            </div>
            <h5 className='mt-2 ms-2 text-center post-header-community'>r/{post.community && post.community.name}</h5>
          </div>
        </div>
      </div>
      <div className="row post-show-nav-tab">
        <ul className="nav">
          <li className="post-show-nav-link m-0 active">
            <a data-toggle="tab" className='text-decoration-none' href="#post">Posts</a></li>
        </ul>
      </div>
      <div className="show_post">
        <div className="row mt-3">
          <div className="col-8 card rounded shadow mb-3">
            <div className="row">
              <div className="col-1 m-0 text-center">
                <div id="vote-actions-1" className="d-block vote" data-id="1">
                  <VotesHandler
                    post={post}
                    communityId={post.community_id}
                    postId={post.id}
                    voteCount={post.vote_count}
                  />
                </div>
              </div>
              <div className="col-11">
                <div className="ms-2">
                  <div className="row w-100 d-flex justify-content-between">
                    <p key={post.id} className='w-auto post-show-posted-by text-muted'>
                      Posted by <Link to='/' className='text-muted text-decoration-none'>u/{post.account && post.account.username}</Link> {moment(post.created_at).fromNow()}
                    </p>
                  </div>
                  <div className="row mt-1">
                    <h5 className='m-0 p-0'>{post.title}</h5>
                  </div>
                  <div className="row mt-3">
                    <div className="col-12 m-0 post-show-body">
                      <Markup className='m-0 p-0 mr-3' content={post.body}></Markup>
                    </div>
                  </div>
                </div>
                {post.isclosed ? null : <Reactions post={post} />}
                <div className="row">
                  {account ? (
                    ((!post.isclosed) && !isBanned) ? (<Form parent={null} commentId={null} />) : null
                  ) : (
                    <div className='pe-5'>
                      <div className='card mt-3 mb-3'>
                        <div className="p-2 d-flex">
                          <h6 className="pt-2 text-muted">Log in or sign up to leave a comment</h6>
                          <Link to="/signin"><div className="join-btn ms-5">Log In</div></Link>
                          <Link to="/signup"><div className="join-btn">Sign Up</div></Link>
                        </div>
                      </div>
                    </div>
                  )}
                  <hr className='mt-2' />
                </div>
              </div>
              <div className="mt-1">
                <Comments post={post} parent={null} highlight={highlight} isBanned={isBanned} />
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <CommunityDetails post={post} />
          </div>
        </div>
      </div>






      {post.title ? (
        <div>
          <div className="show_post">
            <div className="mt-5">
              <div className="row">
                <div className="col-sm-8">
                  <div className="card shadow mb-3">
                    <div className="show-content mt-1">
                      <div className="row">
                        <div className="col-1 m-0 rounded-left vote-col text-center">
                          <div id="vote-actions-1" className="d-block vote" data-id="1">
                            <VotesHandler
                              post={post}
                              communityId={post.community_id}
                              postId={post.id}
                              voteCount={post.vote_count}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-11">


                        <div className="post-head ms-3">
                          <div className="row">
                            <p key={post.id}>
                              {post.community && post.community.profile_image && post.community.profile_image.url ? [
                                <img src={`http://localhost:3000${post.community.profile_image.url}`} alt="" className="post-list-profile-img mr-1" />
                              ] : [
                                <img src={reddit_logo} alt="" className="post-list-profile-img mr-1" />
                              ]}
                              <strong><Link to={`/r/${community_id}`} className="text-dark">r/{post.community && post.community.name}</Link></strong>
                              <small> Posted by{' '}<Link to='/'> u/{post.account && post.account.username} </Link>{moment(post.created_at).fromNow()}</small>
                            </p>
                          </div>
                          <strong><h2>{post.title}</h2> </strong>
                        </div>
                      </div>
                    </div>
                    <div className="" key={post.id}>
                      <div className='ms-5'>
                        <div className='mb-3'><Markup content={post.body}></Markup></div>
                        {post.isclosed ? null : <Reactions post={post} />}
                      </div>
                      {post.isclosed ? <aside className="card-body" style={{ fontSize: '20px', color: 'red', textAlign: 'center' }}>
                        Post Closed By Moderator due to Various reasons. For further Details Contact Admin</aside>
                        : null}
                      {account ? (
                        ((!post.isclosed) && !isBanned) ? (<Form parent={null} commentId={null} />) : null
                      ) : (
                        <div className='col mx-5'>
                          <div className='card mt-3'>
                            <div className="p-2" style={{ display: 'flex' }}>
                              <h6 className="pt-2 text-muted">Log in or sign up to leave a comment</h6>
                              <Link to="/signin"><div className="join-btn ms-5">Log In</div></Link>
                              <Link to="/signup"><div className="join-btn">Sign Up</div></Link>
                            </div>
                          </div>
                        </div>
                      )
                      }
                    </div>
                    <div className="commentssection">
                      <Comments post={post} parent={null} highlight={highlight} isBanned={isBanned} />
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <CommunityDetails post={post} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Nopost />
      )
      }
    </>
  )
}
export default PostShow
