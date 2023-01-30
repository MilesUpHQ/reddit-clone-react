import React from 'react'
import '../../css/signin.css'
import UseForm from './UseForm';

const Signin = () => {
  const { error, handleLoginChange, loginValues, handleLoginSubmit } = UseForm();

  return (
    <div>
      {error && <p>{error}</p>}
      <form action="" onSubmit={handleLoginSubmit}>
        <div className="form-group first">
          <label htmlFor="signin-email" className="form-label"></label>
          <input type="email" id="signin-email" className="form-control" placeholder='Email' name='email' defaultValue={loginValues.email} onChange={handleLoginChange} />
        </div>
        <div className="form-group last">
          <label htmlFor="signin-password" className="form-label"></label>
          <input type="password" id="signin-password" className="form-control" placeholder='Password' name='password' defaultValue={loginValues.password} onChange={handleLoginChange} />
        </div><br />
        <p className="small">
          Forgot your <a href="">Password</a> ?
        </p>
        <p className="small pb-lg-2">
          Didn't receive <a href="">confirmation instructions</a> ?
        </p>
        <div className="form-group">
          <input type="submit" value="Log in" className="btn btn-login" />
        </div><br />
        <p className="small">New to Reddit?! <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  )
}

export default Signin
