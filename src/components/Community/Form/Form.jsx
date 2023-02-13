import React from 'react'
import { toast } from 'react-toastify';
const CATEGORIES = ["Sports", "Gaming", "Technology", "News", "TV", "Music", "Crypto", "Fashion", "Food", "Health", "Science", "Finance"];

const Form = ({ community, onChange, onSubmit, errorJson }) => {
  const account = JSON.parse(localStorage.getItem('account'))
  return (
    <div className="">
        <div className="">
          <div className="">
            <div className="create-post m-3">
              <div className="form-group">
                <label htmlFor="profile_picture"> Profile Picture </label>
                <input type="file" name="profile_image" onChange={onChange} className='form-control' />
                {/* {community.errors.profile_image && <p className="text-danger">{community.errors.profile_image}</p>} */}
              </div>
            </div>
            <div className="create-post m-3">
              <div className="form-group">
                <label htmlFor="cover_picture"> Cover Picture </label>
                <input type="file" name="cover_image" onChange={onChange} className='form-control' />
                {/* {community.errors.cover_image && <p className="text-danger">{community.errors.cover_image}</p>} */}
              </div>
            </div>
            <div className="create-post m-3">
              <div className="form-group">
                <label htmlFor="name"> Name </label>
                <input type="text" name="name" onChange={onChange} className={`form-control ${errorJson.name && 'border-danger'}`} maxLength="25" minLength="3" value={community.name} />
                {errorJson.name && <p className="text-danger">{errorJson.name}</p>}
              </div>
            </div>
            <div className="create-post m-3">
              <div className="form-group">
                <label htmlFor="url"> Url </label>
                <input type="text" name="url" onChange={onChange} className={`form-control ${errorJson.url && 'border-danger'}`} value={community.url} />
                {errorJson.url && <p className="text-danger">{errorJson.url[0]}</p>}
              </div>
            </div>
            <div className="create-post m-3">
              <div className="form-group">
                <label htmlFor="summary"> Summary </label>
                <input type="text" name="summary" onChange={onChange} className='form-control' minLength="3" value={community.summary} />
                {/* {errors.summary && <p className="text-danger">{errors.summary}</p>} */}
              </div>
            </div>
            <div className="create-post m-3">
              <div className="form-group">
                <label htmlFor="category"> Category </label>
                <select id="category" name="category" className='form-select search-input-navbar community_select' value={community.category} onChange={onChange}>
                  <option value="" disabled>Select Category</option>
                  {CATEGORIES.map((category, index) => <option key={index} value={category}>{category}</option>)}
                  <input type="text" id="category" className="form-control" placeholder='' name='Category' onChange={onChange} />
                </select>
                {/* {errors.category && <p className="text-danger">{errors.category}</p>} */}
              </div>
            </div>
            <div className="create-post m-3">
              <div className="form-group">
                <label htmlFor="rules"> Rules </label>
                <textarea name="rules" onChange={onChange} className={`form-control ${errorJson.rules && 'border-danger'}`} value={community.rules} />
                {errorJson.rules && <p className="text-danger">{errorJson.rules}</p>}
              </div>
            </div>
          </div>
        </div>
        <div className="create-post m-3 d-flex gap-2 float-right">
          <div className="join-btn create-post-btn float-right">
            <input type="submit" className='text-white' value="Cancel" onClick={onSubmit} />
          </div>
          <div className="join-btn create-post-btn float-right">
            <input type="submit" className='text-white' value="Create Community" onClick={onSubmit} />
          </div>
        </div>
      </div>
    
  )
}

export default Form
