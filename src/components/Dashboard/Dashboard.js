import React, { useState } from "react";

import LeftMenu from "./Menu";
import TopNav from "./TopNav";
import Main from "./DashboardMain";
import { RESETSTATE } from "../../store/actions/actionTypes";
import { useDispatch } from "react-redux";
export default function Dashboard() {
  const dispatch = useDispatch();
  dispatch({ type: RESETSTATE });
  return (
    <>
      <LeftMenu selected="dashboard"></LeftMenu>
      <TopNav></TopNav>
      <Main></Main>
    </>
  );
}
