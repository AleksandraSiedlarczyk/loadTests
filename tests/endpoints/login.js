import { check } from "k6";
import http from "k6/http";
import { baseURL } from "../utils/common.js";

export function login(username, password) {
    let url = baseURL + "/login";
    let formData = { username: username, password: password };
    let headers = { "Content-Type": "application/x-www-form-urlencoded" };
    let response = http.post(url, formData, headers);
    check(response, {
      "status is 200": (r) => r.status === 200  
    });
    return response;
}