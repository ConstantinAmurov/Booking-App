import {
  GETCOMPANIES,
  ADDCOMPANY,
  DELETECOMPANY,
  EDITCOMPANY,
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
  if (action.type === EDITCOMPANY) {
    return {
      ...state,
      companies: state.companies.map((company) => {
        if (company.id == action.id) {
          return action.editedCompany;
        } else return company;
      }),
    };
  }

  return state;
};

export default companyReducer;
