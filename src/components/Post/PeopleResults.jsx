import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import profile_image from '../../images/profile-img.jpeg'
import telescope_image from '../../images/telescope-snoo.png'

function PeopleResults() {
  const [people, setPeople] = useState([])
  const location = useLocation()
  const query = new URLSearchParams(location.search).get('q')

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/navbar_search')
      .then(res => {
        setPeople(res.data.accounts.options.filter(person => person.username.toLowerCase().includes(query.toLowerCase())))
      })
  }, [query])

  return (
    <>
      {people.length ? (
        people.map(person => (
          <div className="card post-card mb-3 shadow">
            <div className="row">
              
              <div className="col-2">
                <div className="card-body">
                  <h5 className="card-title">
                    {/* <Link to={`/profile/${person.id}`}>{person.username}</Link> */}
                    <Link to={`/profile`}>{person.username}</Link>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="card post-card mb-3 shadow">
          <center>
             <img src={telescope_image} className="" alt="profile" />
            <h4><b>Hm... we couldn't find any results for "{query}"</b></h4>
          </center>
          <br />
        </div>
      )}
    </>
  )
}

export default PeopleResults
