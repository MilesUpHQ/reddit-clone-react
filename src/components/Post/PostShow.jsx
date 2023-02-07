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
  const location = useLocation();
  const account = JSON.parse(localStorage.getItem('account'))
  let { id, community_id } = useParams();
  const Post_URL = `http://localhost:3000/api/v1/communities/${community_id}/posts/`;

  function get_post_data(post_id) {
    return axios.get(Post_URL + post_id).then((response) => response.data)
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
      {post.title ? (
        <div>
          <div className="show_post">
            <div className="container mt-5">
              <div className="row">
                <div className="col-sm-8">
                  <div className="card mb-3 ">
                    <div className="show-content mt-1">
                      <div className="col-0 ms-3 mt-2" >
                        <VotesHandler
                          post={post}
                          communityId={post.community_id}
                          postId={post.id}
                          voteCount={post.vote_count}
                        />
                      </div>
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
                        <strong><h2 className="ms-2">{post.title}</h2> </strong>
                      </div>
                    </div>
                    <div className="" key={post.id}>
                      <div className='mt-4 ms-5'>
                        {console.log(post.account_id)}
                        <Markup content={post.body}></Markup>
                        {post.isclosed ? null : <Reactions Post_URL={Post_URL} get_post_data={get_post_data} />}
                      </div>
                      {post.isClosed ? (
                        <p className="card-body" style={{ fontSize: '20px', color: 'red' }}>
                          Post Closed By Admin. For further Details Contact Admin
                        </p>
                      ) : (
                        account ? (
                          <Form parent={null} commentId={null} />
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
                      )}

                    </div>
                    <div className="commentssection">
                      <Comments post={post} parent={null} highlight={highlight} />
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