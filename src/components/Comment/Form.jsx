import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import PostApi from '../Home/PostApi';


function Form({ parent, comment_id }) {
  let currentText = '';
  const account = JSON.parse(localStorage.getItem('account'));
  const commentId = (comment_id) ? comment_id : '';
  const [post, setPost] = useState({});

  const { set_comments, text, setText } = PostApi();

  const handleSubmit = async event => {
    event.preventDefault();
<<<<<<< HEAD
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
=======
    setText(currentText);
    set_comments(currentText, parent)   
>>>>>>> ce8bc382e0159c5dd64317645476bbf059947d18
  };

  if (post.isclosed) {
    return null;
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="m-5">
          <small>Comment as <Link to={`/u/${account.username}`} >{account.username}</Link></small>
          <div className="form-group mb-3">
            {!parent ? null :
              <input type="hidden" name="comment[parent_id]" value={parent} />
            }
            <ReactQuill value={text} placeholder="Your Comment goes here" modules={{ clipboard: { matchVisual: false } }} style={{ height: '200px' }} onChange={(content, delta, source, editor) => {
              currentText = content;
            }}
              id={`comment-${commentId}`} />
          </div>
        </div>
        <div className="m-3 btn btn-secondary">
          <input type="submit" value="Submit comment" />
        </div>
      </form>
    </div>
  );
}

export default Form;
