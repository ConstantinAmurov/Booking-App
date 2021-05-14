import {
  GETCOMPANIES,
  ADDCOMPANY,
  DELETECOMPANY,
} from "../actions/actionTypes";

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
      companies: [...state.companies, action.newCompany],
    };
  }
  if (action.type === DELETECOMPANY) {
    return {
      companies: state.companies.filter(
        (company) => company.id != action.companyID
      ),
    };
  }

  return state;
};

export default companyReducer;
