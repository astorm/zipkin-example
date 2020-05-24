'use strict'
const express = require('express')
const fetch = require('node-fetch')

const {
  Tracer,
  BatchRecorder,
  jsonEncoder: {JSON_V2}
} = require('zipkin');
const CLSContext = require('zipkin-context-cls');
const {HttpLogger} = require('zipkin-transport-http');
// TODO: we need a different tracer
// Setup the tracer to use http and implicit trace context
const tracer = new Tracer({
  ctxImpl: new CLSContext('zipkin'),
  recorder: new BatchRecorder({
    logger: new HttpLogger({
      endpoint: 'http://localhost:9411/api/v2/spans',
      jsonEncoder: JSON_V2
    })
  }),
  localServiceName: 'main-program' // name of this application
});

const wrapFetch = require('zipkin-instrumentation-fetch');
const zipkinFetchHello = wrapFetch(fetch,
  {
    tracer:tracer,
    remoteServiceName:'service-hello'
  }
);

const zipkinFetchGoodbye = wrapFetch(fetch,
  {
    tracer:tracer,
    remoteServiceName:'service-goodbye'
  }
);

const getUrlContents = function(url, zipkinFetch) {
  return new Promise((resolve, reject)=>{
    zipkinFetch(url)
    .then(res => res.text())
    .then(body => resolve(body));
  })
}

const setupMainProgram = function() {
  const app = express()
  const port = 3000

  app.get('/main', async function (req, res) {
    // fetch data from second service running on port 3001
    const resultString = await getUrlContents(
      'http://localhost:3001/hello', zipkinFetchHello)
    const resultJson = JSON.parse(resultString)
    res.type('json')
    res.send(JSON.stringify({main:resultJson.message}))
  })

  app.listen(
    port,
    function() {
      console.log(`Example app listening at http://localhost:${port}`)
    }
  )
}

const setupServiceHello = function() {
  const app = express()
  const port = 3001

  app.get('/hello', async function (req, res) {
    const resultString = await getUrlContents(
      'http://localhost:3002/goodbye',
      zipkinFetchGoodbye
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

const setupServiceGoodbye = function() {
  const app = express()
  const port = 3002

  app.get('/goodbye', function (req, res) {
    res.type('json')
    res.send(JSON.stringify({message:"goodbye world"}))
  })

  app.listen(
    port,
    function() {
      console.log(`Example service listening at http://localhost:${port}`)
    }
  )
}
setupMainProgram()
setupServiceHello()
setupServiceGoodbye()
console.log("done")
