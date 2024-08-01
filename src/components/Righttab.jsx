import React, { useContext, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../css/Righttab.css";
import { DataContext, DataProvider } from "./DataContext";

// URL commented out for local testing
// const URL = 'https://alfa-leetcode-api.onrender.com/';

export default function Righttab() {
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

  // const [solvedProblems, setSolvedProb] = useState(0);
  // const [easyProb, seteasyProb] = useState(0);
  // const [mediumProb, setmediumProb] = useState(1);
  // const [hardProb, sethardProb] = useState(0);
  // const [rank, setRank] = useState(0);
  // const [badges, setBadges] = useState([]);
  // const [contRank, setContRate] = useState(0);
  // const [contGlobal, setcontGlobal] = useState(0);
  // const [contAttended, setcontAttended] = useState(0);
  // const [contTotal, setcontTotal] = useState(0);
  const signupData = JSON.parse(localStorage.getItem("signupData"));
  const [user, setUser] = useState(signupData.leetcode);
  const pieChartStyle = {
    background: `conic-gradient(
      #4caf50 0% ${(easyProb * 100) / solvedProblems}%,
      #ff9800 ${(mediumProb * 100) / solvedProblems}% ${
      (easyProb * 100) / solvedProblems + (mediumProb * 100) / solvedProblems
    }%,
      #f44336 ${
        (easyProb * 100) / solvedProblems + (mediumProb * 100) / solvedProblems
      }% 100%
    )`,
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    position: "relative",
  };

  // Fetch first row
  // useEffect(() => {
  //   const userDetails = async () => {
  //     try {
  //       const response = await fetch(URL + "userProfile/" + user);
  //       const data = await response.json();
  //       seteasyProb(data.easySolved);
  //       setmediumProb(data.mediumSolved);
  //       sethardProb(data.hardSolved);
  //       setSolvedProb(data.totalSolved);
  //       setRank(data.ranking);
  //     } catch (error) {
  //       console.error("Error fetching problem levels:", error);
  //     }
  //   };
  //   userDetails();
  // }, []);

  // Fetch contest
  // useEffect(() => {
  //   const contestDetatils = async () => {
  //     try {
  //       const response = await fetch(URL + user + "/contest");
  //       const data = await response.json();
  //       setcontGlobal(data.contestGlobalRanking);
  //       setContRate(data.contestRating);
  //       setcontAttended(data.contestAttend);
  //       setcontTotal(data.contestTopPercentage);
  //     } catch (error) {
  //       console.error("Error fetching problem levels:", error);
  //     }
  //   };
  //   contestDetatils();
  // }, []);

  // Fetch user badges
  // useEffect(() => {
  //   const fetchBadges = async () => {
  //     try {
  //       const response = await fetch(URL + user + "/badges");
  //       const data = await response.json();
  //       setBadges(data.badges || []); // Ensure data.badges is defined and is an array
  //     } catch (error) {
  //       console.error("Error fetching badges:", error);
  //     }
  //   };
  //   fetchBadges();
  // }, []);
  return (
    <div className="container my-0 mx-0">
      {/* ROW 1 */}
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-12 mb-1">
          <div className="card1 text-center py-5 px-2 mx-1">
            <h4>Total Questions</h4>
            <h1 className="ques">{solvedProblems}</h1>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 mb-1">
          <div className="card2 text-center py-5 px-2 mx-1">
            <h4>Ranking</h4>
            <h1 className="days">{rank}</h1>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 mb-1">
          <div className="card3 py-5 px-3 mx-1 d-flex flex-column flex-md-row align-items-center">
            <div className="col-12 col-md-4 mb-3 mb-md-0">
              <div className="pie-chart mx-auto" style={pieChartStyle}>
                <div className="center"></div>
              </div>
            </div>
            <div className="col-12 col-md-8" id="levels">
              <div className="row">
                <div className="col-12 d-flex align-items-center mb-1">
                  <span
                    role="img"
                    aria-label="Easy"
                    style={{ marginRight: "8px" }}
                  >
                    🟩
                  </span>
                  <span> Easy: {easyProb} Ques</span>
                </div>
                <div className="col-12 d-flex align-items-center mb-1">
                  <span
                    role="img"
                    aria-label="Medium"
                    style={{ marginRight: "8px" }}
                  >
                    🟧
                  </span>
                  <span> Medium: {mediumProb} Ques</span>
                </div>
                <div className="col-12 d-flex align-items-center mb-1">
                  <span
                    role="img"
                    aria-label="Hard"
                    style={{ marginRight: "8px" }}
                  >
                    🟥
                  </span>
                  <span> Hard: {hardProb} Ques</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ROW 2 */}
      <div className="row">
        <div className="col mb-1">
          <div className="card6 text-center py-5 px-2 mx-1">
            <h4>Contests Attended</h4>
            <h1 className="days">{contAttended}</h1>
          </div>
        </div>
        <div className="col mb-1">
          <div className="card7 text-center py-5 px-2 mx-1">
            <h4>Total Contest percentage</h4>
            <h1 className="days">{contTotal}</h1>
          </div>
        </div>
      </div>
      {/* ROW 3 */}
      <div className="row my-1">
        <div className="col-lg-3 col-md-6 col-sm-12 mb-1">
          <div className="card4 text-center py-5 px-2 mx-1">
            <h4>Awards</h4>
            <div className="carousel-container">
              <Carousel
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={false}
                interval={3000}
              >
                {badges && badges.length > 0 ? (
                  badges.map((badge) => (
                    <div key={badge.id} className="badge">
                      <img src={badge.icon} alt={badge.displayName} />
                    </div>
                  ))
                ) : (
                  <p>No badges available</p>
                )}
              </Carousel>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-1">
          <div className="card5 text-center py-5 px-2 mx-1">
            <h4>Contest Global Ranking</h4>
            <h1 className="days">{contGlobal}</h1>
          </div>
        </div>
        <div className="col-lg-5 col-md-6 col-sm-12 mb-1">
          <div className="card2 text-center py-5 px-2 mx-1">
            <h4>Contest Rating</h4>
            <h1 className="days">{contRank}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
