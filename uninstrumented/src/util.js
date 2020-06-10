const fetch = require('node-fetch')

const getUrlContents = function(url, fetch) {
  return new Promise((resolve, reject)=>{
    fetch(url)
    .then(res => res.text())
    .then(body => resolve(body));
  })
}

module.exports = {
  getUrlContents
}
