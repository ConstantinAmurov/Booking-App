import { combineReducers, createStore } from "redux";

import loginReducer from "./reducers/loginReducer";
import companyReducer from "./reducers/companyReducer";
const rootReducer = combineReducers({
  user: loginReducer,
  company: companyReducer,
});
const store = createStore(rootReducer);

export default store;
