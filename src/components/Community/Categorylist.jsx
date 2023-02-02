import React from 'react'

function MyComponent() {
  const data = ["All", "Sports", "Gaming", "Technology", "News", "TV", "Music", "Crypto", "Fashion", "Food", "Health", "Science", "Finance"];
  
  return (
    <div className="card" >
      {data.map((data) => (
        <h5 className="list-group-item" key={data}>{data}</h5>
      ))}
      </div>
  );
}

export default MyComponent
