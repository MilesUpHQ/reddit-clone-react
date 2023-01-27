import React from 'react'

const CATEGORIES = ['SPORTS', 'TV', 'EDUCATONAL'];

const Form = ({ community, onChange, onSubmit }) => {
  return (
    <div>
      <div className="card rounded mb-3">
      {/* {errors} */}
      <div className="row">
        <div className="col-sm-12">
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
              <input type="text" name="name" onChange={onChange} className='form-control' maxLength="16" minLength="3" value={community.name} />
              {/* {errors.name && <p className="text-danger">{errors.name}</p>} */}
            </div>
          </div>
          <div className="create-post m-3">
            <div className="form-group">
              <label htmlFor="url"> Url </label>
              <input type="text" name="url" onChange={onChange} className='form-control' value={community.url} />
              {/* {errors.url && <p className="text-danger">{errors.url}</p>} */}
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
              <select name="category" className='form-control' value={community.category}>
                <option value="" disabled>Select Category</option>
                {CATEGORIES.map((category, index) => <option key={index} value={category}>{category}</option>)}
              </select>
              {/* {errors.category && <p className="text-danger">{errors.category}</p>} */}
            </div>
          </div>
          <div className="create-post m-3">
            <div className="form-group">
              <label htmlFor="rules"> Rules </label>
              <textarea name="rules" onChange={onChange} className='form-control' value={community.rules} />
              {/* {errors.rules && <p className="text-danger">{errors.rules}</p>} */}
            </div>
          </div>
        </div>
      </div>
      <div className="create-post m-3">
        <div className="join-btn create-post-btn mb-3 float-right">
          <input type="submit" className='text-white' value="Submit" onClick={onSubmit} />
        </div>
      </div>
    </div>
    </div>
  )
}

export default Form
