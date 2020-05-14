const express = require('express')
const fetch = require('node-fetch')
const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;
const {createTracer, createFetcher, getUrlContents} = require('./util.js')

const setupMainProgram = function() {
  const tracer = createTracer('service-main')

  const app = express()
  const port = 3000

  app.get('/main', async function (req, res) {
    // fetch data from second service running on port 3001
    const zipkinFetch = createFetcher('service-hello', tracer)
    const resultString = await getUrlContents(
      'http://localhost:3001/hello', zipkinFetch)
    const resultJson = JSON.parse(resultString)
    res.type('json')
    res.send(JSON.stringify({main:resultJson.message}))
  })
  app.use(zipkinMiddleware({tracer}));
  app.listen(
    port,
    function() {
      console.log(`Example app listening at http://localhost:${port}`)
    }
  )
}

setupMainProgram()
