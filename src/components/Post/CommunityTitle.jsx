import React, { useState } from 'react'
import '../../css/post.css'

const CommunityTitle = ({ postTitle, onChange }) => {
  const [charCount, setCharCount] = useState(0)

  const handleChange = event => {
    setCharCount(event.target.value.length)
    onChange(event)
  }

  return (
    <div>
      <div className="rounded mb-3">
        <div className="create-post m-3">
          <div className="form-group">
            <input type="text" id="title" className="form-control" placeholder='Title' name='title' maxLength="300" onChange={handleChange} defaultValue={postTitle} />
          </div>
          <div className="row" className="char-count">{charCount}/300</div>
        </div>
      </div>
    </div>
  )
}

export default CommunityTitle
