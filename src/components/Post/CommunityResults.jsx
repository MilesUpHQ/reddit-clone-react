import React from 'react'
import { useLocation } from 'react-router-dom'

function CommunityResults() {
  const location = useLocation()
  const query = new URLSearchParams(location.search).get('q')
  return (
    <div>
      <h3>`Results for "{query}" communities will be displayed here` </h3>
    </div>
  )
}

export default CommunityResults
