const express = require('express')
const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;
const {createTracer, createFetcher, getUrlContents} = require('./util.js')

const tracer = createTracer('service-hello')

const setupServiceHello = function() {
  const app = express()
  const port = 3001

  app.use(zipkinMiddleware({tracer}));

  app.get('/hello', async function (req, res) {
    const zipkinFetch = createFetcher('service-goodbye', tracer)
    const resultString = await getUrlContents(
      'http://localhost:3002/goodbye', zipkinFetch
    )
    const resultJson = JSON.parse(resultString)
    res.type('json')
    res.send(JSON.stringify({message:"hello world, " + resultJson.message}))
  })

  app.listen(
    port,
    function() {
      console.log(`Example service listening at http://localhost:${port}`)
    }
  )
}
setupServiceHello()
