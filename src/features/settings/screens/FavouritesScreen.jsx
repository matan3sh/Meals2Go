import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

import { Text } from "../../../components/typography/Text";
import { SafeArea } from "../../../components/utility/SafeArea";
import { RestaurantList } from "../../restaurants/components/RestaurantList";
import RestaurantInfoCard from "../../restaurants/components/RestaurantInfoCard";

import { useFavourites } from "../../../services/favourites/favouritesContext";

const FavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;

const FavouritesScreen = () => {
  const { favourites } = useFavourites();

  if (!favourites.length) {
    return (
      <FavouritesArea>
        <Text>No favourites yet</Text>
      </FavouritesArea>
    );
  }

  return (
    <SafeArea>
      <RestaurantList
        data={favourites}
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

export default FavouritesScreen;
