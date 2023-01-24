import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../../css/Community.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Community_URL = 'http://localhost:3000/api/v1/communities/'

const NewCommunity = () => {

  const navigate = useNavigate();
  // const [errors, setErrors] = useState('');
  const [community, setCommunity] = useState({
    account_id: 1,
    name: '',
    url: '',
    rules: ''
  });

  // const handleErrors = (error) => {
  //   const { name, value } = error.target;
  //   setErrors({
  //     ...errors,
  //     [name]: value
  //   });
  //   console.log(errors)
  // }

  const set_new_community = async (community) => {
    await axios.post(Community_URL, { community }).then((response) => {
      if (response.status === 201) {
        toast.success("Community Created successfully!");
        navigate('/')
      }
    }).catch((error) => {
      console.log(error.response.data);
      toast.error("An error occured while submitting the form");
      // handleErrors(error.response.data)
    })
  }

  const onChange = (event) => {
    setCommunity({ ...community, [event.target.name]: event.target.value });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    let response = set_new_community(community)
    console.log(response)
  }

  const CATEGORIES = ['SPORTS', 'TV', 'EDUCATONAL'];

  return (
    <div className="card rounded mb-3">
      <h1>vasa</h1>
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
          <button type="submit" className="text" onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default NewCommunity
