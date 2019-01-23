import http from "k6/http";
import { baseURL } from "../utils/common.js";

export function getOrders(cookie) {
  let url = baseURL + "/api/orders/?size=10000000";
  let params =  { headers: { "Content-Type" : "application/json", "Cookie" : "JSESSIONID="+cookie+"" } };
  let orders = http.get(url, params);
  let ids = [];
  for (var i in orders.json().content) {
    ids.push(orders.json().content[i].id);
  }
  return ids;
}