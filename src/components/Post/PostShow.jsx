import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';

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
      <div className="card border-light" key={post.id}>
        <div className="card-body border">
          <h4 className="card-title">Post title : {post.title}</h4>
          <p className="card-text">URL : {post.body}</p>
        </div>
      </div>
    </div>
  )
}
export default PostShow
