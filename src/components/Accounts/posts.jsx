
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from '../Post/PostList';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 1;
  const account = JSON.parse(localStorage.getItem('account'));

  useEffect(() => {
    loadPosts();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ) {
      loadPosts();
    }
  };



  const loadPosts = () => {
    if (isLoading) return;
    setIsLoading(true);
    axios
      .get(`http://localhost:3000/api/v1/communities/1/posts?page=${page}&limit=${limit}`)
      .then(response => {
        setPosts(posts.concat(response.data.posts));
        setPage(page + 1);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  };

  return (
    <div>
      {posts.length ? (
        <PostList posts={posts.filter(post => post.account_id === account.id)} />
      ) : (
        <h4 className="card-title">No Profile posts created</h4>
      )}
    </div>
  );
};

export default Posts;