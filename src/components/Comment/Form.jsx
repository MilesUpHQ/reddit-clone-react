import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


function Form({ parent, comment_id }) {
  console.log(parent);
  const [text, setText] = useState('');
  const account = JSON.parse(localStorage.getItem('account'));
  let { id, community_id } = useParams();
  const commentId = (comment_id) ? comment_id : '';

  const handleSubmit = async event => {
    console.log(event);
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/comments`, {
        comment: { message: text, parent_id: parent },
        account_id: JSON.parse(localStorage.getItem('account')).id
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
      setText('');
      if (response.status === 201) {
        toast.success("Comment Created successfully!"); 
      }
    }catch (error) {
      console.error(error);
    }
  };
 
  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div className="m-5">
      <small>Comment as <Link to={`/u/${account.username}`} >{account.username}</Link></small>
        <div className="form-group mb-3">
          { !parent ? null : 
            <input type="hidden" name="comment[parent_id]" value={parent} />
          }
          <ReactQuill placeholder="Your Comment goes here" value={text} style={{ height: '200px' }} onChange={setText} id={`comment-${commentId}`}/>
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
