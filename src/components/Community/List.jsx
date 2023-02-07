import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";

const List = ({ communities }) => {
  const location = useLocation();
  const category = new URLSearchParams(location.search).get('category');
  return (
    <div>
      {category ?
        communities.filter((community) => category === 'All' || community.category === category).length === 0 ?
          <div className="d-flex align-items-center justify-content-center" style={{ height: "80vh" }}>
            <div className="text-center">
              <h3 className="text-secondary">No communities to display</h3>
              <p className="text-secondary">Try another category or come back later</p>
            </div>
          </div> :
          communities.filter((community) => category === 'All' || community.category === category).map(community => (
            <div className="card border-light mb-2" style={{ maxwidth: "57rem" }} key={community.id}>
              <div className="card-body">
                <Link to={`/r/${community.id}`} className="nav-link" >
                  <h5 className="card-title text-primary">{community.name}</h5>
                </Link>
                <p className="card-text">{community.rules}</p>
              </div>
            </div>
          ))
        :
        communities.map(community => (
          <div className="card border-light mb-2" style={{ maxwidth: "57rem" }} key={community.id}>
            <div className="card-body mb-2">
              <Link to={`/r/${community.id}`} className="nav-link" >
                <h5 className="card-title text-primary">Name : {community.name}</h5>
              </Link>
              <p className="card-text">About Page : {community.summary}</p>
            </div>
          </div>
        ))
      }

    </div>
  )
}

export default List
