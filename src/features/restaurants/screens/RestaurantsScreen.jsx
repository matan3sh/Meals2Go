import React, { useState } from "react";
import styled from "styled-components/native";
import { FlatList, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";

import { useRestaurants } from "../../../services/restaurants/restaurantsContext";
import { useFavourites } from "../../../services/favourites/favouritesContext";

import { SafeArea } from "../../../components/utility/SafeArea";
import FavouritesBar from "../../../components/favourites/FavouritesBar";
import RestaurantInfoCard from "../components/RestaurantInfoCard";
import RestaurantsSearch from "../components/RestaurantsSearch";

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

const RestaurantsScreen = ({ navigation }) => {
  const { restaurants, isLoading, error } = useRestaurants();
  const { favourites } = useFavourites();
  const [isToggled, setIsToggled] = useState(false);

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}

      <RestaurantsSearch
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />

      {isToggled && (
        <FavouritesBar
          onNavigate={navigation.navigate}
          favourites={favourites}
        />
      )}

      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("RestaurantDetail", { restaurant: item })
            }>
            <RestaurantInfoCard restaurant={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};

export default RestaurantsScreen;
