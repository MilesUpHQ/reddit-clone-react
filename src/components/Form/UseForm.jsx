import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup_Api_Url = "http://localhost:3000/api/v1/accounts/"
const Signin_Api_Url = "http://localhost:3000/api/v1/accounts/sign_in/"

function Signin_Api_data(account) {
  return axios.post(Signin_Api_Url, { account }).then((response) => response.data).catch((error) => console.log(error));
}

const UseForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [signupValues, setSignupValues] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const [loginValues, setLoginValues] = useState({
    email: '',
    password: ''
  });

  const Signup_Api_data = async(account) => {
    await axios.post(Signup_Api_Url, { account }).then((response) => {
      if (response.status == 201) {
        localStorage.setItem('jwt', response.data.jwt);
        localStorage.setItem('account', JSON.stringify(response.data.account));
        window.location.href = '/';
      }
    }).catch((error) => {
      setError(error.response.data.error);
    });
  }

  const Signin_Api_data = async(account) => {
    await axios.post(Signin_Api_Url, { account }).then((response) => {
      if (response.status == 201) {
        localStorage.setItem('jwt', response.data.jwt);
        localStorage.setItem('account', JSON.stringify(response.data.account));
        window.location.href = '/';
      }
    }).catch((error) => {
      setError(error.response.data.error);
    });
  }

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginValues({
      ...loginValues,
      [name]: value
    });
    console.log(loginValues)
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    Signin_Api_data(loginValues)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupValues({
      ...signupValues,
      [name]: value
    });
    console.log(signupValues)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Signup_Api_data(signupValues);
  }

  return { error, handleChange, signupValues, handleSubmit, handleLoginChange, handleLoginSubmit, loginValues }
}

export default UseForm
