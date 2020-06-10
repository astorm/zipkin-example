const express = require('express')
const {getUrlContents} = require('./util')

const setupServiceHello = function() {
  const app = express()
  const port = 3001

  app.get('/hello', async function (req, res) {
    const resultString = await getUrlContents(
      'http://localhost:3002/goodbye', require('node-fetch')
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
