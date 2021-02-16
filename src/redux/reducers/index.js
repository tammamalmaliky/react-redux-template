import { combineReducers } from "redux";
import courses from "./courseReducer";
import employers from "./employerReducer";

const rootReducer = combineReducers({
  courses,
  employers
});

export default rootReducer;
