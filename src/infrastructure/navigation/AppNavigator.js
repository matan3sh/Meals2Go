import React from "react";
import { Text, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RestaurantsNavigator from "./RestaurantsNavigator";

import MapScreen from "../../features/map/screens/MapScreen";
import { SafeArea } from "../../components/utility/SafeArea";

import { useAuthentication } from "../../services/authentication/authenticationContext";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurantsContext";
import { LocationContextProvider } from "../../services/location/locationContext";
import { FavouritesContextProvider } from "../../services/favourites/favouritesContext";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    headerShown: false,
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray",
    tabBarStyle: [
      {
        display: "flex",
      },
      null,
    ],
  };
};

const SettingsScreen = () => {
  const { onLogout } = useAuthentication();

  return (
    <SafeArea>
      <Text>Settings Screen</Text>
      <Button title="Logout" onPress={() => onLogout()} />
    </SafeArea>
  );
};

export const AppNavigator = () => {
  return (
    <FavouritesContextProvider>
      <LocationContextProvider>
        <RestaurantsContextProvider>
          <Tab.Navigator screenOptions={createScreenOptions}>
            <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavouritesContextProvider>
  );
};
