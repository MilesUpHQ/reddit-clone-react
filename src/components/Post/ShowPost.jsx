import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Community_URL = 'http://localhost:3000/api/v1/communities/'

function get_community_posts(community_id) {
  return axios.get(Community_URL + community_id + '/posts').then((response) => response.data)
}

const ShowPost = ({ community_id }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let mounted = true;
    get_community_posts(community_id).then((items) => {
      if (mounted) {
        setPosts(items);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div className="card border-light" key={post.id}>
          <div className="card-body border">
            <h4 className="card-text">Post id : {post.id}</h4>
            <h4 className="card-title">Post Title : {post.title}</h4>
            <p className="card-text">Body : {post.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ShowPost;