## Tools

k6.io for performance tests, InfluxDB for data storage, Grafana and Excel for visualization.

## Making orders

In order to run performance tests for making orders run the following command:

```
k6 run --vus 100 --duration 30s /tests/endpoints/order.js
```

To save metrics to the local Influx database (with name "order"), run the following command:

```
k6 run --vus 100 --duration 30s --out influxdb=http://localhost:8086/order /tests/endpoints/order.js
```

## Accepting orders

In order to run performance tests for accepting orders made in the previous step run the following command:

```
k6 run /tests/endpoints/accept.js
```

The accept.js script will be executed by 1 virtual user (VU) exactly once.

## Test cases 

1. --vus 1 --duration 30s order.js
2. --vus 100 --duration 30s order.js
3. --vus 1000 --duration 30s order.js
4. --vus 5000 --duration 30s order.js
5. --vus 100 --duration 5s order.js
6. --vus 100 --duration 60s order.js
7. --vus 100 --duration 600s order.js

Metrics shown on the Grafana graphs:
- average iteration_duration [ms] - measures the time it takes to run one full iteration of the default function

![GrafanaTC1](/tests/results/GrafanaTC1.png)

![GrafanaTC2](/tests/results/GrafanaTC2.png)

![GrafanaTC3](/tests/results/GrafanaTC3.png)

![GrafanaTC4](/tests/results/GrafanaTC4.png)


The more users are logging and making orders, the longer average interaction duration is.
However, manipulating duration of 

![GrafanaTC5](/tests/results/GrafanaTC5.png)

![GrafanaTC6](/tests/results/GrafanaTC6.png)

![GrafanaTC7](/tests/results/GrafanaTC7.png)

Metrics shown on the Excel graphs:
- http_req_waiting (avg & max) [ms] - time spent waiting for response from remote host (a.k.a. "time to first byte", or "TTFB")
- http_req_receiving (avg & max) [ms] - time spent receiving response data from remote host