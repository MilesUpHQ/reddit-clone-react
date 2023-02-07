import React, { useState, useEffect } from 'react';
import '../../css/signup.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';


const Settings = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const Update_Api_Url = `http://localhost:3000/api/v1/accounts/`

  const Update_Api_data = async (account) => {
    let data = new FormData()
    data.append('username', account.username)
    data.append('first_name', account.first_name)
    data.append('last_name', account.last_name)
    data.append('email', account.email)
    data.append('password', account.password)
    data.append('password_confirmation', account.password_confirmation)
    data.append('profile_image', account.profile_image)
    console.log("data");
    console.log(data);
    fetch(Update_Api_Url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: data,
    }).then(async (response) => {
      if (response.ok) {
        toast.success('Edited Successfully')
        const responseBody = await response.json();
        localStorage.setItem('jwt', responseBody.data.jwt);
        localStorage.setItem('account', JSON.stringify(responseBody.data.account));
        window.location.href = '/';
      }
    }).catch((error) => {
      toast.success('Edited unsuccessfully')
      setError(error.response);
    });
  }

  const account = JSON.parse(localStorage.getItem('account'))

  const [accountValues, setAccountValues] = useState({
    username: account.username,
    first_name: account.first_name,
    last_name: account.last_name,
    email: account.email,
    password: '',
    password_confirmation: '',
    profile_image: null
  });

  const [loginValues, setLoginValues] = useState({
    email: '',
    password: ''
  });
  console.log(accountValues)

  useEffect(() => {
    console.log(accountValues);
  }, [accountValues]);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setAccountValues({
      ...accountValues,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success('Edit Successfully')
    navigate('/')
    setAccountValues(prevState => {
      Update_Api_data(prevState);
      return prevState;
    });
  };
  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group first">
          <label htmlFor="username" className="form-label"></label>
          <input type="text" id="username" className="form-control" placeholder='User Name' name='username' defaultValue={account.username} onChange={handleChange} />
        </div>
        <div className="form-group first">
          <label htmlFor="First name" className="form-label"></label>
          <input type="text" id="first_name" className="form-control" placeholder='First Name' name='first_name' defaultValue={account.first_name} onChange={handleChange} />
        </div>
        <div className="form-group first">
          <label htmlFor="last_name" className="form-label"></label>
          <input type="text" id="last_name" className="form-control" placeholder='Last Name' name='last_name' defaultValue={account.last_name} onChange={handleChange} />
        </div>
        <div className="form-group first">
          <label htmlFor="email" className="form-label"></label>
          <input type="text" id="email" className="form-control" placeholder='Last Name' name='email' defaultValue={account.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label"></label>
          <input type="password" id="current_password" className="form-control" placeholder='Current Password' name='password' defaultValue={account.current_password} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label"></label>
          <input type="password" id="password" className="form-control" placeholder='Password' name='password' defaultValue={account.password} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password_confirmation" className="form-label"></label>
          <input type="password" id="password_confirmation" className="form-control " placeholder='Password confirmation' name='password_confirmation' defaultValue={account.password_confirmation} onChange={handleChange} />
        </div>
        <div className="form-group file-input">
          <label htmlFor="profile_image" className="form-label"></label>
          <input type="file" id="profile_image" className="form-control" name='profile_image' onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">EDIT</button>
      </form>
    </div>
  )
};

export default Settings;
