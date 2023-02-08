import React from 'react'
import PostList from '../../Post/PostList'

const Hot = ({ posts }) => {
  return (
    <div>
      {posts ? (
        <PostList key={'hot'} posts={posts} />
      ) : (
        <h4 key={'hot'} className="card-title" style={{ textAlign: "center", color: "black" }}>Hot posts will be displayed here</h4>
      )}
    </div>
  )
}
export default Hot
