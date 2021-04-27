import React, { useState } from "react";

import LeftMenu from "./Menu";
import TopNav from "./TopNav";
import styles from "../../css/App.css";
export default function Dashboard() {
  return (
    <>
      <LeftMenu selected="dashboard"></LeftMenu>
      <TopNav></TopNav>
      <div style={{ backgroundColor: "#f1f5f8" }}></div>
    </>
  );
}
