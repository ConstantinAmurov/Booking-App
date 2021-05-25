import { combineReducers, createStore } from "redux";

import loginReducer from "./reducers/loginReducer";
import companyReducer from "./reducers/companyReducer";
import dayReducer from "./reducers/dayReducer";
import serviceReducer from "./reducers/servicesReducer";
import { firebaseReducer } from "react-redux-firebase";
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  company: companyReducer,
  day: dayReducer,
  services: serviceReducer,
});

// react-redux-firebase config

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
