import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Reactions from './Reactions';
import { FaArrowUp, FaArrowDown} from 'react-icons/fa';
import '../../css/post.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const Post_URL = 'http://localhost:3000/api/v1/posts/'

function get_post_data(post_id) {
    return axios.get(Post_URL + post_id).then((response) => response.data)
  }

const PostShow = () => {
  const [post, setPost] = useState([]);
  let { id } = useParams();

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
                          <strong><Link to={`/r/${post.id}`} className="text-dark">r/{post.id}</Link></strong>
                          <small> Posted by{' '}<Link to={`/u/${post.id}`}>u/{post.id}</Link>{' '}</small>
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
                  <form action="">
                    <div className="create-post m-5">
                      <div className="form-group mb-3">
                        <h6>Comment as</h6>
                        <ReactQuill placeholder="Your Comment goes here" value = {""} style={{ height: '200px' }} />
                      </div>
                    </div>
                    <div className="m-3">
                      <input type="submit" value="Submit comment" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PostShow
