# OpenTelemetry Zipkin

This repository contains two programs.

    $ node main.js

    /* ... */

    $ node hello.js

    /* ... */

    $ curl localhost:3001/main
    {"hello":"{\"hello\":\"world\"}"}$

The service in `main.js` calls the service in `hello.js`.

These services are instrumented via open telemetry, and will export spans to a Zipkin instance running at `http://localhost:9411`.
