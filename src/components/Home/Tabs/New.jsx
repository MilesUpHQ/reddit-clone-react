import React from 'react'
import PostList from '../../Post/PostList'

const New = ({ posts, profilePage }) => {
  return (
    <div>
      {posts ? (
        <PostList key={'new'} posts={posts} profilePage={profilePage} />
      ) : (
        <h4 key={'new'} className="card-title" style={{ textAlign: "center", color: "black" }}>New posts will be displayed here</h4>
      )}
    </div>
  )
}
export default New
