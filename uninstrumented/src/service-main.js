const express = require('express')
const fetch = require('node-fetch')
const {getUrlContents} = require('./util')

const setupMainProgram = function() {
  const app = express()
  const port = 3000

  app.get('/main', async function (req, res) {
    // fetch data from second service running on port 3001
    const resultString = await getUrlContents(
      'http://localhost:3001/hello', fetch)
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

setupMainProgram()
