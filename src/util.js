const fetch = require('node-fetch')

const {
  Tracer,
  BatchRecorder,
  jsonEncoder: {JSON_V2}
} = require('zipkin');
const CLSContext = require('zipkin-context-cls');
const {HttpLogger} = require('zipkin-transport-http');

const createTracer = (localServiceName) => {
  const tracer = new Tracer({
    ctxImpl: new CLSContext('zipkin'),
    recorder: new BatchRecorder({
      logger: new HttpLogger({
        endpoint: 'http://localhost:9411/api/v2/spans',
        jsonEncoder: JSON_V2
      })
    }),
    localServiceName: localServiceName // name of this application
  });
  return tracer;
}

const createFetcher = (remoteServiceName, tracer) => {
  const wrapFetch = require('zipkin-instrumentation-fetch');
  return wrapFetch(fetch,
    {
      tracer:tracer,
      remoteServiceName:remoteServiceName
    }
  );
}

const getUrlContents = function(url, zipkinFetch) {
  return new Promise((resolve, reject)=>{
    zipkinFetch(url)
    .then(res => res.text())
    .then(body => resolve(body));
  })
}

module.exports = {
  createTracer,
  createFetcher,
  getUrlContents
}
