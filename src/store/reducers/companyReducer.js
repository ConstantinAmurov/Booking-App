import { GETCOMPANIES, ADDCOMPANY } from "../actions/actionTypes";

const initialState = { companies: [] };

const companyReducer = (state = initialState, action) => {
  if (action.type === GETCOMPANIES) {
    return {
      companies: action.companies,
    };
  }
  if (action.type === ADDCOMPANY) {
    debugger;
    return {
      ...state,
      companies: [...state.companies, action.newCompany],
    };
  }

  return state;
};

export default companyReducer;
