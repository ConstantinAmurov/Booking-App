import React from "react";
import Menu from "../Menu";
import TopNav from "../TopNav";
import Main from "./BookingMain";

const Booking = () => {
  return (
    <>
      <Menu selected="booking"></Menu>
      <TopNav></TopNav>
      <Main></Main>
    </>
  );
};

export default Booking;
