import React, { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';
import { Card, CardHeader, CardContent, TextField, Button } from '@material-ui/core';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password }).catch(() =>
      notify('Invalid username or password')
    );
  };

  return (
    <Card>
      <CardHeader title="Admin Login" />
      <CardContent>
      <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group first">
          <label htmlFor="signin-email" className="form-label"></label>
          <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group last">
          <label htmlFor="signin-password" className="form-label"></label>
          <TextField label="Password" type="password"  value={password} onChange={(e) => setPassword(e.target.value)} />
        </div><br />
        <p className="small">
          Forgot your <a href="">Password</a> ?
        </p>
       
        <div className="form-group">
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </div><br />
      </form>
    </div>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
