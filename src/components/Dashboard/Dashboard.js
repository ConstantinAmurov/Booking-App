import React, { useState } from "react";

import LeftMenu from "./Menu";
import TopNav from "./TopNav";
import Main from "./DashboardMain";
export default function Dashboard() {
  return (
    <>
      <LeftMenu selected="dashboard"></LeftMenu>
      <TopNav></TopNav>
      <Main></Main>
    </>
  );
}
