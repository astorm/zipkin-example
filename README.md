# NodeJS Zipkin Examples

This repository contain three projects.

The `uninstrumented` folder contains a javascript program that sets up three simple services.

The `instrumented` folder takes the program in the `uninstrumented` folder and instruments it using Zipkin's libraries.

The `opentelemetry` folder contains two stand alone programs, each implementing a service, with one calling the other, and these programs are instrumented using Open Telemetry exporting spans to a Zipkin system.

These programs are in support of the [Tracing Systems with Zipkin and OpenTracing](https://alanstorm.com/category/open-telemetry/#tracing-systems-with-zipkin-and-opentracing) series.
