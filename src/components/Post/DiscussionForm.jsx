import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ContentWarning from './ContentWarning'
import CommunityTitle from './CommunityTitle'
import '../../css/post.css'
import '../../css/warning.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import PostApi from '../Home/PostApi';
import SubmitPost from './SubmitPost';

const DiscussionForm = () => {
  const [communities, setCommunities] = useState([])

  const Community_URL = 'http://localhost:3000/api/v1/communities/'
  useEffect(() => {
    fetch(Community_URL)
      .then(response => response.json())
      .then(data => setCommunities(data))
  }, [])

  const account = JSON.parse(localStorage.getItem('account'))

  const navigate = useNavigate();
  const { post, setPost, set_new_post } = PostApi()

  const accountId = account.id
  const [subscriptions, setSubscriptions] = useState([]);
  const fetchData = async () => {
    return await axios.get(`http://localhost:3000/api/v1/banned_users?account_id=${accountId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error)
      })
  };

  useEffect(() => {
    let mounted = true;
    fetchData().then((items) => {
      if (mounted) {
        setSubscriptions(items)
      }
    });
    return () => (mounted = false);
  }, []);

  const onChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
    console.log(event.target.value)
  }

  const handleChange = (content, delta, source, editor) => {
    setPost({ ...post, body: content });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (!post.body) {
      toast.error("Post body can't be blank");
      return;
    }
    set_new_post(post);
  }

  return (
    <div>
      <form action="">
        <CommunityTitle onChange={onChange} />
        <div className="create-post m-3">
          <div className="form-group mb-3">
            <ReactQuill placeholder="Enter the Text" modules={{ clipboard: { matchVisual: false } }} style={{ height: '300px' }} onChange={handleChange} />
          </div>
        </div>
        <ContentWarning />
        <SubmitPost onSubmit={onSubmit} />
      </form >
    </div >
  )
}
export default DiscussionForm



