import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ContentWarning from './ContentWarning'
import CommunityTitle from './CommunityTitle'
import '../../css/post.css'
import '../../css/warning.css'

const DiscussionForm = () => {
    return (
        <div>
          <form action = "">
            <CommunityTitle />
            <div className ="create-post m-3">
              <div className ="form-group mb-3">
              <ReactQuill value={""} className = "" placeholder = "Enter the Text" style={{ height: '300px' }} />
              </div>
            </div>
            <ContentWarning />
            <div>
              <div class="float-right">
                <div class="join-btn  create-post-btn mb-4">
                  <input type="submit" value="Save as draft" className="text-white" />
                </div>  
                <div class="join-btn create-post-btn mb-4">
                  <input type="submit" value="Publish" className="text-white" />
                </div>
              </div>
            </div>
          </form>
        </div>  
    )
}

export default DiscussionForm
