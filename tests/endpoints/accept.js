import http from "k6/http";
import { baseURL, password } from "../utils/common.js";
import { getLoginCookie } from "./login.js";
import { getOrders } from "./getOrders.js";

const username = "employee";

export default function () {
  let cookie = getLoginCookie(username, password);
  let params =  { headers: { "Content-Type" : "application/json", "Cookie" : "JSESSIONID="+cookie+"" } };
  let ids = getOrders(cookie);
  if (ids.length > 0){
    for (var i in ids) {
      let id = ids[i];
      let url = baseURL + `/api/orders/${id}`;
      let payload = JSON.stringify({ id: id, status: "ACCEPTED" });
      let response = http.put(url, payload, params);
    }  
  }
}