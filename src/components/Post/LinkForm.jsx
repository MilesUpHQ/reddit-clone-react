import React from 'react';
import ContentWarning from './ContentWarning'
import CommunityTitle from './CommunityTitle'
import SubmitPost from './SubmitPost';


const LinkForm = ({ onChange, onSubmit }) => {
  return (
    <div>
      <form>
        <CommunityTitle onChange={onChange} />
        <div className="create-post m-3">
          <div className="form-group">
            <input type="text" id="link" className="form-control" placeholder="Enter the URL" pattern="https?://.+" required />
          </div>
        </div>
        <ContentWarning />
        <SubmitPost onSubmit={onSubmit} />
      </form>
    </div>
  )
}

export default LinkForm
