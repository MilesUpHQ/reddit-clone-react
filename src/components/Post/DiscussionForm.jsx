import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ContentWarning from './ContentWarning'
import CommunityTitle from './CommunityTitle'
import '../../css/post.css'
import '../../css/warning.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { post } from 'jquery';

const Post_URL = 'http://localhost:3000/api/v1/posts/'

const DiscussionForm = () => {

  const navigate = useNavigate();
  // const [errors, setErrors] = useState('');
  const [post, setPost] = useState({
    account_id: 1,
    community_id: 1,
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

  const onChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    let response = set_new_post(post)
    console.log(response)
  }


  return (
    <div>
      <form action="">
        <CommunityTitle />
        <div className="create-post m-3">
          <div className="form-group mb-3">
          <ReactQuill name='body' value={post.body} onChange={onChange} className="form-control" placeholder="Enter the Text 1" style={{ height: '300px' }} />
          </div>
        </div>
        <ContentWarning />
        <div>
          <div className="float-right">
            <div className="join-btn  create-post-btn mb-4">
              <input type="submit" value="Save as draft" className="text-white" />
            </div>
            <div className="join-btn create-post-btn mb-4">
              <input type="submit" value="Publish" className="text-white" onClick={onSubmit} />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default DiscussionForm
