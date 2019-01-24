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

In order to run performance tests for accepting orders run the following command:

```
k6 run /tests/endpoints/accept.js
```

The accept.js script will be executed by 1 virtual user (VU) exactly once. It contains employee login step and for loop to accept all orders, because it is more realistic business case than repeating login and single accepting operation together.

## Making orders - test results 

The order.js script were run wih the following parameters: 
1. --vus 1 --duration 30s
2. --vus 100 --duration 30s 
3. --vus 1000 --duration 30s
4. --vus 3000 --duration 30s
5. --vus 100 --duration 5s
6. --vus 100 --duration 60s
7. --vus 100 --duration 600s

Metrics shown on the Grafana graphs:
- average iteration_duration [ms] - measures the time it takes to run one full iteration of the default function, in this case of the login and making an order.

![GrafanaTC1](/tests/results/GrafanaTC1.png)

![GrafanaTC2](/tests/results/GrafanaTC2.png)

![GrafanaTC3](/tests/results/GrafanaTC3.png)

![GrafanaTC4](/tests/results/GrafanaTC4.png)

The more users are logging and making orders, the longer average iteration duration is. When test case 4 was executed, the problems with login to the application occured and no connection could be made because the target machine actively refused it. This situation is illustrated by the gap on the fourth chart.

However, manipulating duration of script execution does not have big impact on results. It does not matter for how long the script is repeatedly run, average iteration duration for 100 virtual users was between 600 ms and 700 ms.

![GrafanaTC5](/tests/results/GrafanaTC5.png)

![GrafanaTC6](/tests/results/GrafanaTC6.png)

![GrafanaTC7](/tests/results/GrafanaTC7.png)

Metrics shown on the Excel graphs:
- average iteration_duration [ms]
- http_req_waiting (avg & max) [ms] - time spent waiting for response from remote host (a.k.a. "time to first byte", or "TTFB")
- http_req_receiving (avg & max) [ms] - time spent receiving response data from remote host

![ExcelIterationDuration](/tests/results/ExcelIterationDuration.png)
![ExcelHttpWaitingTime](/tests/results/ExcelHttpWaitingTime.png)
![ExcelHttpReceivingTime](/tests/results/ExcelHttpReceivingTime.png)

All three diagrams show that with increasing number of virtual users, metrics are getting higher as well. The only exception is average http request receiving time which does not rise significantly even with a high number of virtual users. We may expect with futher increase in number of VUS, metrics would be even bigger.

## Accepting orders - test results

Accepting even large amount of orders doesn't 

![GrafanaAccept1](/tests/results/GrafanaAccept1.png)
![GrafanaAccept2](/tests/results/GrafanaAccept2.png)
![GrafanaAccept3](/tests/results/GrafanaAccept3.png)