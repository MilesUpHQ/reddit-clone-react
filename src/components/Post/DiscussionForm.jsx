import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ContentWarning from './ContentWarning'
import CommunityTitle from './CommunityTitle'
import '../../css/post.css'
import '../../css/warning.css'
import SubmitPost from './SubmitPost';

const DiscussionForm = ({ onChange, handleChange, onSubmit }) => {
  return (
    <div>
      <form action="">
        <CommunityTitle onChange={onChange} />
        <div className="create-post m-3">
          <div className="form-group mb-3">
            <ReactQuill placeholder="Enter the Text" modules={{ clipboard: { matchVisual: false } }} style={{ height: '300px' }} onChange={handleChange} />
          </div>
        </div>
        <ContentWarning />
        <SubmitPost onSubmit={onSubmit} />
      </form >
    </div >
  )
}
export default DiscussionForm



