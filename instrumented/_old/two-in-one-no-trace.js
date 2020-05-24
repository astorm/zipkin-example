'use strict'
const express = require('express')
const fetch = require('node-fetch')

const getUrlContents = function(url) {
  return new Promise((resolve, reject)=>{
    fetch(url)
    .then(res => res.text())
    .then(body => resolve(body));
  })
}

const setupMainProgram = function() {
  const app = express()
  const port = 3000

  app.get('/main', async function (req, res) {
    // fetch data from second service running on port 3001
    const resultString = await getUrlContents('http://localhost:3001/hello')
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

const setupService = function() {
  const app = express()
  const port = 3001

  app.get('/hello', function (req, res) {
    res.type('json')
    res.send(JSON.stringify({message:"hello world"}))
  })

  app.listen(
    port,
    function() {
      console.log(`Example service listening at http://localhost:${port}`)
    }
  )
}

setupMainProgram()
setupService()
console.log("done")
