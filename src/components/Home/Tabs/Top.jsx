import React from 'react'
import PostList from '../../Post/PostList'

const Top = ({ posts }) => {
  return (
    <div>
      {posts ? (
        <PostList key={3} posts={posts} />
      ) : (
        <h4 key={3} className="card-title">Top posts will be displayed here</h4>
      )}
    </div>
  )
}
export default Top
