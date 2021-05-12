import { ADDSERVICES } from "../actions/actionTypes";

const initialState = { services: [] };

const serviceReducer = (state = initialState, action) => {
  //   if (action.type === GETCOMPANIES) {
  //     return {
  //       companies: action.companies,
  //     };
  //   }
  if (action.type === ADDSERVICES) {
    return {
      ...state,
      services: [...state.services, [...action.payload]],
    };
  }

  return state;
};

export default serviceReducer;
