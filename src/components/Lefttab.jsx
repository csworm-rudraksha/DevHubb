import React, { useEffect, useState, useContext } from "react";
import profile from "./profile.png";
import "../css/Lefttab.css";
import { DataContext } from "./DataContext";

export default function Lefttab() {
  const URL = 'https://alfa-leetcode-api.onrender.com/';
  const [avatar, setAvatar] = useState(profile);
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
        setUser(signupData.leetcode);
      }
    }
  }, []);

  useEffect(() => {
    const setAvatarUrl = async () => {
      if (user !== "N/A") {
        try {
          const response = await fetch(URL + user);
          const data = await response.json();
          setAvatar(data.avatar || profile);
        } catch (error) {
          console.error("Error fetching avatar:", error);
        }
      }
    };
    setAvatarUrl();
  }, [user]);

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
  
  const mod=()=>{
    
  }

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
            <p id="userid">@{userData.leetcodeUsername}</p>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <button type="button" className="update" onClick={mod}>
          Update Profile
        </button>
      </div>
      <div className="mod">
        {/* hello */}
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
          <i className="bi bi-linkedin"></i> <a href={userData.linkedin}> LinkedIn</a>
        </div>
        <div id="info">
          <i className="bi bi-twitter"></i> <a href={userData.twitter}>Twitter</a>
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
                    <button onClick={update}>
                      <i className="bi bi-arrow-clockwise"></i>
                    </button>
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
                    <button><i className="bi bi-arrow-clockwise"></i></button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
