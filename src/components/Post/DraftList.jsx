import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FaFile, FaTrashAlt} from 'react-icons/fa';
import moment from 'moment';

function DraftList() {
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/posts/')
      .then(response => {
        const draftedPosts = response.data.filter(post => post.is_drafted === true);
        setDrafts(draftedPosts);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  return (
    <div>
      {drafts.length === 0 ? (
        <p className="text-center"> No drafts available </p>
      ) :(
       drafts.map(post => (
        <div key={post.id} className="mb-2">
          <div className="row">
            <div className="col-1">
              <FaFile />
            </div>
            <div className='col-9'>
               <h6 className="mb-1">
                <a href={`/edit-post/${post.id}`}>{post.title}</a>
               </h6>
               <strong>
                <a href={`/community/${post.community_id}`}>r/{post.community_id}</a>
              </strong>
              <small> Draft saved  {moment(post.updated_at).fromNow()} </small>
            </div> 
            <div className='col-1'> 
            <button onClick={() => deletePost(post.id)} className="post">
              <FaTrashAlt />
            </button>
            </div>
          </div>
          <hr/> 
        </div>
       ))
      )}
    </div>
  )
}

function deletePost(id) {
  if (window.confirm('Are you sure?')) {
    axios.delete(`http://localhost:3000/api/v1/posts/${id}`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
}


export default DraftList;
