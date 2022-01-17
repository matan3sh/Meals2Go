import React, { useState, createContext, useContext, useEffect } from "react";
import { locationRequest, locationTransform } from "./locationService";

export const LocationContext = createContext();
export const useLocation = () => useContext(LocationContext);

export const LocationContextProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [keyword, setKeyword] = useState("san francisco");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (searchKeyword = "Antwerp") => {
    console.log(searchKeyword);
    setIsLoading(true);
    setKeyword(searchKeyword);
    locationRequest(searchKeyword.toLowerCase())
      .then(locationTransform)
      .then((result) => {
        setIsLoading(false);
        setLocation(result);
        console.log(result);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    onSearch(keyword);
  }, []);

  return (
    <LocationContext.Provider
      value={{ isLoading, error, location, search: onSearch, keyword }}>
      {children}
    </LocationContext.Provider>
  );
};
