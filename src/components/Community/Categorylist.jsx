import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";

function MyComponent() {
  const location = useLocation();
  const category = new URLSearchParams(location.search).get('category');

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:3000/api/v1/categories');
      const data = await res.json();
      setCategories(data.map(item => item.name));
    }
    fetchData();
  }, []);

  return (
    <div className="card" >
      {categories.map((cat) => (
        <Link to={`/r/?category=${cat}`} className={`list-group-item text-primary ${category === cat ? 'border-secondary'  : ''}`} style={{borderWidth: "2px"}}>
         {cat}
       </Link>
      ))}
      </div>
  );
}

export default MyComponent
