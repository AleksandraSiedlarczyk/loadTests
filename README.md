## Performance tests with k6

In order to build infrastructure on AWS:

1. Run the following commands:

```
docker run -i -v //c/k6:/k6 loadimpact/k6 run --vus 1 --duration 1s /k6/tests/order.js
```


