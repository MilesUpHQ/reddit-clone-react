import React from 'react'
import ContentWarning from './ContentWarning'
import CommunityTitle from './CommunityTitle'
import '../../css/post.css'
import '../../css/warning.css'
const LinkForm = () => {
    return (
        <div>
            <form>
                <CommunityTitle />
                <div class="create-post m-3">
                    <div class="form-group">
                        <input type="text" id="link" class="form-control" placeholder="Enter the URL" />
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

export default LinkForm
