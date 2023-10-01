import React, { createContext, useContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const decodeToken = (token) => {
    if (token) {
      const decoded = jwt_decode(token);
      const userData = decoded.data;
      console.log("UserID: ", userData);
      setUser(userData);
    } else {
      const tokenLocal = localStorage.getItem("token");
      if (tokenLocal) {
        console.log("UserID: from local ");
        decodeToken(tokenLocal);
      }
    }
  };
  useEffect(() => {
    decodeToken();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, decodeToken }}>
      {children}
    </UserContext.Provider>
  );
};
const useUser = () => {
  const context = useContext(UserContext);
  if (context) {
    return context;
  }
};
export default useUser;
