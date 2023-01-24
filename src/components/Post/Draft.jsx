import React from 'react'
import '../../css/post.css'
import '../../css/warning.css'

const Draft = () => {
  return (
    <div>
      <div className = "modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className = "modal-dialog" role="document">
           <div className = "modal-content">
             <div className = "modal-header">
               <h4 className = "modal-title" id="myModalLabel">Drafts</h4>
               <button type="button" className = "close" data-dismiss="modal" aria-label="Close"><span
                      aria-hidden="true">&times;</span></button>
             </div>
             <div className = "modal-body">
               <h1>Drafts</h1>
             </div>
             <div className = "modal-footer">
                <button type="button" className = "btn btn-primary" data-dismiss="modal">Close</button>
             </div>
            </div>
          </div>
       </div>
    </div>
  )
}

export default Draft
