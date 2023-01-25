import React from 'react'
import ContentWarning from './ContentWarning'
import CommunityTitle from './CommunityTitle'
import '../../css/post.css'
import '../../css/warning.css'

const PollForm = () => {
    return (
        <div>
            <form>
                <CommunityTitle />
                <div className="create-post m-3">
                    <div className="form-group">
                        <input type="text" id="body" className="form-control" placeholder="Enter Poll question" />
                    </div>
                </div>
                <ContentWarning />
                <div>
                    <div className="float-right">
                        <div className="join-btn  create-post-btn mb-4">
                            <input type="submit" value="Save as draft" className="text-white" />
                        </div>
                        <div className="join-btn create-post-btn mb-4">
                            <input type="submit" value="Publish" className="text-white" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PollForm
