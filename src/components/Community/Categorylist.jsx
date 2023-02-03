import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";

function MyComponent() {
  const location = useLocation();
  const category = new URLSearchParams(location.search).get('category');

  const data = ["All", "Sports", "Gaming", "Technology", "News", "TV", "Music", "Crypto", "Fashion", "Food", "Health", "Science", "Finance"];
  
  return (
    <div className="card" >
      {data.map((data) => (
        <Link to={`/r/?category=${data}`} className={`list-group-item text-primary ${category === data ? 'border-secondary'  : ''}`} style={{borderWidth: "2px"}}>
         {data}
       </Link>
      ))}
      </div>
  );
}

export default MyComponent
