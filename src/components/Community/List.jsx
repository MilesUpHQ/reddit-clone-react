import React from 'react'
import { Link } from 'react-router-dom'

const List = ({ communities }) => {
  return (
    <div>
      {communities.map(community => (
        <div className="card border-light" style={{maxwidth: "57rem"}} key={community.id}>
          <div className="card-body">
            <Link to={`/r/${community.id}`} className="nav-link" >
              <h5 className="card-title text-primary">{community.name}</h5>
            </Link>
            <p className="card-text">{community.rules}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default List
