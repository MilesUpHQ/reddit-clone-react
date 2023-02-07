import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment';
import reddit_logo from '../../images/reddit-logo.png'
import { FaRegCommentAlt, FaRegFlag, FaShare } from 'react-icons/fa'
import '../../css/post.css'
import VotesHandler from './VotesHandler';
import SavePosts from './SavePosts';
import { Markup } from 'interweave';

const PostList = ({ account, posts, community, isSavedPosts }) => {

  const { id } = useParams()

  function truncateString(str, num) {
    return str.length > num ? str.substring(0, num) + '...' : str;
  }

  if (!Array.isArray(posts)) {
    return null;
  }
  return (
    <div>
      {posts && posts.map((post) => {
        return (
          <div key={post.id} className="card post-card mb-3 shadow">
            <div className="row m-0">
              <div className="col-1 m-0 vote-col text-center">
                <div id="vote-actions-1" className="d-block vote" data-id="1">
                  <VotesHandler
                    post={post}
                    communityId={post.community_id}
                    postId={post.id}
                    voteCount={post.vote_count}
                  />
                </div>
              </div>
              <div className="col-11">
                <div className="row bg-white">
                  <div className="col-10">
                    <div className="d-flex gap-1 post-list-head mt-2">
                      {post.community && post.community_id &&
                        [post.community && post.community.profile_image && post.community.profile_image.url ? [
                          <div className="post-list-profile-img">
                            <img src={`http://localhost:3000${post.community.profile_image.url}`} alt="" />
                          </div>
                        ] : [
                          <img src={reddit_logo} alt="" className="post-list-profile-img mr-1" />
                        ],
                        <strong><Link to={`/r/${post.community_id}`} className='text-decoration-none text-dark' >r/{community ? [community.name] : [post.community && post.community.name]}</Link></strong>]
                        }
                      <p className="ml-3 text-muted">Posted by
                        <Link to='/' className="text-decoration-none text-muted"> u/{account ? [account.username] : [post.account && post.account.username]} </Link>
                        {moment(post.created_at).fromNow()}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 d-flex post-title">
                    <h5><Link to={`/r/${post.post ? post.post.community_id : post.community_id}/p/${post.id}`} className="text-dark text-decoration-none">{post.post ? post.post.title : post.title}</Link></h5>
                    <p className="flair-badge">Flair</p>
                    <p className="flair-badge bg-success">OC</p>
                    <p className="flair-badge bg-warning">Spoiler</p>
                    <p className="flair-badge bg-danger">NSFW</p>
                  </div>
                </div>
                <div className="row">
                  <div className="list-post-img">
                    {console.log(post.body)}
                    <p className="col-12 ">
                      <Markup content={truncateString(post.post ? post.post.body : post.body, 300)}></Markup>
                    </p>
                  </div>
                </div>
                <div className="row mt-1 mb-1">
                  <div className="col-12 d-flex gap-3">
                    <Link to={`/r/${post.community_id}/p/${post.id}`} className="list-post-tab">
                      <FaRegCommentAlt /> 0 Comments
                    </Link>
                    <Link to='' className="list-post-tab">
                      <FaShare /> Share
                    </Link>
                    <SavePosts post={post} isSavedPosts={isSavedPosts} />
                    <Link to={`/r/${post.community_id}/p/${post.id}`} className="list-post-tab">
                      <FaRegFlag /> Report
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })
      }
    </div>
  )
}

export default PostList
