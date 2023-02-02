import React from 'react'
import PostList from '../../Post/PostList'

const New = ({ posts }) => {
  return (
  <div>
      {posts ? (
        <PostList key={'new'} posts={posts} />
      ) : (
        <h4 key={'new'} className="card-title">New posts will be displayed here</h4>
      )}
    </div>
  )
}
export default New
