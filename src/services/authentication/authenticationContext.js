import React, { createContext, useContext, useState, useEffect } from "react";
import * as firebase from "firebase";

import { loginRequest } from "./authenticationService";

const AuthenticationContext = createContext();
export const useAuthentication = () => useContext(AuthenticationContext);

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((loggedInUser) => {
        setUser(loggedInUser);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e);
      });
  };

  return (
    <AuthenticationContext.Provider value={{ user, isLoading, error, onLogin }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
