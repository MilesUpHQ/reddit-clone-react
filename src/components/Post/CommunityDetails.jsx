import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

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