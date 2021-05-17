import {
  ADDSERVICES,
  GETSERVICES,
  DELETESERVICE,
} from "../actions/actionTypes";

const initialState = { services: [], allServices: [] };

const serviceReducer = (state = initialState, action) => {
  if (action.type === ADDSERVICES) {
    debugger;
    return {
      ...state,
      services: [...state.services, [...action.payload]],
    };
  }

  if (action.type === GETSERVICES) {
    return {
      ...state,
      allServices: [...action.payload],
    };
  }

  if (action.type === DELETESERVICE) {
    return {
      ...state,
      allServices: state.allServices.filter(
        (service) => service.id != action.serviceID
      ),
    };
  }
  return state;
};

export default serviceReducer;
