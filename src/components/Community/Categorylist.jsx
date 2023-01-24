import React from 'react'

function MyComponent() {
  const data = ["Sports", "Tv", "Education","Science"];

  return (
    <div className="card border" >
      {data.map((data) => (
        <h5 className=" card-title  mb-3" key={data}>{data}</h5>
      ))}
      </div>
  );
}

export default MyComponent
