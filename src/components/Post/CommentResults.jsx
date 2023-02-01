import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import profile_image from '../../images/profile-img.jpeg'
import telescope_image from '../../images/telescope-snoo.png'

function CommentResults() {
  const [comments, setComments] = useState([])
  const location = useLocation()
  const query = new URLSearchParams(location.search).get('q')

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/communities/1/posts/1/comments')
      .then(res => {
        setComments(res.data.filter(comment=> comment.message.toLowerCase().includes(query.toLowerCase())))
      })
  }, [query])

  return (
    <>
      {comments.length ? (
        comments.map(comment => (
          <div className="card post-card mb-3 shadow">
            <div className="row">
              
              <div className="col-2">
                <div className="card-body">
                <h5 className="card-title" style={{'white-space': 'nowrap' }}>
                    <Link to={`/r/1/p/1/comments/${comment.id}`}>{comment.message}</Link>
                  </h5>
                  <p className="card-text">{comment.post.title}</p>
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

export default CommentResults
