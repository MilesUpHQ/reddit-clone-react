import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

function Form({ postId }) {
  const [text, setText] = useState('');

  const handleSubmit = async event => {
    console.log(event);
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/posts/${postId}/comments`, {
        comment: { message: text },
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
    <form onSubmit={handleSubmit}>
      <div className="create-post m-5">
        <div className="form-group mb-3">
          <h6>Comment as</h6>
          <ReactQuill placeholder="Your Comment goes here" value={text} style={{ height: '200px' }} onChange={setText}/>
        </div>
      </div>
      <div className="m-3 btn btn-secondary">
        <input type="submit" value="Submit comment" />
      </div>
    </form>
  );
}
 
export default Form;
