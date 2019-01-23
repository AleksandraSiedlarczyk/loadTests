## Making orders

In order to run performance tests for making orders run the following command:

```
k6 run --vus 1000 --duration 30s /tests/endpoints/order.js
```

k6 run --out influxdb=http://localhost:8086/order /tests/endpoints/order.js

## Accepting orders

In order to run performance tests for accepting orders made in the previous step run the following command:

```
k6 run /tests/endpoints/accept.js
```

## Test cases 

1. --vus 1 --duration 30s order.js
2. --vus 100 --duration 30s order.js
3. --vus 1000 --duration 30s order.js
4. --vus 10000 --duration 30s order.js

Metrics shown on the Grafana graphs:
- average iteration_duration [ms] 

![GrafanaTC1](/blob/master/tests/results/GrafanaTC1.png)

Metrics shown on the Excel graphs:
- http_req_blocked (avg & max) [ms]
- http_req_waiting (avg & max) [ms]