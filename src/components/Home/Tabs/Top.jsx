import React from 'react'
import PostList from '../../Post/PostList'

const Top = ({ posts ,profilePage }) => {
  return (
    <div>
      {posts ? (
        <PostList key={'top'} posts={posts} profilePage={profilePage} />
      ) : (
        <h4 key={'top'} className="card-title" style={{ textAlign: "center", color: "black" }}>Top posts will be displayed here</h4>
      )}
    </div>
  )
}
export default Top
