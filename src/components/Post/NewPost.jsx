import React from 'react'
import Postform from './Postform'
import Draft from './Draft'
import '../../css/post.css'

const NewPost = () => {
    return (
        <div>
          <div className = "community_post pb-5">
            <div className = "row">
              <div className = "col-sm-8">
                <div className = "row new_post_head pb-1">
                  <div className = "col-10 p-0">
                    <h5 className = "">Create Post</h5>
                  </div>
                  <div className = "col-2 p-0">
                    <Draft />
                  </div>
                </div>
                <div className = "row mt-3">
                  <div className = "col-12">
                    <Postform />
                  </div>
                </div>
               </div>
             </div>
            </div>
            
        </div>
    )
}

export default NewPost
