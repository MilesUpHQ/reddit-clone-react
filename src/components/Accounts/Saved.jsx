import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from '../Post/PostList';

const Saved = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 15
  const account = JSON.parse(localStorage.getItem('account'))

  useEffect(() => {
    loadSaved();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ) {
      loadSaved();
    }
  };

  const loadSaved = () => {
    axios.get(`http://localhost:3000/api/v1/accounts/${account.id}/save_posts?page=${page}&limit=${limit}`)
      .then(response => {
        setPosts([...posts, ...response.data.saved]);
        setPage(page + 1);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="community_post-profile">
      {posts.length ? (
        <PostList posts={posts.filter(post => post.account_id === account.id)} isSavedPosts={true} />
      ) : (
        <h4 className="card-title">No posts saved</h4>
      )}
    </div>
    </div>


  )
}

export default Saved
