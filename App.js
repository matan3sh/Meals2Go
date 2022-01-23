import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation";

import { RestaurantsContextProvider } from "./src/services/restaurants/restaurantsContext";
import { LocationContextProvider } from "./src/services/location/locationContext";
import { FavouritesContextProvider } from "./src/services/favourites/favouritesContext";

import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAgZsx8NC6ue_0grk6X9CnUxZIzU7pp1oQ",
  authDomain: "mealstogo-bde21.firebaseapp.com",
  projectId: "mealstogo-bde21",
  storageBucket: "mealstogo-bde21.appspot.com",
  messagingSenderId: "826740415651",
  appId: "1:826740415651:web:53f4eab39ad29019413316",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      firebase
        .auth()
        .signInWithEmailAndPassword("matan3sh@gmail.com", "123456")
        .then((user) => {
          setIsAuthenticated(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }, 2000);
  }, []);

  const [oswaldLoaded] = useOswald({ Oswald_400Regular });
  const [latoLoaded] = useLato({ Lato_400Regular });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  if (!isAuthenticated) return null;

  return (
    <>
      <ThemeProvider theme={theme}>
        <FavouritesContextProvider>
          <LocationContextProvider>
            <RestaurantsContextProvider>
              <Navigation />
            </RestaurantsContextProvider>
          </LocationContextProvider>
        </FavouritesContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
