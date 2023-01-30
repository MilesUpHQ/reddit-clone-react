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
      <div class="card" key={post.id}>
        <div class="card-body">
          <div class="text-center">
          <h5 class="card-title">Community</h5>
          </div>
        </div>
      </div>
      <div class="card mt-5">
        <h5 class="rules-card-title">Community Rules</h5>
        <div class="card-body">
          <p class="card-text"> Rules </p>
        </div>
      </div>   
    </div>
    )
}

export default CommunityDetails