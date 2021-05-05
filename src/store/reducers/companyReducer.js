import { GETCOMPANIES } from "../actions/actionTypes";
import { getCompanies } from "../../contexts/DatabaseContext";

const initialState = { companies: {} };

const companyReducer = (state = initialState, action) => {
  if (action.type === GETCOMPANIES) {
    debugger;
    return {
      companies: action.companies,
    };
  }

  return state;
};

export default companyReducer;
