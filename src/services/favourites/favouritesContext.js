import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthentication } from "../authentication/authenticationContext";

const FavouritesContext = createContext();
export const useFavourites = () => useContext(FavouritesContext);

export const FavouritesContextProvider = ({ children }) => {
  const { user } = useAuthentication();
  const [favourites, setFavourites] = useState([]);

  const add = (restaurant) => {
    setFavourites([...favourites, restaurant]);
  };

  const remove = (restaurant) => {
    const updatedFavourites = favourites.filter(
      (currentRes) => currentRes.placeId !== restaurant.placeId
    );
    setFavourites(updatedFavourites);
  };

  const saveFavourites = async (value, uid) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue);
    } catch (error) {
      console.log("Error Storing", error);
    }
  };

  const loadFavourites = async (uid) => {
    try {
      const value = await AsyncStorage.getItem(`@favourites-${uid}`);
      if (value !== null) {
        setFavourites(JSON.parse(value));
      }
    } catch (error) {
      console.log("Error Loading", error);
    }
  };

  useEffect(() => {
    if (user) loadFavourites(user.uid);
  }, [user]);

  useEffect(() => {
    if (user) saveFavourites(favourites, user.uid);
  }, [favourites, user]);

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites: add,
        removeFromFavourites: remove,
      }}>
      {children}
    </FavouritesContext.Provider>
  );
};
