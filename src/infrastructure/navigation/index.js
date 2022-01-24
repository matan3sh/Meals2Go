import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./AppNavigator";
import { AccountNavigator } from "./AccountNavigator";

import { useAuthentication } from "../../services/authentication/authenticationContext";

export const Navigation = () => {
  const { isAuthenticated } = useAuthentication();

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
