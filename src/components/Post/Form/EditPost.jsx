import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ContentWarning from './../ContentWarning'
import CommunityTitle from './../CommunityTitle'
const EditPost = ({ get_post_data }) => {
  const [post, setPost] = useState('');
  const [errorJson, setErrorJson] = useState('')
  let { id, community_id } = useParams();
  const Post_URL = `http://localhost:3000/api/v1/communities/${community_id}/posts/`;
  const navigate = useNavigate();

  function get_post_data(id) {
    return axios.get(Post_URL + id).then((response) => response.data)
  }

  useEffect(() => {
    let mounted = true;
    get_post_data(id).then((items) => {
      if (mounted) {
        setPost(items);
      }
    });
    return () => (mounted = false);
  }, []);

  const edit_post = async (post) => {
    await axios.patch(Post_URL + id, { post }).then((response) => {
      if (response.status === 200) {
        toast.success("Post Edited successfully!");
        navigate(`/r/${community_id}/p/` + id)
      }
    }).catch((error) => {
      console.log(error.response.data);
      setErrorJson(error.response.data)
      toast.error("An error occured while submitting the form");
      // handleErrors(error.response.data)
    })
  }

  const onChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  }

  const [body, setBody] = useState(post.body);
  const handleChange = (content, delta, source, editor) => {
    setPost({ ...post, body: editor.getContents() });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(post)
    edit_post(post)
  }

  return (
    <div>
      <form action="">
        <CommunityTitle postTitle={post.title} onChange={onChange} />
        <div className="create-post m-3">
          <div className="form-group mb-3">
            <ReactQuill style={{ height: '300px' }} onChange={handleChange} value={post.body} />
          </div>
        </div>
        <ContentWarning />
        <div>
          <div className="float-right">
            <div className="join-btn create-post-btn mb-4">
              <input type="submit" value="Edit & Publish" className="text-white" onClick={onSubmit} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditPost
