# zipkin-example

This repo contains a small program that implements three small services, and instruments these services using zipkin. This all assumes zipkin is running at http://localhost:9411/zipkin/.  You can start all three services by running

    $ npm run start

The services are

    service-main:       http://localhost:3000/main
    service-hello:      http://localhost:3001/hello
    service-goodbye:    http://localhost:3002/goodbye

When you call `service-main`, it initiates a call to `service-hello`.  In turn, `service-hello` initiates a call to `service-goodbye`.
