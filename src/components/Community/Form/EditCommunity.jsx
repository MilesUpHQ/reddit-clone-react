import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import '../../../css/Community.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Community_URL = 'http://localhost:3000/api/v1/communities/'

const EditCommunity = () => {

  const navigate = useNavigate();
  let { id } = useParams();
  // const [errors, setErrors] = useState('');
  const [community, setCommunity] = useState({
    account_id: 1,
    name: '',
    url: '',
    rules: ''
  });

  function get_community() {
    return axios.get(Community_URL+id).then((response) => response.data)
  }

  useEffect(() => {
    let mounted = true;
    get_community().then((items) => {
      if(mounted) {
        setCommunity(items);
      }
    });
    return () => (mounted = false);
  }, []);

  // const handleErrors = (error) => {
  //   const { name, value } = error.target;
  //   setErrors({
  //     ...errors,
  //     [name]: value
  //   });
  //   console.log(errors)
  // }

  const edit_community = async (community) => {
    await axios.put(Community_URL+id, { community }).then((response) => {
      if (response.status === 200) {
        toast.success("Community Edited successfully!");
        navigate('/r/'+id)
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
    edit_community(community)
  }

  const CATEGORIES = ['SPORTS', 'TV', 'EDUCATONAL'];

  return (
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
              <input type="text" name="url" onChange={onChange} className='form-control' defaultValue={community.url} />
              {/* {errors.url && <p className="text-danger">{errors.url}</p>} */}
            </div>
          </div>
          <div className="create-post m-3">
            <div className="form-group">
              <label htmlFor="summary"> Summary </label>
              <input type="text" name="summary" onChange={onChange} className='form-control' minLength="3" defaultValue={community.summary} />
              {/* {errors.summary && <p className="text-danger">{errors.summary}</p>} */}
            </div>
          </div>
          <div className="create-post m-3">
            <div className="form-group">
              <label htmlFor="category"> Category </label>
              <select name="category" className='form-control' defaultValue={community.category}>
                <option value="" disabled>Select Category</option>
                {CATEGORIES.map((category, index) => <option key={index} defaultValue={category}>{category}</option>)}
              </select>
              {/* {errors.category && <p className="text-danger">{errors.category}</p>} */}
            </div>
          </div>
          <div className="create-post m-3">
            <div className="form-group">
              <label htmlFor="rules"> Rules </label>
              <textarea name="rules" onChange={onChange} className='form-control' defaultValue={community.rules} />
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

export default EditCommunity
