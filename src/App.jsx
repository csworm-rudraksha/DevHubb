import React, { useEffect, useState } from "react";
import Righttab from "./components/Righttab";
import "./App.css";
import Navbar from "./components/Navbar";
import Lefttab from "./components/Lefttab";
import Login from "./components/Login";
import Home from "./components/Home"

export default function App() {
  // const URL = "https://alfa-leetcode-api.onrender.com/";
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    if (loginData && loginData.isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Navbar handleLogout={handleLogout} />
          <div className="row my-4 mx-5" id="main">
            <div className="col-4" id="left">
              <Lefttab url={URL} />
            </div>
            <div className="col-8 px-0 mx-0" id="right">
              <Righttab />
            </div>
          </div>
        </>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
     
    </div>
  );
}
