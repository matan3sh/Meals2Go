import React from "react";
import styled from "styled-components/native";
import { SafeAreaView, StatusBar, View } from "react-native";
import { Searchbar } from "react-native-paper";

import RestaurantInfoCard from "../components/RestaurantInfoCard";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

const SearchContainer = styled(View)`
  padding: 16px;
`;

const ListContainer = styled(View)`
  flex: 1;
  padding: 16px;
  background-color: blue;
`;

const RestaurantsScreen = () => {
  return (
    <SafeArea>
      <SearchContainer>
        <Searchbar placeholder="Search" />
      </SearchContainer>
      <ListContainer>
        <RestaurantInfoCard />
      </ListContainer>
    </SafeArea>
  );
};

export default RestaurantsScreen;
