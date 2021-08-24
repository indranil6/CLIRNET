import { combineReducers } from "redux";
import { dashboardReducer } from "./dashboardDesktop.reducer";

import { registrationReducer } from "./registerwithemail.reducer";

const rootReducer = combineReducers({
  registration: registrationReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
