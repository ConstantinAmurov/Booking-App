import authReducer from "./authReducer";
import companyReducer from "./companyReducer";
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  firebaseReducer,
  authReducer,
});

export default rootReducer;
