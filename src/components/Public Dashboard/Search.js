import React, { useState, useEffect } from "react";
import SearchContainer from "./SearchContainer";
import SearchedCompanies from "./SearchedCompanies";
import { useSelector } from "react-redux";
const Search = () => {
  const [foundServices, setFoundServices] = useState();

  const handleSearchSubmit = (filteredServices) => {
    setFoundServices(filteredServices);
  };

  useEffect(() => {
    console.log(foundServices);
  }, [foundServices]);

  return (
    <>
      <SearchContainer
        handleSearchSubmit={handleSearchSubmit}
      ></SearchContainer>
      {foundServices != undefined && (
        <SearchedCompanies services={foundServices}></SearchedCompanies>
      )}
    </>
  );
};

export default Search;
