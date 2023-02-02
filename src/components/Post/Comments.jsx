import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import reddit_logo from '../../images/reddit-logo.png'
import axios from 'axios';
import '../../css/post.css'
import moment from 'moment';
import Form from '../Comment/Form';
const Comments = ({ }) => {
  const [comments, setComments] = useState([]);
  let { id, community_id } = useParams();
  const account = JSON.parse(localStorage.getItem('account'))
  const Post_URL = `http://localhost:3000/api/v1/communities/${community_id}/posts/`;
  function get_post_comments(post_id) {
    return axios.get(Post_URL + post_id + '/comments').then((response) => response.data)
  }
  useEffect(() => {
    let mounted = true;
    get_post_comments(id).then((items) => {
      if (mounted) {
        setComments(items);
      }
    });
    return () => (mounted = false);
  }, []);
  return (
    <div>
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <img src={reddit_logo} alt="" className="small-pic float-left m-r-15" />
          <strong>{account.username}</strong>
          <p><div dangerouslySetInnerHTML={{ __html: comment.message }} /></p>
          <div className="fl">
            <p className="text-muted m-l-30">{moment(comment.created_at).fromNow()}</p>
          </div>
          <Form postId={id} parent={comment.id} comment_id={comment.id} />
        </div>
      ))}
    </div>
  )
}
export default Comments;