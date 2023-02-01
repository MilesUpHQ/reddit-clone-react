import React from 'react'
import PostList from '../../Post/PostList'

const Hot = ({ posts }) => {
  return (
    <div>
      {posts ? [
        <PostList posts={posts} />
      ] : [
        <h4 className="card-title">Hot posts will be displayed here</h4>
      ]}
    </div>
  )
}
export default Hot
