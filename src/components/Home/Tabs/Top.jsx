import React from 'react'
import PostList from '../../Post/PostList'

const Top = ({ posts }) => {
  return (
    <div>
      {posts ? (
        <PostList key={'top'} posts={posts} />
      ) : (
        <h4 key={'top'} className="card-title">Top posts will be displayed here</h4>
      )}
    </div>
  )
}
export default Top
