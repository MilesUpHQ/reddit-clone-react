import { post } from 'jquery'
import React from 'react'
import '../../css/post.css'


const CommunityTitle = ({ onChange }) => {
  return (
    <div>
      <form>
        <div className="row mt-3">
          <div className="col-sm-12">
            <div className="card rounded mb-3">
              <div className="form-group">
                <input type='text' id="community_id" className="form-select search-input-navbar community_select" placeholder='Choose a community' onChange={onChange} />
              </div>
            </div>
          </div>
        </div>
        <div className="rounded mb-3">
          <div className="create-post m-3">
            <div className="form-group">
              <input type="text" id="title" className="form-control" placeholder='Title' name='title' onChange={onChange} value={post.title} />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CommunityTitle
