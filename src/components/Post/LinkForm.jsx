import React, { useState, useEffect } from 'react';
import ContentWarning from './ContentWarning'
import CommunityTitle from './CommunityTitle'
import '../../css/post.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import PostApi from '../Home/PostApi';
import '../../css/warning.css'
import axios from 'axios';
import SubmitPost from './SubmitPost';

const LinkForm = () => {
  const [communities, setCommunities] = useState([])
  const { post, setPost, set_new_post, errorJson } = PostApi();
  const Community_URL = 'http://localhost:3000/api/v1/communities/'
  useEffect(() => {
    fetch(Community_URL)
      .then(response => response.json())
      .then(data => setCommunities(data.communities))
  }, [])


  const onChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
    console.log(event.target.value)
  }

  const account = JSON.parse(localStorage.getItem('account'))

  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    set_new_post(post);
  }

  return (
    <div>
      <form>
        <CommunityTitle onChange={onChange} />
        <div className="create-post m-3">
          <div className="form-group">
          <input type="text" name="link" onChange={onChange} className={`form-control ${errorJson.link && 'border-danger'}`} maxLength="25" minLength="3" value={post.link} />
                {errorJson.link && <p className="text-danger">{errorJson.link}</p>}
            <input type="text" id="link" className="form-control" placeholder="Enter the URL" pattern="https?://.+" required />
          </div>
        </div>
        <ContentWarning />
        <SubmitPost onSubmit={onSubmit} />
      </form>
    </div>
  )
}

export default LinkForm
