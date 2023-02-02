import React from 'react'
import PostList from '../../Post/PostList'

const Hot = ({ posts }) => {
  return (
    <div>
      {posts ? (
        <PostList key={1} posts={posts} />
      ) : (
        <h4 key={1} className="card-title">Hot posts will be displayed here</h4>
      )}
    </div>
  )
}
export default Hot
