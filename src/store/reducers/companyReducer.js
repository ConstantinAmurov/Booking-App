import { GETCOMPANIES, ADDCOMPANY } from "../actions/actionTypes";

const initialState = { companies: [] };

const companyReducer = (state = initialState, action) => {
  if (action.type === GETCOMPANIES) {
    return {
      companies: action.companies,
    };
  }
  if (action.type === ADDCOMPANY) {
    return {
      ...state,
      companies: [...state.companies, action.company],
    };
  }

  return state;
};

export default companyReducer;
