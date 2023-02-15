import React from 'react'
import ContentWarning from './ContentWarning'
import CommunityTitle from './CommunityTitle'
import SubmitPost from './SubmitPost'

const ImageForm = ({ onChange }) => {
    const onSubmit = () => {
        console.log('submit')
    }

    return (
        <div>
            <form>
                <CommunityTitle onChange={onChange} />
                <div className="create-post m-3">
                    <div className="form-group mb-3">
                        <label htmlFor="images" className="form-label"></label>
                        <input type="file" id="images" className="form-control" placeholder='Upload a Image' /><br></br>
                    </div>
                    <ContentWarning />
                    <SubmitPost onSubmit={onSubmit} />
                </div>
            </form>
        </div >
    )
}

export default ImageForm
