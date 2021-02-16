import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function employerReducer(state = initialState.employers, action) {
  switch (action.type) {
    case types.LOAD_EMPLOYERS_SUCCESS:
      return action.employers;
    default:
      return state;
  }
}
