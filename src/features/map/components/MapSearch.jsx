import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { useLocation } from "../../../services/location/locationContext";

const SearchContainer = styled.View`
  padding: ${({ theme }) => theme.space[3]};
  position: absolute;
  z-index: 999;
  top: 40px;
  width: 100%;
`;

const MapSearch = () => {
  const { keyword, search } = useLocation();
  const [searchKeyWord, setSearchKeyWord] = useState(keyword);

  useEffect(() => {
    setSearchKeyWord(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search for a location"
        icon="map"
        value={searchKeyWord}
        onSubmitEditing={() => search(searchKeyWord)}
        onChangeText={(text) => setSearchKeyWord(text)}
      />
    </SearchContainer>
  );
};

export default MapSearch;
