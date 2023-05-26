import React, { Children, createContext, useReducer, useState } from "react";

export const AuthContext = createContext();

const isLoggedIn = () => {
    const authDetails = localStorage.getItem("authDetails");
  return !!authDetails;
}
const Appcontext = ({ children }) => {
    const [isLoggedInState, setIsLoggedInState] = useState(isLoggedIn());
    
  const login = () => {
    let authDetails = JSON.parse(localStorage.getItem("authDetails"));
   
    if (authDetails.token) {
        setIsLoggedInState(true);
    }
  };
  const logout = () => {
    const logout = localStorage.removeItem("authDetails");
    setIsLoggedInState(false);
  }
  return (
    <>
      <AuthContext.Provider value={{ isLogin :isLoggedInState, login, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default Appcontext;
