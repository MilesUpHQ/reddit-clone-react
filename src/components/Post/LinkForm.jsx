import React, { useState, useEffect } from 'react';
import ContentWarning from './ContentWarning'
import CommunityTitle from './CommunityTitle'
import '../../css/post.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import '../../css/warning.css'
import axios from 'axios';
import { post } from 'jquery';
import SubmitPost from './SubmitPost';
const Post_URL = `http://localhost:3000/api/v1/communities/${post.community_id}/posts/`;


const LinkForm = () => {
  const [communities, setCommunities] = useState([])
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
  // const [errors, setErrors] = useState('');
  const [post, setPost] = useState({
    account_id: account.id,
    community_id: '' || 1,
    title: '',
    body: ''
  });

  const set_new_post = async (post) => {
    await axios.post(Post_URL, { post }).then((response) => {
      if (response.status === 201) {
        toast.success("Post Created successfully!");
        navigate('/')
      }
    }).catch((error) => {
      console.log(error.response.data);
      toast.error("An error occured while submitting the Post");
    })
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
      <form>
        <div className="row mt-3">
          <div className="col-sm-12">
            <div className="card rounded mb-3">
              <div className="form-group">
                <select id="community_id" className="form-select search-input-navbar community_select" placeholder='Choose a community' name="community_id" value={post.community_id} onChange={onChange}>
                  {communities.map(community => (
                    <option key={community.id} value={community.id}>{community.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <CommunityTitle onChange={onChange} />
        <div className="create-post m-3">
          <div className="form-group">
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
