import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import PostApi from '../Home/PostApi';

const Form = ({ parent, comment_id }) => {
  const account = JSON.parse(localStorage.getItem('account'));
  const commentId = (comment_id) ? comment_id : '';
  const [post, setPost] = useState({});
  const { set_comments, text, setText } = PostApi();
  let currentText = '';

  const handleSubmit = async event => {
    event.preventDefault();
    setText(currentText);
    set_comments(currentText, parent)
  };

  if (post.isclosed) {
    return null;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="m-1 me-5 mb-2">
          {!account ? (
            window.location.replace("/signin")
          ) : (
            <p className='comment_username'>
              Comment as <Link to={`/u/${account.username}`} className='text-decoration-none'>{account.username}</Link>
            </p>
          )}
          <div className="form-group mb-3">
            {!parent ? null :
              <input type="hidden" name="comment[parent_id]" value={parent} />
            }
            <ReactQuill
              value={text}
              placeholder="Your Comment goes here"
              modules={{ clipboard: { matchVisual: false } }}
              onChange={(content) => {
                currentText = content;
              }}
              id={`comment-${commentId}`}
            />
          </div>
          <input type="submit" className='join-btn' value="Comment" />
        </div>
      </form>
    </div>
  );
}
export default Form;
