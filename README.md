## Performance tests with k6

The following tools need to be installed:
- k6
- grafana

## Making orders

In order to run performance tests for making orders run the following command:

```
k6 run --vus 1000 --duration 5s /tests/endpoints/order.js
```

## Accepting orders

In order to run performance tests for accepting orders made in the previous step run the following command:

```
k6 run /tests/endpoints/accept.js
```