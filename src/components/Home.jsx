import React from 'react';
import '../css/Home.css'; // Import the CSS file
import profile from "./profile.png";

export default function Home() {
  return (
    <div className="home-container">
      <div className="image-container">
        <img src={profile} alt="Welcome" className="home-image" />
      </div>
      <div className="buttons-container">
        <button className="btn btn-primary" onClick={() => alert('Login Clicked')}>
          Login
        </button>
        <button className="btn btn-secondary" onClick={() => alert('Sign Up Clicked')}>
          Sign Up
        </button>
      </div>
    </div>
  );
}
