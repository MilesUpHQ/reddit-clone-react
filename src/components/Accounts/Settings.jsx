import React from 'react'
import '../../css/signup.css'
import UseForm from '../Form/UseForm';

const Settings = () => {
 const { error, handleChange, signupValues, handleSubmit } = UseForm();

  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group first">
          <label htmlFor="username" className="form-label"></label>
          <input type="text" id="username" className="form-control" placeholder='User Name' name='username' defaultValue={signupValues.username} onChange={handleChange} />
        </div>
        <div className="form-group first">
          <label htmlFor="First name" className="form-label"></label>
          <input type="text" id="first_name" className="form-control" placeholder='First Name' name='first_name' defaultValue={signupValues.first_name} onChange={handleChange} />
        </div>
        <div className="form-group first">
          <label htmlFor="last_name" className="form-label"></label>
          <input type="text" id="last_name" className="form-control" placeholder='Last Name' name='last_name' defaultValue={signupValues.last_name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label"></label>
          <input type="email" id="email" className="form-control" placeholder='Email' name='email' defaultValue={signupValues.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label"></label>
          <input type="password" id="password" className="form-control" placeholder='Password' name='password' defaultValue={signupValues.password} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password_confirmation" className="form-label"></label>
          <input type="password" id="password_confirmation" className="form-control " placeholder='Password confirmation' name='password_confirmation' defaultValue={signupValues.password_confirmation} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="profile_image" className="form-label"></label>
          <input type="file" id="profile_image" className="form-control" placeholder='Profile Image' name = "profile_image"  onChange= {handleChange} /><br></br>
        </div>
        <div className="form-group">
          <input type="submit" value="Sign up" className="btn btn-login" /><br></br>
        </div>
      </form>
    </div>

  )
}

export default Settings
