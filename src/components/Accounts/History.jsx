import React, { useState, useEffect } from 'react';
import HistoryApi from '../Accounts/HistoryApi';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import PostList from '../Post/PostList';
import reddit_logo from '../../images/reddit-logo.png'


const History = () => {
  // const { get_post_views, set_post_views } = HistoryApi()
  const { id, community_id } = useParams();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const account = JSON.parse(localStorage.getItem('account'))
  const Post_url = `http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/post_views/?account_id=${account.id}`

  const get_post_views = () => {
    return axios.get(Post_url, { account_id: account.id }).then((response) => response.data).catch((error) => console.log(error))
  }

  const set_post_views = () => {
    return axios.post(Post_url, { account_id: account.id }).then((response) => response.data).catch((error) => console.log(error))
  }

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
      .get(Post_url)
      .then(response => {
        console.log(response.data)  
        setPosts(posts.concat(response.data));
        setPage(page + 1);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  };
  return (
    <>
      <div className="community_post-profile">
        <div>
          {posts.length ? (
            <PostList posts={posts} />
          ) : (
            <h4 className="card-title">No History</h4>
          )}
        </div>  
      </div>
    </>
  )
};

export default History