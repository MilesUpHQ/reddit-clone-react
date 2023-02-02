import React from 'react'
import PostList from '../../Post/PostList'

const Best = ({ posts }) => {
  return (
  <div>
      {posts ? (
        <PostList key={2} posts={posts} />
      ) : (
        <h4 key={2} className="card-title">Best posts will be displayed here</h4>
      )}
    </div>
  )
}
export default Best
