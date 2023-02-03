import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link,useLocation } from 'react-router-dom';
import Reactions from './Reactions';
import CommunityDetails from './CommunityDetails';
import Form from '../Comment/Form';
import { FaArrowUp, FaArrowDown} from 'react-icons/fa';
import reddit_logo from '../../images/reddit-logo.png'
import '../../css/post.css'

import Comments from './Comments';
import moment from 'moment';
import 'react-quill/dist/quill.snow.css';


const PostShow = () => {
  const [post, setPost] = useState([]);
  const [highlight, setHighlight] = useState("");
  const location = useLocation();

  let { id, community_id} = useParams();
  const account = JSON.parse(localStorage.getItem('account'))
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
    <div>
      <div className="show_post">
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-8">
              <div className="card mb-3 ">
                <div className = "show-content mt-1">
                  <div className="col-0 ms-3 mt-2" >
                    <div><FaArrowUp /></div>
                    <div><FaArrowDown /></div>
                  </div>
                  <div className = "post-head ms-3">
                    <div className = "row">
                      <p key={post.id}>
                        <img src={reddit_logo} alt="" className="community-icon" />
                        <strong><Link to={`/r/`} className="text-dark">r/</Link></strong>
                        <small> Posted by{' '}<Link to='/'> u/{post.account && post.account.username} </Link>{moment(post.created_at).fromNow()}</small>
                      </p>
                    </div>
                    <strong><h2 className = "ms-2">{post.title}</h2> </strong>
                  </div>
                </div>
                <div className="" key={post.id}>
                  <div className='mt-4 ms-5'>
                    <p>{post.body}</p>
                    {post.isclosed ? null : <Reactions Post_URL={Post_URL} get_post_data={get_post_data} />}
                  </div>
                  {post.isclosed ? <p className="card-body" style={{ fontSize: '20px', color: 'red' }}>
                    Post Closed By Admin.For further Details Contact Admin</p>
                    : <Form parent={null} comment_id={null} />}
                </div>
                <div className = "commentssection">
                  <Comments post={post} parent={null} highlight={highlight}/>
                </div>
              
              </div>
            </div>
            <div className="col-sm-4">
              <CommunityDetails post={post} />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
export default PostShow
