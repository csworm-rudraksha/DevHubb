import React, { useEffect, useState } from "react";
import profile from "./profile.png";
import "../css/Lefttab.css";

export default function Lefttab() {
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
          institute: signupData.institute || "N/A", // Assuming institute is not part of the initial signup
          linkedin: signupData.linkedin || "N/A",
          twitter: signupData.twitter || "N/A",
          location: signupData.location || "N/A",
        }));
      }
    }
  }, []);

  const [avatar, setAvatar] = useState(profile);
  const URL = 'https://alfa-leetcode-api.onrender.com/';

  useEffect(() => {
    const setAvatarUrl = async () => {
      if (userData.leetcodeUsername !== "N/A") {
        try {
          const response = await fetch(URL + userData.leetcodeUsername);
          const data = await response.json();
          setAvatar(data.avatar || profile);
        } catch (error) {
          console.error("Error fetching avatar:", error);
        }
      }
    };
    setAvatarUrl();
  }, [userData.leetcodeUsername]);
  

  return (
    <div className="container my-4">
      <div className="row" id="user">
        <div className="col-4">
          <img id="avatar" src={avatar} alt="Profile" />
        </div>
        <div className="col-8">
          <div className="row">
            <p id="name">{userData.name}</p>
          </div>
          <div className="row">
            <p id="userid">@{userData.name}</p>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
      <button type="button" className="update">Update Profile</button>
      </div>
      <br />
      <div className="about">{userData.bio}</div>
      <hr />
      <div>
        <div id="info">
          <i className="bi bi-geo-alt"></i> {userData.location}
        </div>
        <div id="info">
          <i className="bi bi-mortarboard"></i> {userData.institute}
        </div>
        <div id="info">
          <i className="bi bi-envelope"></i> {userData.gmail}
        </div>
        <div id="info">
          <i className="bi bi-linkedin"></i> {userData.linkedin}
        </div>
        <div id="info">
          <i className="bi bi-twitter"></i> {userData.twitter}
        </div>
      </div>
      <hr />
      <div className="profiles">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                Dev/Coding Profiles
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="row">
                  <div className="col-2">
                    <img id="lc" src={avatar} alt="LeetCode" />
                  </div>
                  <div className="col-8">
                    <div className="row">
                      <p id="leetcode">LeetCode</p>
                    </div>
                    <div className="row">
                      <p id="lcname">@{userData.leetcodeUsername}</p>
                    </div>
                  </div>
                  <div className="col-2">
                    <button><i class="bi bi-arrow-clockwise"></i></button>
                  </div>
                </div>
                {/* <hr />
                <div className="row">
                  <div className="col-2">
                    <img id="lc" src={avatar} alt="Github" />
                  </div>
                  <div className="col-8">
                    <div className="row">
                      <p id="leetcode">Github (in progress)</p>
                    </div>
                    <div className="row">
                      <p id="lcname">@{userData.githubUsername}</p>
                    </div>
                  </div>
                  <div className="col-2">
                    <button><i class="bi bi-arrow-clockwise"></i></button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
}
