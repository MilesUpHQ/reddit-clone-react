import React,{useState,useEffect}from 'react'
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Form = ({ community, onChange, onCancel, onSubmit, errorJson }) => {
  const account = JSON.parse(localStorage.getItem('account'))
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/api/v1/categories");
      const data = await res.json();
      setCategories(data);
    }
    fetchData();
  }, []);

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

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
                <select id="category" name="category" className='form-select search-input-navbar community_select' onChange={onChange} value={community.category}>
                <option value="" disabled>Select a category</option>
                  {categories.map((category) => 
                   <option key={category.id} value={category.name}>{category.name}</option>)}
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
            <input type="submit" className='text-white' value="Cancel" onClick={onCancel} />
          </div>
          <div className="join-btn create-post-btn float-right">
            <input type="submit" className='text-white' value="Create Community" onClick={onSubmit} />
          </div>
        </div>
      </div>
    
  )
}

export default Form
