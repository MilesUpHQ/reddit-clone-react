import React from 'react'
import { Link } from 'react-router-dom'

function MyComponent() {
  const data = ["All", "Sports", "Gaming", "Technology", "News", "TV", "Music", "Crypto", "Fashion", "Food", "Health", "Science", "Finance"];
  
  return (
    <div className="card" >
      {data.map((data) => (
        <Link to={`/r/?category=${data}`} className="list-group-item text-primary">
         {data}
       </Link>
      ))}
      </div>
  );
}

export default MyComponent
