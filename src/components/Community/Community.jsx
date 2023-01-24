import React, { useState } from 'react';
import '../../css/Community.css';

const Community = () => {
  const [community, setCommunity] = useState({
    profile_image: '',
    cover_image: '',
    name: '',
    url: '',
    summary: '',
    category: '',
    rules: '',
    errors: {}
  });

  const onChange = (event) => {
    setCommunity({ ...community, [event.target.name]: event.target.value });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    // Perform form validation and submit the form data to the API
  }

  const CATEGORIES = ['SPORTS', 'TV', 'EDUCATONAL'];

  return (

    <div className="card rounded mb-3">
    <div className="row">
      <div className="col-sm-12">
        <div className="create-post m-3">
          <div className="form-group">
            <label htmlFor="profile_picture"> Profile Picture </label>
            <input type="file" name="profile_image" onChange={onChange} className={`form-control ${community.errors.profile_image && 'is-invalid'}`} />
            {community.errors.profile_image && <p className="text-danger">{community.errors.profile_image}</p>}
          </div>
        </div>
        <div className="create-post m-3">
          <div className="form-group">
            <label htmlFor="cover_picture"> Cover Picture </label>
            <input type="file" name="cover_image" onChange={onChange} className={`form-control ${community.errors.cover_image && 'is-invalid'}`} />
            {community.errors.cover_image && <p className="text-danger">{community.errors.cover_image}</p>}
          </div>
        </div>
        <div className="create-post m-3">
          <div className="form-group">
            <label htmlFor="name"> Name </label>
            <input type="text" name="name" onChange={onChange} className={`form-control ${community.errors.name && 'is-invalid'}`} maxLength="16" minLength="3"  value={community.name}/>
            {community.errors.name && <p className="text-danger">{community.errors.name}</p>}
          </div>
        </div>
        <div className="create-post m-3">
          <div className="form-group">
            <label htmlFor="url"> Url </label>
            <input type="text" name="url" onChange={onChange} className={`form-control ${community.errors.url && 'is-invalid'}`} value={community.url} />
            {community.errors.url && <p className="text-danger">{community.errors.url}</p>}
            </div>
        </div>
        <div className="create-post m-3">
          <div className="form-group">
            <label htmlFor="summary"> Summary </label>
            <input type="text" name="summary" onChange={onChange} className={`form-control ${community.errors.summary && 'is-invalid'}`} minLength="3" value={community.summary} />
            {community.errors.summary && <p className="text-danger">{community.errors.summary}</p>}
          </div>
        </div>
        <div className="create-post m-3">
          <div className="form-group">
            <label htmlFor="category"> Category </label>
            <select name="category" onChange={onChange} className={`form-control ${community.errors.category && 'is-invalid'}`} value={community.category}>
              <option value="" disabled>Select Category</option>
              {CATEGORIES.map((category, index) => <option key={index} value={category}>{category}</option>)}
            </select>
            {community.errors.category && <p className="text-danger">{community.errors.category}</p>}
          </div>
        </div>
        <div className="create-post m-3">
          <div className="form-group">
            <label htmlFor="rules"> Rules </label>
            <textarea name="rules" onChange={onChange} className
            className={`form-control ${community.errors.rules && 'is-invalid'}`} value={community.rules} />
            {community.errors.rules && <p className="text-danger">{community.errors.rules}</p>}
          </div>
        </div>
      </div>
    </div>
    <div className="create-post m-3">
      <div className="join-btn create-post-btn mb-3 float-right">
        <button type="submit" className="text"onClick={onSubmit}>Submit</button>
      </div>
    </div>
  </div>
  );
}

export default Community
