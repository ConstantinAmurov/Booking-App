import React from "react";
import Menu from "../Dashboard/Menu";
import TopNav from "../Dashboard/TopNav";
import Main from "./ServiceMain";
import { RESETSTATE } from "../../store/actions/actionTypes";
import { useDispatch } from "react-redux";
const Service = () => {
  const dispatch = useDispatch();
  dispatch({ type: RESETSTATE });
  return (
    <>
      <Menu selected="service"></Menu>
      <TopNav></TopNav>
      <Main></Main>
    </>
  );
};

export default Service;
