import React, { useState } from "react";
import "../css/Login.css"; // Import the CSS file

export default function Login({ setIsLoggedIn }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    leetcode: "",
    github: "",
    bio: ""
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (isSignUp) {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value
      }));
    } else {
      setLoginData((prevData) => ({
        ...prevData,
        [id]: value
      }));
    }
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const handleSignUpClick = () => {
    // Store signup data in local storage
    localStorage.setItem("signupData", JSON.stringify({ ...formData }));
    console.log("Signup Data Stored:", { ...formData }); // Debugging
    setIsLoggedIn(true);
  };

  const handleLoginClick = () => {
    // Retrieve signup data from local storage
    const storedData = JSON.parse(localStorage.getItem("signupData"));
    console.log("Stored Signup Data:", storedData); // Debugging
    if (storedData && storedData.email === loginData.email && storedData.password === loginData.password) {
      localStorage.setItem("loginData", JSON.stringify({ ...loginData, isLoggedIn: true }));
      console.log("Login Successful:", { ...loginData }); // Debugging
      setIsLoggedIn(true);
    } else {
      alert("Invalid email or password");
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setStep(1);
  };

  return (
    <div className="container main">
      <div className="card">
        <div className="card-header">
          {isSignUp && step > 1 && (
            <button className="btn btn-link back-button" onClick={handleBackClick}>
              <i className="bi bi-arrow-left-square back"></i>
            </button>
          )}
          {isSignUp ? "Signup" : "Login"}
        </div>
        <div className="card-body">
          <h5 className="card-title text-center">Welcome to DevHubb</h5>
          <div className="card-text">
            {isSignUp ? (
              <>
                {step === 1 && (
                  <>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={formData.name} onChange={handleInputChange} />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={formData.email} onChange={handleInputChange} />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={formData.password} onChange={handleInputChange} />
                  </>
                )}
                {step === 2 && (
                  <>
                    <label htmlFor="leetcode">LeetCode Username:</label>
                    <input type="text" id="leetcode" value={formData.leetcode} onChange={handleInputChange} />
                    <label htmlFor="github">GitHub Username:</label>
                    <input type="text" id="github" value={formData.github} onChange={handleInputChange} />
                    <label htmlFor="bio">Bio:</label>
                    <input type="text" id="bio" value={formData.bio} onChange={handleInputChange} />
                  </>
                )}
                {step < 3 && (
                  <a href="#" className="btn btn-secondary" onClick={handleNextClick}>
                    Next <i className="bi bi-arrow-right-square"></i>
                  </a>
                )}
                {step === 3 && (
                  <button className="btn btn-primary" onClick={handleSignUpClick}>
                    Sign Up
                  </button>
                )}
              </>
            ) : (
              <>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={loginData.email} onChange={handleInputChange} />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={loginData.password} onChange={handleInputChange} />
                <button className="btn btn-primary" onClick={handleLoginClick}>
                  Login
                </button>
              </>
            )}
            <button className="btn btn-link toggle-button" onClick={toggleMode}>
              {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
