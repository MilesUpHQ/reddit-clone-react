import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ContentWarning from './ContentWarning'
import CommunityTitle from './CommunityTitle'
import '../../css/post.css'
import '../../css/warning.css'
import axios from 'axios';
import { post } from 'jquery';
import { post } from 'jquery';
import { toast } from 'react-toastify';
const Post_URL = `http://localhost:3000/api/v1/communities/${post.community_id}/posts/`;
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
  // const [errors, setErrors] = useState('');
  const [post, setPost] = useState({
    account_id: account.id,
    community_id: '' || 1,
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
  const onChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
    console.log(event.target.value)
    console.log(event.target.value)
  }
  const handleChange = (content, delta, source, editor) => {
    setPost({ ...post, body: editor.getText().trim() });
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
          <div className="form-group mb-3">
            <ReactQuill placeholder="Enter the Text" modules={{ clipboard: { matchVisual: false } }} style={{ height: '300px' }} onChange={handleChange} />
          </div>
        </div>
        <ContentWarning />
        <div>
          <div className="float-right">
            <div className="join-btn  create-post-btn mb-4">
             
              <input type="submit" value="Save as draft" className="text-white" 
             onClick={() => {
              set_new_post({...post, is_drafted: true});
              }
            }
          />
             
              <input type="submit" value="Save as draft" className="text-white" 
             onClick={() => {
              set_new_post({...post, is_drafted: true});
              }
            }
          />
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



