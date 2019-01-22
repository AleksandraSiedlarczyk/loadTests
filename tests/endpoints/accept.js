import { check } from "k6";
import http from "k6/http";
import { baseURL, password } from "../utils/common.js";
import { login } from "./login.js";

let username = "employee";
let payload =  open("./accept.json");

export default function() {
    var loginResponse =  login(username, password);
    let cookie = loginResponse.cookies["JSESSIONID"][0].value;
    
    let url = baseURL + "/api/orders/{id}";
    let params =  { headers: { "Content-Type" : "application/json", "Cookie" : "JSESSIONID="+cookie+"" } };
    let response = http.put(url, payload, params);
    console.log(response.body);
  
    check(response, {
      "status is 200": (r) => r.status === 200
    });
  }