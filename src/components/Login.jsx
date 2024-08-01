import "../css/Login.css"; // Import the CSS file
import { DataContext, DataProvider } from "./DataContext";
import { useContext } from "react";
import profile from "./profile.png";
import React, { useEffect, useState } from "react";

export default function Login({ setIsLoggedIn }) {
  // const URL = "https://alfa-leetcode-api.onrender.com/";
  const [isSignUp, setIsSignUp] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    leetcode: "",
    github: "",
    bio: "",
    institute: "",
    linkedin: "",
    twitter: "",
    location: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (isSignUp) {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    } else {
      setLoginData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    if (validateForm(step)) {
      setStep(step + 1);
    } else {
      alert("Please fill out all fields correctly.");
    }
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const handleSignUpClick = () => {
    if (validateForm(step)) {
      // Store signup data in local storage
      localStorage.setItem("signupData", JSON.stringify({ ...formData }));
      console.log("Signup Data Stored:", { ...formData }); // Debugging
      setIsLoggedIn(true);
      update();
    } else {
      alert("Please fill out all fields correctly.");
    }
  };

  const handleLoginClick = () => {
    // Retrieve signup data from local storage
    const storedData = JSON.parse(localStorage.getItem("signupData"));
    console.log("Stored Signup Data:", storedData); // Debugging
    if (
      storedData &&
      storedData.email === loginData.email &&
      storedData.password === loginData.password
    ) {
      localStorage.setItem(
        "loginData",
        JSON.stringify({ ...loginData, isLoggedIn: true })
      );
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

  const validateEmail = (email) => {
    return email.endsWith("@gmail.com");
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(password);
  };

  const validateBio = (bio) => {
    const wordCount = bio.trim().split(/\s+/).length;
    return wordCount >= 10 && wordCount <= 26;
  };

  const validateForm = (step) => {
    if (isSignUp) {
      switch (step) {
        case 1:
          return (
            formData.name &&
            validateEmail(formData.email) &&
            validatePassword(formData.password)
          );
        case 2:
          return (
            formData.leetcode && formData.github && validateBio(formData.bio)
          );
        case 3:
          return (
            formData.institute &&
            formData.linkedin &&
            formData.twitter &&
            formData.location
          );
        default:
          return true;
      }
    } else {
      return validateEmail(loginData.email) && loginData.password;
    }
  };

  const {
    solvedProblems,
    easyProb,
    mediumProb,
    hardProb,
    rank,
    contRank,
    contGlobal,
    contAttended,
    contTotal,
    badges,
    setSolvedProb,
    seteasyProb,
    setmediumProb,
    sethardProb,
    setRank,
    setcontRate,
    setcontGlobal,
    setcontAttended,
    setcontTotal,
    setBadges,
  } = useContext(DataContext);
  const [userData, setUserData] = useState({
    avatar: profile,
    name: "N/A",
    leetcodeUsername: "N/A",
    githubUsername: "N/A",
    bio: "N/A",
    gmail: "N/A",
    institute: "N/A",
    linkedin: "N/A",
    twitter: "N/A",
    location: "N/A",
  });
  const [user, setUser] = useState(userData.leetcodeUsername);

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    if (loginData && loginData.isLoggedIn) {
      const signupData = JSON.parse(localStorage.getItem("signupData"));
      if (signupData) {
        setUserData((prevData) => ({
          ...prevData,
          name: signupData.name,
          leetcodeUsername: signupData.leetcode,
          githubUsername: signupData.github,
          bio: signupData.bio,
          gmail: signupData.email,
          institute: signupData.institute || "N/A",
          linkedin: signupData.linkedin || "N/A",
          twitter: signupData.twitter || "N/A",
          location: signupData.location || "N/A",
        }));
      }
    }
  }, []);

  const update = async () => {
    try {
      const response1 = await fetch(URL + "userProfile/" + user);
      const data1 = await response1.json();
      const response2 = await fetch(URL + user + "/contest");
      const data2 = await response2.json();
      const response3 = await fetch(URL + user + "/badges");
      const data3 = await response3.json();
      seteasyProb(data1.easySolved);
      setmediumProb(data1.mediumSolved);
      sethardProb(data1.hardSolved);
      setSolvedProb(data1.totalSolved);
      setRank(data1.ranking);
      setcontGlobal(data2.contestGlobalRanking);
      setcontRate(data2.contestRating);
      setcontAttended(data2.contestAttend);
      setcontTotal(data2.contestTopPercentage);
      setBadges(data3.badges || []);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <div className="container main">
      <div className="card">
        <div className="card-header text-center">
          {isSignUp && step > 1 && (
            <button className="back-button" onClick={handleBackClick}>
              <i className="bi bi-arrow-left-square back"></i>
            </button>
          )}
          {isSignUp ? "Signup" : "Login"}
        </div>
        <div className="card-body">
          <div className="card-text">
            {isSignUp ? (
              <>
                {step === 1 && (
                  <>
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      id="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </>
                )}
                {step === 2 && (
                  <>
                    <label htmlFor="leetcode">LeetCode Username:</label>
                    <input
                      type="text"
                      id="leetcode"
                      value={formData.leetcode}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="github">GitHub Username:</label>
                    <input
                      type="text"
                      id="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="bio">Bio:</label>
                    <input
                      type="text"
                      id="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      required
                    />
                  </>
                )}
                {step === 3 && (
                  <>
                    <label htmlFor="institute">Institute:</label>
                    <input
                      type="text"
                      id="institute"
                      value={formData.institute}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="linkedin">LinkedIn Url:</label>
                    <input
                      type="text"
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="twitter">Twitter Url:</label>
                    <input
                      type="text"
                      id="twitter"
                      value={formData.twitter}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="location">Location:</label>
                    <input
                      type="text"
                      id="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </>
                )}
              </>
            ) : (
              <>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={loginData.email}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  required
                />
              </>
            )}
          </div>
        </div>
        <div className="card-footer text-center">
          {isSignUp ? (
            <>
              {step < 3 && (
                <button className="btn btn-primary" onClick={handleNextClick}>
                  Next
                </button>
              )}
              {step === 3 && (
                <button className="btn btn-primary" onClick={handleSignUpClick}>
                  Sign Up
                </button>
              )}
            </>
          ) : (
            <button className="btn btn-primary" onClick={handleLoginClick}>
              Login
            </button>
          )}
          <button className="btn btn-link" onClick={toggleMode}>
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Signup"}
          </button>
        </div>
      </div>
    </div>
  );
}
