import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/employers/";

export function getEmployers() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
