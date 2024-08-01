import { createContext, useState } from "react";

export const DataContext = createContext({
  solvedProblems: "",
  easyProb: "",
  mediumProb: "",
  hardProb: "",
  rank: "",
  contRank: "",
  contGlobal: "",
  contAttended: "",
  contTotal: "",
  badges: [],
  setSolvedProb: () => {},
  seteasyProb: () => {},
  setmediumProb: () => {},
  sethardProb: () => {},
  setRank: () => {},
  setcontRate: () => {},
  setContGlobal: () => {},
  setcontGlobal: () => {},
  setcontAttended: () => {},
  setcontTotal: () => {},
  setBadges: () => {},
});

export const DataProvider = ({ children }) => {
  const [solvedProblems, setSolvedProb] = useState(0);
  const [easyProb, seteasyProb] = useState(0);
  const [mediumProb, setmediumProb] = useState(0);
  const [hardProb, sethardProb] = useState(0);
  const [rank, setRank] = useState(0);
  const [contRank, setcontRate] = useState(0);
  const [contGlobal, setcontGlobal] = useState(0);
  const [contAttended, setcontAttended] = useState(0);
  const [contTotal, setcontTotal] = useState(0);
  const [badges, setBadges] = useState([]);

  const val = {
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
  };

  return <DataContext.Provider value={val}>{children}</DataContext.Provider>;
};
