import React, { useEffect, useState } from 'react'
import List from './List'
import MyComponent from './Categorylist'
import axios from 'axios';
import { Link } from 'react-router-dom'
//import Mybutton from './joinButton'

const Community_URL = 'http://localhost:3000/api/v1/communities/'

function get_communities_data() {
  return axios.get(Community_URL).then((response) => response.data)
}

const Index = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    let mounted = true;
    get_communities_data().then((items) => {
      if (mounted) {
        setCommunities(items);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <div className='community_post'>
      <div className="container mb-4">
        <div className="d-flex">
          <h3 className="text-dark">Today's Top Growing Communities</h3><br></br>
          <div className="float-right" style={{marginLeft: '400px'}}>
            <Link to="/r/new" className="btn btn-outline-primary">Create New Community</Link>
          </div>
        </div>  
        <p className="text-muted">Browse Reddit's top growing communities. Find the top communities in your favorite category.</p>
      </div>
      
      <div className="container">
        <div className="row">
          <div className="col-2">
            <div className="text-dark mb-3">
              <div className="list-group" id="nav-tabContent">
                <li className="list-group-item text-white bg-secondary">Category</li>
                <MyComponent />
              </div>
            </div>
          </div>
          <div className="col-7">
            <div className="text-dark mb-3">
              <div className="list-group" id="nav-tabContent">
                <li className="list-group-item text-white bg-secondary">Today's Top Growing in Communities</li>
                {communities ? [
                  <List communities={communities} />
                ] : [
                  <div>
                    <h3 className="m-4">No communities to display.</h3>
                  </div>
                ]}
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="text-dark mb-3">
              <ul className="list-group ml-3">
                <li className="list-group-item text-white bg-secondary">Top Communities</li>
                {communities.length > 0 ? (
                  communities.map((community) => (
                    <Link to={`/r/${community.id}`} className="list-group-item text-primary">
                      {community.name}
                    </Link>
                  ))
                ) : (
                  <p className="m-3">No communities to display.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
