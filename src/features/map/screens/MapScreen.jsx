import React, { useState, useEffect } from "react";
import { View } from "react-native";
import MapView from "react-native-maps";
import styled from "styled-components/native";

import { useLocation } from "../../../services/location/locationContext";
import { useRestaurants } from "../../../services/restaurants/restaurantsContext";

import MapSearch from "../components/MapSearch";
import MapCallout from "../components/MapCallout";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

const MapScreen = () => {
  const { location } = useLocation();
  const { restaurants = [] } = useRestaurants();

  const [latDelta, setLatDelta] = useState(0);

  const { lat, lng, viewport } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;
    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  return (
    <>
      <MapSearch />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}>
        {restaurants.map((restaurant) => (
          <MapView.Marker
            key={restaurant.name}
            title={restaurant.name}
            coordinate={{
              latitude: restaurant.geometry.location.lat,
              longitude: restaurant.geometry.location.lng,
            }}>
            <MapView.Callout>
              <MapCallout restaurant={restaurant} />
            </MapView.Callout>
          </MapView.Marker>
        ))}
      </Map>
    </>
  );
};

export default MapScreen;
