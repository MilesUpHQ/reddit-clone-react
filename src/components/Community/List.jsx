import React from 'react'
import { Link } from 'react-router-dom'

const List = ({ communities }) => {
  return (
    <div>
      {communities.map(community => (
        <div className="card border-light" key={community.id}>
          <div className="card-body border">
            <Link to={`/r/${community.id}`} >
            <h4 className="card-title">Community Name : {community.name}</h4>
            </Link>
            <p className="card-text">URL : {community.url}</p>
            <p className="card-text">Rules : {community.rules}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default List
