import React from 'react'
import PostList from '../../Post/PostList'

const Top = ({ posts }) => {
  return (
    <div>
      {posts ? [
        <PostList posts={posts} />
      ] : [
        <h4 className="card-title">Best posts will be displayed here</h4>
      ]}
    </div>
  )
}
export default Top
