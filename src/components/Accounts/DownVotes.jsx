import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from '../Post/PostList';

const Downvotes = () => {
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
    <div className="community_post-profile">
      <div>
        {posts.length ? (
          <PostList posts={posts.filter(post => post.votes.some(vote => vote.value === -1))} />
        ) : (
          <h4 className="card-title">No Posts with DownVotes</h4>
        )}
      </div>
    </div>
  );
};


export default Downvotes


