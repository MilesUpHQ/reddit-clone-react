import React, { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom';
import profile_image from '../../images/profile-img.jpeg'
import axios from 'axios';
import '../../css/post.css'
import moment from 'moment';
import Form from '../Comment/Form';
import PostApi from '../Home/PostApi';
import { Markup } from 'interweave';
import { FaRegCommentAlt } from 'react-icons/fa';
import CommentVotesHandler from './CommentVotesHandler';

const Comments = ({ highlight, isBanned }) => {
  const { comments, setComments } = PostApi();
  const [selectedComment, setSelectedComment] = useState(null);

  let { id, community_id } = useParams();
  const account = JSON.parse(localStorage.getItem('account'));
  const Post_URL = `http://localhost:3000/api/v1/communities/${community_id}/posts/`;
  const commentRef = useRef(null);

  const get_post_comments = (post_id) => {
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
    if (commentId === selectedComment) {
      setSelectedComment(null);
    } else {
      setSelectedComment(commentId);
    }
  }

  const renderComment = (comment, comments) => {
    if (highlight && !comment.message.includes(highlight) && (!comment.parent_id || !comments.find(c => c.id === comment.parent_id && c.message.includes(highlight)))) {
      return null;
    }

    return (
      <div ref={commentRef}>
        <div className="row d-flex">
          <div className="col-1 p-0">
            <div class="comment-wrapper">
              <div class="or-separator">
                {account && account.profile_image && account.profile_image.url ? [
                  <div className="comment-profile-img">
                    <img src={`http://localhost:3000${account.profile_image.url}`} alt="" />
                  </div>
                ] : [
                  <div className="comment-profile-img">
                    <img src={profile_image} alt="" />
                  </div>
                ]}
                <div class="vertical-line"></div>
              </div>
            </div>
          </div>
          <div className="col-11 p-0">
            <p className='comment_username comment_firstname mt-1'>{comment.account.first_name}
              {comment.account_id === comment.post.account_id && <span className="text-primary ms-1">OP</span>}
              <span className='ms-2'>.</span>
              <span className="text-muted ms-2">{moment(comment.created_at).fromNow()} </span>
            </p>
            <p>
              <div className=''>
                <Markup content={comment.message} />
              </div>
            </p>
            <div className="row mt-1 mb-1">
              <div className="col-12 d-flex gap-3">
              <div id="vote-actions-1" className="d-block vote" data-id="1">
                  <CommentVotesHandler
                    comment={comment}
                    commentId={comment.id}
                    voteCount={comment.vote_count}
                  />
                </div>
                {(comment.post.isclosed || isBanned) ? null : (
                  <Link to='' className="list-post-tab" onClick={(event) => handleClick(event, comment.id)}>
                    <FaRegCommentAlt /> Reply
                  </Link>
                )}
              </div>
            </div>
            {selectedComment === comment.id && <Form parent={comment.id} comment_id={comment.id} />}
            <div className='sub-comment p-0'>
              {comments
                .filter(sub_comment => sub_comment.parent_id === comment.id)
                .map(reply => renderComment(reply, comments))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-4" key={highlight.id}>
        {highlight &&
          <Link to={`/r/${community_id}/p/${highlight.post_id}`} className='text-decoration-none fw-bold'>
            View all comments</Link>
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
