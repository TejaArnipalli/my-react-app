import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 
  const handleLogin = () => {
    console.log("login succed")
    navigate('/profile')
  }
  return (
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
        <input type="email" name='userEmail' placeholder='Enter your email address' value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input type="password" name='userPassword' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter the password' required />
        <button className="btn btn-primary" type='submit'>Login</button>
        </form>
      </div>
  )
}

export default Login
