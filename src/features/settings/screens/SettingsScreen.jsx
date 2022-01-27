import React from "react";
import { List } from "react-native-paper";

import { SafeArea } from "../../../components/utility/SafeArea";

import { useAuthentication } from "../../../services/authentication/authenticationContext";

const SettingsScreen = ({ navigation }) => {
  const { onLogout } = useAuthentication();

  return (
    <SafeArea>
      <List.Section>
        <List.Item
          style={{ padding: 16 }}
          title="Favourites"
          description="View your favourites"
          left={(props) => <List.Icon {...props} color="black" icon="heart" />}
          onPress={() => navigation.navigate("Favourites")}
        />
        <List.Item
          style={{ padding: 16 }}
          title="Logout"
          left={(props) => <List.Icon {...props} color="black" icon="door" />}
          onPress={onLogout}
        />
      </List.Section>
    </SafeArea>
  );
};

export default SettingsScreen;
