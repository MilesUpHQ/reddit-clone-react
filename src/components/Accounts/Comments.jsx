import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment from 'moment';
import reddit_logo from '../../images/reddit-logo.png'
import { Markup } from 'interweave';
import '../../css/post.css'

function truncateString(str, num) {
  return str.length > num ? str.substring(0, num) + '...' : str;
}

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
      {comments.length ? (
        comments.map(comment => (
          <div style={{ height: '70px' }} className="card post-card mb-3 shadow">
            <div className="row m-0 bg-white">
              <div className="ml-3">
                <img src={reddit_logo} alt="" className="post-list-profile-img" />
                  <a href={`/profile`}><b> u/{comment.username+" "}</b></a>
                    commented on  <a href={`/r/1/p/${comment.post_id}`}>
                    {comment.post_title+ " "} </a><b>{moment(comment.created_at).fromNow()}</b>
              </div>
              <b>
                <p className="m-1">Comment : <a style={{ textDecoration: 'none' }} href={`/r/1/p/${comment.post_id}?highlight=${comment.message.replace(/<[^>]+>/g, '')}`}>
                  <Markup content={truncateString(comment.message.replace(/<[^>]+>/g, ''), 50)}></Markup></a></p>
              </b>
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