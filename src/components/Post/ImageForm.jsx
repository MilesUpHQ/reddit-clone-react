import React from 'react'
import ContentWarning from './ContentWarning'
import CommunityTitle from './CommunityTitle'
import '../../css/post.css'
import '../../css/warning.css'

const ImageForm = () => {
    return (
        <div>
            <form>
                <CommunityTitle />
                <div class="create-post m-3">
                    <div class="form-group">
                        <label htmlFor="images" className="form-label"></label>
                        <input type="file" id="images" className="form-control" placeholder='Upload a Image' /><br></br>
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
                </div>
            </form>
        </div >
    )
}

export default ImageForm
