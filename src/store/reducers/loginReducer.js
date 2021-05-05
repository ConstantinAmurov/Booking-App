import { SIGNIN, SIGNSTATE_CHANGED, LOGOUT } from "../actions/actionTypes";
import { signOut } from "../actions/authActions";
import { login } from "../../store/actions/authActions";
const initialState = { isLogged: false, user: {} };

const loginReducer = (state = initialState, action) => {
  if (action.type === SIGNIN) {
    login(action.user);
    return {
      isLogged: true,
      user: action.user,
    };
  }
  if (action.type === SIGNSTATE_CHANGED) {
    return {
      isLogged: !state.isLogged,
      user: action.user,
    };
  }
  if (action.type === LOGOUT) {
    signOut();
    console.log("LOG OUT");

    return {
      isLogged: false,
      user: {},
    };
  }
  return state;
};

export default loginReducer;
