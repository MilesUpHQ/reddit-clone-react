import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import reddit_logo from '../../images/reddit-logo.png'
import { FaRegBookmark, FaRegCommentAlt, FaRegFlag, FaShare } from 'react-icons/fa'
import { TbArrowBigTop, TbArrowBigDown } from 'react-icons/tb'
import PostList from '../Post/PostList';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const account = JSON.parse(localStorage.getItem('account'))
  
  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/communities/1/posts')
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
        <PostList  posts={posts} />
      ) : (
        <h4  className="card-title">No Profile posts created</h4>
      )}
    </div>
  )

};

export default Posts;
