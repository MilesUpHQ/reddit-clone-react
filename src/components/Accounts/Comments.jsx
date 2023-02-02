import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment from 'moment';
import { Markup } from 'interweave';
const Comments = () => {
  const [comments, setComments] = useState([]);
  const account = JSON.parse(localStorage.getItem('account'))
  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/navbar_search')
      .then(response => {
        setComments(response.data.comments.options.filter(comment => comment.account_id === account.id));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <>
       {comments.length  ? (
        comments.map(comment => (
          <div className="card post-card mb-3 shadow">
          <div className="row m-0">
            <b>
            <p className="ml-3 text-muted">
               <span className="text-primary"> <a href={`/profile`}> u/{comment.username} </a>
                commented on  <a href={`/r/1/p/${comment.post_id}`}>
                {comment.post_title} </a>{" "}</span>
              </p>
            </b>
            <b>
              <p className="m-0">Message: <a href={`/r/1/p/${comment.post_id}?highlight=${comment.message}`}>
              <Markup content={comment.message}></Markup></a></p>
            </b>
            <p>
              <b>Commented:</b>{" "}
                {moment(comment.created_at).fromNow()}
            </p>
          </div>
        </div>
        ))
      ) : (
        <h4 className="card-title">No Comments posted till now</h4>
      )}
    </>
  )
}
export default Comments