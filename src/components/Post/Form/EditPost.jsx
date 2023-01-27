import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ContentWarning from './../ContentWarning'
import CommunityTitle from './../CommunityTitle'
const Post_URL = 'http://localhost:3000/api/v1/posts/'

const EditPost = () => {

  const navigate = useNavigate();
  let { id } = useParams();
  // const [errors, setErrors] = useState('');
  const [post, setPost] = useState({
    account_id: 1,
    community_id: 1,
    name: '',
    url: '',
    rules: ''
  });

  function get_post() {
    return axios.get(Post_URL+id).then((response) => response.data)
  }

  useEffect(() => {
    let mounted = true;
    get_post().then((items) => {
      if(mounted) {
        setPost(items);
      }
    });
    return () => (mounted = false);
  }, []);

  // const handleErrors = (error) => {
  //   const { name, value } = error.target;
  //   setErrors({
  //     ...errors,
  //     [name]: value
  //   });
  //   console.log(errors)
  // }

  const edit_post = async (post) => {
    await axios.put(Post_URL+id, { post }).then((response) => {
      if (response.status === 200) {
        toast.success("Post Edited successfully!");
        navigate('/r/'+id)
      }
    }).catch((error) => {
      console.log(error.response.data);
      toast.error("An error occured while submitting the form");
      // handleErrors(error.response.data)
    })
  }

  const onChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  }
  
  const handleChange = (content, delta, source, editor) => {
    setPost({ ...post, body: editor.getText().trim() });
  }
  
    const onSubmit = (event) => {
      event.preventDefault();
      edit_post(post)
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
  );
}

export default EditPost
