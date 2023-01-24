import React from 'react'

function MyComponent() {
  const data = ["Sports", "Tv", "Education","Science"];

  return (
    <div className="card border-light" >
      {data.map((data) => (
        <h5 className="card-body border card-title mb-3" key={data}>{data}</h5>
      ))}
      </div>
  );
}

export default MyComponent
