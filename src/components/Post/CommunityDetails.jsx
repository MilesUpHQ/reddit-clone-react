import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import cover_image from '../../images/Cover-Image.jpg';
import reddit_logo from '../../images/reddit-logo.png'

const CommunityDetails = ({ post }) => {

  let { community_id } = useParams();

  useEffect(() => {
    let mounted = true;

    return () => (mounted = false);
  }, []);

  return (
    <div>
      <div className="card" key={post.id}>
        <div className="card-body">
          <div className="text-center">
            <Link to={`/r/${community_id}`}>
              {post.community && post.community.cover_image && post.community.cover_image.url ? [
                <img src={`http://localhost:3000${post.community.cover_image.url}`} alt="" className="card-img-top home-small-cover" />
              ] : [
                <img src={cover_image} alt="" className="card-img-top home-small-cover" />
              ]}
              {post.community && post.community.profile_image && post.community.profile_image.url ? [
                <img src={`http://localhost:3000${post.community.profile_image.url}`} alt="" className="ml-3 home-small-profile" />
              ] : [
                <img src={reddit_logo} alt="" className="ml-3 home-small-profile" />
              ]}
            </Link>
            <h5 className="card-title"><Link to={`/r/${community_id}`}>{post.community && post.community.name}</Link></h5>
          </div>
        </div>
      </div>
      <div className="card mt-5">
        <h5 className="rules-card-title">Community Rules</h5>
        <div className="card-body">
          <p className="card-text">
            {post.community && post.community.rules ? post.community.rules : ''}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CommunityDetails