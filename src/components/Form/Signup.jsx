import React from 'react'
import '../../css/signup.css'
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa'

const Signup = () => {
  return (
    <div>
      <div className="community_post pb-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-8">
            <div className="card text-dark rounded">
              <div className="card-body p-5 text-center">
                <div className="text-left">
                  <h5 className="fw-bold mb-2">Sign Up</h5>
                  <p className="text-dark-50 login-head-text mb-4">By continuing, you agree are setting up a Reddit account and agree to our User Agreement and Privacy Policy.</p>
                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#" className="text-dark"><i className="fa-lg"><FaApple /></i></a>
                    <a href="#" className="text-dark"><i className="fa-lg mx-4 px-2"><FaFacebook /></i></a>
                    <a href="#" className="text-dark"><i className="fa-lg"><FaGoogle /></i></a>
                  </div>
                  <p className="or-line mt-4">OR</p>
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
                      <input type="text" id="last_name" className="form-control"  placeholder='Last Name' />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label"></label>
                      <input type="email" id="email" className="form-control"  placeholder='Email' />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup