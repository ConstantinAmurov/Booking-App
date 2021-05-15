import React, { useEffect } from "react";

import { useSelector } from "react-redux";

import Company from "./Company";
const Companies = () => {
  const companies = useSelector((state) => state.company.companies);

  return <Company companies={companies} />;
};

export default Companies;
