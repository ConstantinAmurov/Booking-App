import { combineReducers, createStore } from "redux";

import loginReducer from "./reducers/loginReducer";
import companyReducer from "./reducers/companyReducer";
import dayReducer from "./reducers/dayReducer";
import serviceReducer from "./reducers/servicesReducer";
const rootReducer = combineReducers({
  user: loginReducer,
  company: companyReducer,
  day: dayReducer,
  services: serviceReducer,
});
const store = createStore(rootReducer);

export default store;
