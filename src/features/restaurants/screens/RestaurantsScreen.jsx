import React, { useState } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";

import { useRestaurants } from "../../../services/restaurants/restaurantsContext";
import { useFavourites } from "../../../services/favourites/favouritesContext";

import { SafeArea } from "../../../components/utility/SafeArea";
import { FadeInView } from "../../../components/animations/FadeAnimation";
import FavouritesBar from "../../../components/favourites/FavouritesBar";
import { RestaurantList } from "../components/RestaurantList";
import RestaurantInfoCard from "../components/RestaurantInfoCard";
import RestaurantsSearch from "../components/RestaurantsSearch";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
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
            <FadeInView>
              <RestaurantInfoCard restaurant={item} />
            </FadeInView>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};

export default RestaurantsScreen;
