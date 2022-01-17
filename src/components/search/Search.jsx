import React, { useState } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { useLocation } from "../../services/location/locationContext";

const SearchContainer = styled.View`
  padding: ${({ theme }) => theme.space[3]};
`;

const Search = () => {
  const { location, isLoading, error, keyword, search } = useLocation();
  const [searchKeyWord, setSearchKeyWord] = useState(keyword);

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search for a location"
        value={searchKeyWord}
        onSubmitEditing={() => search(searchKeyWord)}
        onChangeText={(text) => setSearchKeyWord(text)}
      />
    </SearchContainer>
  );
};

export default Search;
