import React, { useState, useEffect } from "react";
import { getUserCompanies } from "../../contexts/DatabaseContext";
import LeftMenu from "./Menu";
import TopNav from "./TopNav";
import Main from "./DashboardMain";
import { RESETSTATE, GETCOMPANIES } from "../../store/actions/actionTypes";
import { useDispatch, useSelector } from "react-redux";
export default function Dashboard() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.firebase.profile);

  useEffect(async () => {
    var userCompanies = [];
    if (profile.companies != null) {
      userCompanies = await getUserCompanies(profile.companies);
    }

    dispatch({ type: GETCOMPANIES, companies: userCompanies });

    dispatch({ type: RESETSTATE });
  }, [profile.companies]);
  debugger;
  return (
    <>
      <LeftMenu selected="dashboard"></LeftMenu>
      <TopNav></TopNav>
      <Main></Main>
    </>
  );
}
