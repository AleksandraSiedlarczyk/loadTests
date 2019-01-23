import http from "k6/http";
import { baseURL } from "../utils/common.js";

export function login(username, password) {
    let url = baseURL + "/login";
    let formData = { username: username, password: password };
    let headers = { "Content-Type": "application/x-www-form-urlencoded" };
    let response = http.post(url, formData, headers);
    return response;
}

export function getLoginCookie(username, password){
  let loginResponse = login(username, password);
  return loginResponse.cookies["JSESSIONID"][0].value;
}