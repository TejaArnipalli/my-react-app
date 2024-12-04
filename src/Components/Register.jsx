import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './Register.css'
import axios from 'axios';

const Register = () => {
  const [error, setError] = useState('');
  const [successMessage , setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username : '',
    email : '',
    password : '',
    confirmPassword : '',
    gender : '',
    dob : '',
  })

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value,});
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword, gender, dob } = formData;
    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if(password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[&%$@!])[a-zA-Z\d@!%$&]{6,12}$/
    if(!emailRegex.test(email) || !passwordRegex.test(password)) {
      if(!emailRegex.test(email)) {
        setError("Enter valid email");
        return;
      }
      else {
        setError("Enter a password between 6 to 12 characters which contains atleast one capital letter and one special character")
        return;
      }
    }
    setError('');

    try {
      const response = await axios.post('http://localhost:8090/users/createUser', {
        username,
        email,
        password,
        gender,
        dob,
      });
      if(response.status === 200 || response.status === 201) {
        setSuccessMessage("Registration successful! Redirecting to login page...")
        setTimeout(() => {navigate('/login')}, 3000);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Registration failed.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }

  }

  return (
    <div className='register-container'>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        {error && <div className='error-message'>{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <input type="text" name='username' value={formData.username} placeholder='Enter your username' onChange={handleInputChange} />
        <input type="email" name='email' value={formData.email} placeholder='Enter valid email' onChange={handleInputChange} />
        <input type="password" name='password' value={formData.password} placeholder='Enter password' onChange={handleInputChange} />
        <input type="password" name='confirmPassword' value={formData.confirmPassword} placeholder='Confirm the password' onChange={handleInputChange} />
        <div className="gender-dob">
          <select name="gender" id="gender" required onChange={handleInputChange}>
            <option value="gender" disabled selected>Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="custom">Custom</option>
          </select>
          <input type="date" name='dob' required onChange={handleInputChange} />
        </div>
        <button className="btn btn-primary" type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register
