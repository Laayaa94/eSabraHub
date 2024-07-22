import React, { useState } from 'react';
import { useAuth } from '../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { authState, login, signup } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords don't match");
          return;
        }
        await signup(formData.username, formData.email, formData.password, formData.confirmPassword);
        alert('Signup successful');
      } else {
        await login(formData.email, formData.password);
        alert('Login successful');
      }
  
      // Log user details
      console.log('User:', authState.user);
      console.log('User Email:', authState.user?.email); // Optional chaining
      console.log('User ID:', authState.user?.id);
      console.log('Token:', authState.token);
  
      navigate('/posts'); // Redirect to the /posts page after successful login or signup
      
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };
  

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
        {isSignup && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        {isSignup && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        )}
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
        <div className="login-bottom-part">
          {isSignup ? (
            <p>
              Already have an account? 
              <span onClick={() => setIsSignup(false)}> Login here</span>
            </p>
          ) : (
            <p>
              Create an account? 
              <span onClick={() => setIsSignup(true)}> Click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
