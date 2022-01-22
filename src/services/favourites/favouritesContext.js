import React, { createContext, useContext, useState } from "react";

export const FavouritesContext = createContext();
export const useFavourites = () => useContext(FavouritesContext);

export const FavouritesContextProvider = ({ children }) => {
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
