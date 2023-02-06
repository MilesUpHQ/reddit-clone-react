import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from '../Post/PostList';

const Saved = () => {
  const [posts, setPosts] = useState([]);
  const account = JSON.parse(localStorage.getItem('account'))
  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/accounts/${account.id}/save_posts`)
      .then(response => {
        setPosts(response.data.filter(post => post.account_id === account.id));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      {posts.length  ? (
        <PostList posts={posts} isSavedPosts={true}/>
      ) : (
        <h4  className="card-title">No posts saved</h4>
      )}
    </div>
  )
}

export default Saved
