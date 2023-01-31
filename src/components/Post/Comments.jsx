

import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Post_URL = 'http://localhost:3000/api/v1/posts/'

function get_post_comments(post_id) {
  return axios.get(Post_URL + post_id + '/comments').then((response) => response.data)
}

const Comments = ({post_id}) => {
  console.log(post_id)  
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let mounted = true;
    get_post_comments(post_id).then((items) => {
      if (mounted) {
        setComments(items);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <div>
      {comments.map((comment) => (
        <div className="card border-light" key={comment.id}>
          <div className="card-body border">
            <h4 className="card-text">Post id : {comment.id}</h4>
            <h4 className="card-title">Post Title : {comment.message}</h4>
           
          </div>
        </div>
      ))}
    </div>
  )
}

export default Comments;