import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFile, FaTrashAlt } from 'react-icons/fa';
import moment from 'moment';
import nodraftlist from '../../../src/images/nodraftlist.png'
import { toast } from 'react-toastify';
function DraftList() {
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/communities/1/posts/')
      .then(response => {
        const draftedPosts = response.data.posts.filter(post => post.is_drafted === true);
        setDrafts(draftedPosts);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  return (
    <div>
      {drafts.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          <img src={nodraftlist} />
          <p>Your Draft will live here</p>
        </div>
      ) : (
        drafts.map(post => (
          <div key={post.id} className="mb-2">
            <div className="row">
              <div className="col-1">
                <FaFile />
              </div>
              <div className='col-9'>
                <h6 className="mb-1">
                  <p>EDITING:<a href={`/edit-post/${post.id}`}> {post.title}</a></p>
                </h6>
                <small> Draft saved  {moment(post.updated_at).fromNow()} </small>
              </div>
              <div className='col-1'>
                <button onClick={() => deletePost(post.id)} className="post">
                  <FaTrashAlt />
                </button>
              </div>
            </div>
            <hr />
          </div>
        ))
      )}
    </div>
  )
}

function deletePost(id) {
  if (window.confirm('Are you sure?')) {
    axios.delete(`http://localhost:3000/api/v1/communities/1/posts/${id}`)
      .then(response => {
        toast.success('Post deleted successfully', {
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
}



export default DraftList;