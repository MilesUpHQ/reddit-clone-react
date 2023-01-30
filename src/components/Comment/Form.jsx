import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Form({ postId }) {
  const [text, setText] = useState('');

  const handleSubmit = async event => {
    console.log(event);
    event.preventDefault();
    try {
      const response = await fetch(`/api/v1/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: { text } })
      });
      console.log(text);
      setText('');
    } catch (error) {
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
