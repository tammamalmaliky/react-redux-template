import * as types from "./actionTypes";
import * as employerApi from "../../api/employerApi";

export function loadEmployersSuccess(employers) {
  return { type: types.LOAD_EMPLOYERS_SUCCESS, employers };
}

export function loadEmployers() {
  return function(dispatch) {
    return employerApi
      .getEmployers()
      .then(employers => {
        dispatch(loadEmployersSuccess(employers));
      })
      .catch(error => {
        throw error;
      });
  };
}
