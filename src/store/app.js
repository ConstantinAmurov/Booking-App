import { combineReducers, createStore } from "redux";

import loginReducer from "./reducers/loginReducer";
import companyReducer from "./reducers/companyReducer";
import dayReducer from "./reducers/dayReducer";
const rootReducer = combineReducers({
  user: loginReducer,
  company: companyReducer,
  day: dayReducer,
});
const store = createStore(rootReducer);

export default store;
