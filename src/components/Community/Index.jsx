import React, { useEffect, useState } from 'react'
import List from './List'
import MyComponent from './Categorylist'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap';


const Index = () => {
  const [communities, setCommunities] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }

    axios.get(`http://localhost:3000/api/v1/communities?page=${page}`)
      .then(response => {
        setCommunities([...communities, ...response.data.communities]);
        setHasMore(response.data.total_pages > page);
      })
      .catch(error => {
        console.error(error);
      });

    window.onscroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    };
  }, [hasMore, page, mounted]);

  return (
    <div className='community_post'>
      <div className="container mb-4">
        <div className="d-flex">
          <h3 className="text-dark">Today's Top Growing Communities</h3><br></br>
          <div className="float-right" style={{ marginLeft: '600px' }}>
            <Link to="/r/new" className="btn btn-outline-primary">Create New Community</Link>
          </div>
        </div>
        <p className="text-muted">Browse Top growing communities. Find the top communities in your favorite category.</p>
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
                    <Link to={`/r/${community.id}`} className="list-group-item text-primary mb-1">
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
