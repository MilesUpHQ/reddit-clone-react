import React from 'react'
import { useLocation } from 'react-router-dom'

function CommentResults() {
  const location = useLocation()
  const query = new URLSearchParams(location.search).get('q')
  return (
    <div>
      <h3>`Results for "{query}" comments will be displayed here` </h3>
    </div>
  )
}

export default CommentResults
