import React from 'react'
import '../../css/signin.css'
import {FaApple, FaFacebook, FaGoogle} from 'react-icons/fa'

const Signin = () => {
  return (
    <div>
      <div className="community_post pb-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-8">
            <div className="card text-dark rounded">
              <div className="card-body p-5">
                <div className="text-left">
                  <h5 className="fw-bold mb-2">Log In</h5>
                  <p className="text-dark-50 login-head-text mb-4">By continuing, you agree are setting up a Reddit account and agree to our User Agreement and Privacy Policy.</p>
                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#" className="text-dark"><i className=" fa-lg"><FaApple /></i></a>
                    <a href="#" className="text-dark"><i className="fa-lg mx-4 px-2"><FaFacebook /></i></a>
                    <a href="#" className="text-dark"><i className="fa-lg"><FaGoogle /></i></a>
                  </div>

                  <p className="or-line mt-4">OR</p>

                  <form action="">
                    <div className="form-group first">
                      <label htmlFor="signin-email" className="form-label"></label>
                      <input type="email" id="signin-email" className="form-control" placeholder='Username' />
                    </div>
                    <div className="form-group last">
                      <label htmlFor="signin-password" className="form-label"></label>
                      <input type="password" id="signin-password" className="form-control" placeholder='Password' />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin
