import React from 'react'
import Signin from './Signin'
import Signup from './Signup'
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa'

const Form = (props) => {
  return (
    <div>
       <div className="community_post pb-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-8">
            <div className="card text-dark rounded">
              <div className="card-body p-5">
                <div className="text-left">
                  <h5 className="fw-bold mb-2">{props.data.title}</h5>
                  <p className="text-dark-50 login-head-text mb-4">{props.data.description}</p>
                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#" className="text-dark"><i className=" fa-lg"><FaApple /></i></a>
                    <a href="#" className="text-dark"><i className="fa-lg mx-4 px-2"><FaFacebook /></i></a>
                    <a href="#" className="text-dark"><i className="fa-lg"><FaGoogle /></i></a>
                  </div>

                  <p className="or-line mt-4">OR</p>
                  {props.data.title == "Log In" ? (<Signin />) : (<Signup />)}
                </div>
              </div>
            </div>
           </div>
          </div>
        </div>    
    </div>
  )
}

export default Form
