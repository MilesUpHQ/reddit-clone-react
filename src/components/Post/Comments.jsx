import React, { useEffect, useState, useRef } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import reddit_logo from '../../images/reddit-logo.png'
import axios from 'axios';
import '../../css/post.css'
import moment from 'moment';
import Form from '../Comment/Form';
import { Markup } from 'interweave';
const Comments = ({ highlight }) => {
  const [comments, setComments] = useState([]);
  let { id, community_id } = useParams();
  const account = JSON.parse(localStorage.getItem('account'))
  const Post_URL = 'http://localhost:3000/api/v1/communities/${community_id}/posts/';
  const highlight_style = { backgroundColor: "lightgrey" };

  const commentRef = useRef(null);

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

  useEffect(() => {
    if (highlight) {
      const firstMatchedComment = comments.find(comment => comment.message.includes(highlight))
      if (firstMatchedComment) {
        const highlighted_element = document.querySelector(`.comment span[style="background-color: lightgrey;"]`);
        if (highlighted_element) {
          highlighted_element.scrollIntoView({ behavior: 'smooth' });
        }

      }
    }
  }, [highlight, comments]);

  return (
    <div ref={commentRef}>
      {comments.map((comment) => (
        <div className="comment" key={comment.id} data-comment-id={comment.id}>
          <img src={reddit_logo} alt="" className="small-pic float-left m-r-15" />
          <strong>{account.username}</strong>
          <div>
            <Markup content={comment.message} />
            {comment.message.split(highlight).map((part, index) => (
              <React.Fragment key={index}>
                {part}
                {index !== comment.message.split(highlight).length - 1 && (
                  <span style={highlight_style}>{highlight}</span>
                )}
              </React.Fragment>
            ))}

          </div>
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