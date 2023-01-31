import React from 'react'
import '../../css/post.css'

const CommunityTitle = ({ onChange }) => {
  return (
    <div>
      <form>

        <div className="rounded mb-3">
          <div className="create-post m-3">
            <div className="form-group">
              <input type="text" id="title" className="form-control" placeholder='Title' name='title' onChange={onChange} />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CommunityTitle