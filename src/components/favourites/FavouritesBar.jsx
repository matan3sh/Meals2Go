import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { Spacer } from "../spacer/Spacer";
import { Text } from "../typography/Text";
import CompactRestaurantInfo from "../restaurant/CompactRestaurantInfo";

const FaouritesWrapper = styled.View`
  padding: 10px;
`;

const FavouritesBar = ({ favourites, onNavigate }) => {
  if (!favourites.length) {
    return null;
  }

  return (
    <FaouritesWrapper>
      <Spacer variant="left.large">
        <Text variant="caption">Favourites</Text>
      </Spacer>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favourites.map((restaurant) => {
          const key = restaurant.name;
          return (
            <Spacer key={key} position="left" size="medium">
              <TouchableOpacity
                onPress={() =>
                  onNavigate("RestaurantDetail", {
                    restaurant,
                  })
                }>
                <CompactRestaurantInfo restaurant={restaurant} />
              </TouchableOpacity>
            </Spacer>
          );
        })}
      </ScrollView>
    </FaouritesWrapper>
  );
};

export default FavouritesBar;
