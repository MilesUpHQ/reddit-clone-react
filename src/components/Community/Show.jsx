import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Community_URL = 'http://localhost:3000/api/v1/communities/'

function get_community_data(community_id) {
  return axios.get(Community_URL + community_id).then((response) => response.data)
}

const Show = () => {
  const [community, setCommunity] = useState([]);
  const navigate = useNavigate()
  let { id } = useParams();

  useEffect(() => {
    let mounted = true;
    get_community_data(id).then((items) => {
      if (mounted) {
        setCommunity(items);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <div>
      <div className="card border-light" key={community.id}>
        <div className="card-body border">
          <h4 className="card-title">Community Name : {community.name}</h4>
          <p className="card-text">URL : {community.url}</p>
          <p className="card-text">Rules : {community.rules}</p>
          <Button className='m-2'>Edit</Button>
          <Button className='m-2'>Delete</Button>
        </div>
      </div>
    </div>
  )
}
export default Show
