import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { post } from 'jquery';
import { toast } from 'react-toastify';

function Form({ postId }) {
  const [text, setText] = useState('');
  const [post, setPost] = useState({});

  const handleSubmit = async event => {
    event.preventDefault();
    if (!text) {
      toast.error("Comment cannot be empty!");
      return;
    }
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/communities/${post.community_id}/posts/${postId}/comments`, {
        comment: { message: text },
        account_id: JSON.parse(localStorage.getItem('account')).id
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      setText('');
      if (response.status === 201) {
        toast.success("Comment Created successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (post.isclosed) {
    return null;
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="create-post m-5">
        <div className="form-group mb-3">
          <h6>Comment as</h6>
          <ReactQuill placeholder="Your Comment goes here" modules={{ clipboard: { matchVisual: false } }} style={{ height: '200px' }} onChange={(content, delta, source, editor) => {
            const contents = content;
            setText(contents);
          }}
          />
        </div>
      </div>
      <div className="m-3 btn btn-secondary">
        <input type="submit" value="Submit comment" />
      </div>
    </form>
  );
}

export default Form;
