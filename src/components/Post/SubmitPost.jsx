import React from 'react'
import PostApi from '../Home/PostApi';

const SubmitPost = ({ onSubmit }) => {
  const { post, set_new_post } = PostApi()

  return (
    <div>
      <div className="d-flex justify-content-end float-right">
        <div className="join-btn border-secondary mb-4">
          <input type="submit" value="Save Draft" className="text-secondary"
            onClick={() => {
              set_new_post({ ...post, is_drafted: true });
            }}
          />
        </div>
        <div className="join-btn bg-secondary border-secondary mb-4">
          <input type="submit" value="Post" className="text-white" onClick={onSubmit} />
        </div>
      </div>
    </div>
  )
}

export default SubmitPost
