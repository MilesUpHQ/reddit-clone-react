import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Reactions from './Reactions';
import CommunityDetails from './CommunityDetails';
import Form from '../Comment/Form';
import { FaArrowUp, FaArrowDown} from 'react-icons/fa';
import '../../css/post.css'
import Comments from './Comments';
import 'react-quill/dist/quill.snow.css';


const PostShow = () => {
  const [post, setPost] = useState([]);
  let { id, community_id } = useParams();
  const Post_URL = `http://localhost:3000/api/v1/communities/${community_id}/posts/`;
  function get_post_data(post_id) {
    return axios.get(Post_URL + post_id).then((response) => response.data)
  }
  
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
                <div className = "mt-1">
                  <div className="col-10 m-0" >
                    <div><FaArrowUp /></div>
                    <div><FaArrowDown /></div>
                    <div className = "post-head">
                      <div className = "col-5 ms-5">
                        <p>
                          <strong><Link to={`/r/`} className="text-dark">r/</Link></strong>
                          <small> Posted by{' '}<Link to={`/u/`}>u/</Link>{' '}</small>
                        </p>
                      </div> 
                    </div>
                  </div>
                </div>
                <div className="" key={post.id}>
                  <div className='mt-0 ms-5'>
                    <h4>Post title : {post.title}</h4>
                    <p>{post.body}</p>
                    <Reactions Post_URL ={Post_URL} get_post_data={get_post_data}/>
                  </div>
                  <Form postId={post.id} parent={null} comment_id={null} />
                </div>
                <div className = "commentssection">
                  <Comments post={post} parent={null}/>
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
  )
}
export default PostShow
