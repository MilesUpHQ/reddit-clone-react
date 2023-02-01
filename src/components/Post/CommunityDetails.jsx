import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import cover_image from '../../images/Cover-Image.jpg';
import reddit_logo from '../../images/reddit-logo.png'

const CommunityDetails = (post) => {
  
    let { id } = useParams();
  
    useEffect(() => {
      let mounted = true;
      
      return () => (mounted = false);
    }, []);

  return (
    <div>
      <div className="card" key={post.id}>
        <div className="card-body">
          <div className="text-center">
          <img src={cover_image} className="card-img-top home-small-cover"></img>
          <img src={reddit_logo} alt="" className="ml-3 home-small-profile"/>
          <h5 className="card-title">Community</h5>
          </div>
        </div>
      </div>
      <div className="card mt-5">
        <h5 className="rules-card-title">Community Rules</h5>
        <div className="card-body">
          <p className="card-text"> Rules </p>
        </div>
      </div>   
    </div>
    )
}

export default CommunityDetails