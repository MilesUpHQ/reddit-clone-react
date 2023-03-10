import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Signup_Api_Url = "http://localhost:3000/api/v1/accounts/"
const Signin_Api_Url = "http://localhost:3000/api/v1/accounts/sign_in/"
const Edit_Api_Url = "http://localhost:3000/api/v1/accounts/edit/"

function Signin_Api_data(account) {
  return axios.post(Signin_Api_Url, { account }).then((response) => response.data).catch((error) => console.log(error));
}

function Edit_Api_data(account) {
  return axios.get(Edit_Api_Url, { account }).then((response) => response.data).catch((error) => console.log(error));
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
    password_confirmation: '',
    profile_image: null
  });
  const [loginValues, setLoginValues] = useState({
    email: '',
    password: ''
  });
  const Signup_Api_data = async (account) => {
    let data = new FormData()
    data.append('username', signupValues.username)
    data.append('first_name', signupValues.first_name)
    data.append('last_name', signupValues.last_name)
    data.append('email', signupValues.email)
    data.append('password', signupValues.password)
    data.append('password_confirmation', signupValues.password_confirmation)
    data.append('profile_image', signupValues.profile_image)
    console.log("data");
    console.log(data);
    fetch(Signup_Api_Url, {
      method: 'POST',
      body: data,
    }).then((response) => {
      if (response.ok) {
        Signin_Api_data(signupValues)
      }
    }).catch((error) => {
      setError(error.response);
    });
  }

  const Signin_Api_data = async (account) => {
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
    const { name, value, files } = e.target;
    setLoginValues({
      ...loginValues,
      [name]: files ? files[0] : value
    });
    console.log(loginValues)
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    Signin_Api_data(loginValues)
  }
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setSignupValues({
      ...signupValues,
      [name]: files ? files[0] : value
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