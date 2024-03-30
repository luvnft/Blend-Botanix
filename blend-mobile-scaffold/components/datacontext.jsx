import React, { createContext, useContext, useState } from "react";
const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [wallet, setWallet] = useState('')
    const [userData, setUserData] = useState(null)
    const [imageuri, setImageuri] = useState(null)
    const [s3URL, setS3URL] = useState(null);
    const [identityName, setIdentityName] = useState(null)
    const [metaData, setMetaData] = useState(null)
    const [tokenIds, setTokenIds] = useState(null);
    const [clickedItem, setClickedItem] = useState(null);
    const [balance, setBalance] = useState(null);

  return (
    <DataContext.Provider value={{ wallet, setWallet, userData, setUserData, imageuri, setImageuri, s3URL, setS3URL, identityName, setIdentityName, metaData, setMetaData, tokenIds, setTokenIds, clickedItem, setClickedItem, balance, setBalance }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
