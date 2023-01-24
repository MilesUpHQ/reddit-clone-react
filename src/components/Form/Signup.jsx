import React from 'react'
import '../../css/signup.css'

const Signup = () => {
  return (
    <div>
      <form action="">
        <div className="form-group first">
          <label htmlFor="username" className="form-label"></label>
          <input type="text" id="username" className="form-control" placeholder='User Name' />
        </div>
        <div className="form-group first">
          <label htmlFor="First name" className="form-label"></label>
          <input type="text" id="first_name" className="form-control" placeholder='First Name' />
        </div>
        <div className="form-group first">
          <label htmlFor="last_name" className="form-label"></label>
          <input type="text" id="last_name" className="form-control" placeholder='Last Name' />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label"></label>
          <input type="email" id="email" className="form-control" placeholder='Email' />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label"></label>
          <input type="password" id="password" className="form-control" placeholder='Password' />
        </div>
        <div className="form-group">
          <label htmlFor="password_confirmation" className="form-label"></label>
          <input type="password" id="password_confirmation" className="form-control " placeholder='Password confirmation' />
        </div>
        <div className="form-group">
          <label htmlFor="profile_image" className="form-label"></label>
          <input type="file" id="profile_image" className="form-control" placeholder='Profile Image' /><br></br>
        </div>
        <div className="form-group">
          <input type="submit" value="Sign up" className="btn btn-login" /><br></br>
        </div>
      </form>
      <p className="small">Already a Redditor? <br></br>
        <a href="/signin">Log in</a>
      </p>
    </div>

  )
}

export default Signup