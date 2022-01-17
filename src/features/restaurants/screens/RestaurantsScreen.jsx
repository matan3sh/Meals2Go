import React from "react";
import styled from "styled-components/native";
import { FlatList, View } from "react-native";
import { Searchbar, ActivityIndicator, Colors } from "react-native-paper";

import { useRestaurants } from "../../../services/restaurants/restaurantsContext";
import { SafeArea } from "../../../components/utility/SafeArea";
import RestaurantInfoCard from "../components/RestaurantInfoCard";

const SearchContainer = styled.View`
  padding: ${({ theme }) => theme.space[3]};
`;

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: { padding: 16 },
})``;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled(View)`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const RestaurantsScreen = () => {
  const { restaurants, isLoading, error } = useRestaurants();

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}

      <SearchContainer>
        <Searchbar placeholder="Search" />
      </SearchContainer>
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => <RestaurantInfoCard restaurant={item} />}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};

export default RestaurantsScreen;
