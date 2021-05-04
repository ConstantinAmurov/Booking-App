import { createStore } from "redux";
import { SIGNIN, SIGNSTATE_CHANGED } from "./actions/actionTypes";
const initialState = { isLogged: false, user: {} };

const loginReducer = (state = initialState, action) => {
  if (action.type === SIGNIN)
    return {
      isLogged: true,
      user: action.user,
    };
  if (action.type === SIGNSTATE_CHANGED) {
    return {
      isLogged: !state.isLogged,
      user: action.user,
    };
  }
  return state;
};
const store = createStore(loginReducer);

export default store;
