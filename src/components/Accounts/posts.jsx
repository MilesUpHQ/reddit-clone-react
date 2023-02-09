
  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import PostList from '../Post/PostList';

  const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const limit = 15;
    const account = JSON.parse(localStorage.getItem('account'));

    useEffect(() => {
      axios.get(`http://localhost:3000/api/v1/communities/1/posts?page=${page}&limit=${limit}`)
        .then(response => {
          setPosts([...posts, ...response.data.posts]);
          setHasMore(response.data.total_pages > page);
        })
        .catch(error => {
          console.error(error);
        });

      window.onscroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      };

      return () => {
        window.onscroll = null;
      };
    }, [hasMore, page]);

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