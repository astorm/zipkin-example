const express = require('express')

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
setupServiceGoodbye()
