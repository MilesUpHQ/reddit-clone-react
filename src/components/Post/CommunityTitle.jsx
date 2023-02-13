import React from 'react'
import '../../css/post.css'

const CommunityTitle = ({ postTitle, onChange }) => {
  return (
    <div>
        <div className="rounded mb-3">
          <div className="create-post m-3">
            <div className="form-group">
              <input type="text" id="title" className="p-2 ps-3 form-control" placeholder='Title' name='title' onChange={onChange} defaultValue={postTitle} />
            </div>
          </div>
        </div>
    </div>
  )
}

export default CommunityTitle
