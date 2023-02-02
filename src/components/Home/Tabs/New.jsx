import React from 'react'
import PostList from '../../Post/PostList'

const New = ({ posts }) => {
  return (
  <div>
      {posts ? (
        <PostList key={2} posts={posts} />
      ) : (
        <h4 key={2} className="card-title">New posts will be displayed here</h4>
      )}
    </div>
  )
}
export default New
