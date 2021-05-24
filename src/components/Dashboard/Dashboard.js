import React, { useState, useEffect } from "react";
import { getCompanies } from "../../contexts/DatabaseContext";
import LeftMenu from "./Menu";
import TopNav from "./TopNav";
import Main from "./DashboardMain";
import { RESETSTATE, GETCOMPANIES } from "../../store/actions/actionTypes";
import { useDispatch } from "react-redux";
export default async function Dashboard() {
  const dispatch = useDispatch();

  useEffect(async () => {
    const companies = await getCompanies();
    dispatch({ type: GETCOMPANIES, companies: companies });
    dispatch({ type: RESETSTATE });
  }, []);

  return (
    <>
      <LeftMenu selected="dashboard"></LeftMenu>
      <TopNav></TopNav>
      <Main></Main>
    </>
  );
}
