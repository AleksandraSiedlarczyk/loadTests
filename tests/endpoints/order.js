import http from "k6/http";
import { baseURL, password } from "../utils/common.js";
import { getLoginCookie } from "./login.js";

const username = "client";
const payload = open("../data/order.json");

export default function() {
  let cookie = getLoginCookie(username, password);  
  let url = baseURL + "/api/orders/";
  let params =  { headers: { "Content-Type" : "application/json", "Cookie" : "JSESSIONID="+cookie+"" } };
  http.post(url, payload, params);
}