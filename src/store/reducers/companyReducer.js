import { GETCOMPANIES, ADDCOMPANY } from "../actions/actionTypes";
import { getCompanies } from "../../contexts/DatabaseContext";

const initialState = { companies: [] };

const companyReducer = (state = initialState, action) => {
  if (action.type === GETCOMPANIES) {
    debugger;
    return {
      companies: action.companies,
    };
  }
  if (action.type === ADDCOMPANY) {
    debugger;
    return {
      ...state,
      companies: [...state.companies, action.company],
    };
  }

  return state;
};

export default companyReducer;
