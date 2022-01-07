import React from "react";
import { Text } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { theme } from "./src/infrastructure/theme";
import { SafeArea } from "./src/components/utility/SafeArea";
import RestaurantsScreen from "./src/features/restaurants/screens/RestaurantsScreen";

import { Ionicons, FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const SettingsScreen = () => (
  <SafeArea>
    <Text>Settings Screen</Text>
  </SafeArea>
);
const MapScreen = () => (
  <SafeArea>
    <Text>Map Screen</Text>
  </SafeArea>
);

export default function App() {
  const [oswaldLoaded] = useOswald({ Oswald_400Regular });
  const [latoLoaded] = useLato({ Lato_400Regular });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: "black",
              tabBarInactiveTintColor: "grey",
            }}>
            <Tab.Screen
              name="Restaurants"
              component={RestaurantsScreen}
              options={{
                tabBarIcon: ({ focused, color }) => (
                  <Ionicons
                    name="restaurant"
                    size={focused ? 30 : 25}
                    color="black"
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Map"
              component={MapScreen}
              options={{
                tabBarIcon: ({ focused, color }) => (
                  <FontAwesome
                    name="map-marker"
                    size={focused ? 30 : 25}
                    color="black"
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                tabBarIcon: ({ focused, color }) => (
                  <Ionicons
                    name="settings"
                    size={focused ? 30 : 25}
                    color="black"
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
