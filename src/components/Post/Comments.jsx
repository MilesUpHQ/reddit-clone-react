import React, { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom';
import profile_image from '../../images/profile-img.jpeg'
import axios from 'axios';
import '../../css/post.css'
import moment from 'moment';
import Form from '../Comment/Form';
import PostApi from '../Home/PostApi';
import { Markup } from 'interweave';


const Comments = ({ highlight, isBanned }) => {
  const { comments, setComments } = PostApi();
  const [selectedComment, setSelectedComment] = useState(null);

  let { id, community_id } = useParams();
  const account = JSON.parse(localStorage.getItem('account'));
  const Post_URL = `http://localhost:3000/api/v1/communities/${community_id}/posts/`;
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

  const handleClick = (event, commentId) => {
    event.preventDefault();
    setSelectedComment(commentId);
  }

  const renderComment = (comment, comments) => {
    if (highlight && !comment.message.includes(highlight) && (!comment.parent_id || !comments.find(c => c.id === comment.parent_id && c.message.includes(highlight)))) {
      return null;
    }

    return (

      <div ref={commentRef}>
        <div className="comment ms-2" key={comment.id}>
          {account && account.profile_image && account.profile_image.url ? [
            <img src={`http://localhost:3000${account.profile_image.url}`} alt="" className="profile-img-navbar" />
          ] : [
            <img src={profile_image} alt="" className="profile-img-navbar" />
          ]}
          <strong>{comment.account.first_name}</strong>
          {comment.account_id === comment.post.account_id && <b className="text-primary"> OP</b>}
          <span className="text-muted ms-2">{moment(comment.created_at).fromNow()} </span>
          <div className='ms-4 ml-4'>
            <Markup content={comment.message} />
          </div>
        </div>
        <div className="fl">
          {!isBanned? (<a href="#" onClick={(event) => handleClick(event, comment.id)}>Reply</a>) : null }
          {selectedComment === comment.id && <Form parent={comment.id} comment_id={comment.id} />}
          <hr />
          <div className='sub-comment'>
            {comments
              .filter(sub_comment => sub_comment.parent_id === comment.id)
              .map(reply => renderComment(reply, comments))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-4" key={highlight.id}>
        {highlight &&
          <Link to={`/r/${community_id}/p/${highlight.post_id}`}>View all comments</Link>
        }
      </div>
      {comments.map(comment => {
        if (!comment.parent_id) {
          return renderComment(comment, comments);
        }
      })}
    </div>
  );
}

export default Comments;
