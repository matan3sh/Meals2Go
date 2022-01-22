import React from "react";
import MapView from "react-native-maps";
import styled from "styled-components/native";
import MapSearch from "../components/MapSearch";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

const MapScreen = () => {
  return (
    <>
      <MapSearch />
      <Map />
    </>
  );
};

export default MapScreen;
