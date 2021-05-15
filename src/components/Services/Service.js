import React from "react";
import Menu from "../Dashboard/Menu";
import TopNav from "../Dashboard/TopNav";
import Main from "./ServiceMain";

const Service = () => {
  return (
    <>
      <Menu selected="service"></Menu>
      <TopNav></TopNav>
      <Main></Main>
    </>
  );
};

export default Service;
